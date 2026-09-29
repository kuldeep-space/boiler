-- ========================================================
-- 1. Create Products Table
-- ========================================================
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC,
    capacity TEXT,
    specifications TEXT,
    manufacturer TEXT DEFAULT 'Pandayji Iron Works',
    show_call_now BOOLEAN DEFAULT true,
    show_interested BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ========================================================
-- 2. Create Product Images Table
-- ========================================================
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ========================================================
-- 3. Create Queries / Leads Table
-- ========================================================
CREATE TABLE IF NOT EXISTS public.queries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    customer_phone TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Resolved', 'Spam')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ========================================================
-- 4. Enable Row Level Security (RLS)
-- ========================================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.queries ENABLE ROW LEVEL SECURITY;

-- ========================================================
-- 5. Policies for Products
-- ========================================================
DROP POLICY IF EXISTS "Public products viewable by everyone" ON public.products;
CREATE POLICY "Public products viewable by everyone"
ON public.products FOR SELECT
USING ( true );

DROP POLICY IF EXISTS "Authenticated users can manage products" ON public.products;
CREATE POLICY "Authenticated users can manage products"
ON public.products FOR ALL
USING ( auth.role() = 'authenticated' );

-- ========================================================
-- 6. Policies for Images
-- ========================================================
DROP POLICY IF EXISTS "Public images viewable by everyone" ON public.product_images;
CREATE POLICY "Public images viewable by everyone"
ON public.product_images FOR SELECT
USING ( true );

DROP POLICY IF EXISTS "Authenticated users can manage images" ON public.product_images;
CREATE POLICY "Authenticated users can manage images"
ON public.product_images FOR ALL
USING ( auth.role() = 'authenticated' );

-- ========================================================
-- 7. Policies for Queries / Inquiries
-- ========================================================
DROP POLICY IF EXISTS "Public can submit queries" ON public.queries;
CREATE POLICY "Public can submit queries"
ON public.queries FOR INSERT
WITH CHECK ( true );

DROP POLICY IF EXISTS "Authenticated users can view queries" ON public.queries;
CREATE POLICY "Authenticated users can view queries"
ON public.queries FOR SELECT
USING ( auth.role() = 'authenticated' );

DROP POLICY IF EXISTS "Authenticated users can update queries" ON public.queries;
CREATE POLICY "Authenticated users can update queries"
ON public.queries FOR UPDATE
USING ( auth.role() = 'authenticated' );

-- ========================================================
-- 8. Storage Bucket for Product Photos
-- ========================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can read product images" ON storage.objects;
CREATE POLICY "Public can read product images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-images' );

DROP POLICY IF EXISTS "Authenticated can upload product images" ON storage.objects;
CREATE POLICY "Authenticated can upload product images"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'product-images' AND auth.role() = 'authenticated' );

DROP POLICY IF EXISTS "Authenticated can delete product images" ON storage.objects;
CREATE POLICY "Authenticated can delete product images"
ON storage.objects FOR DELETE
USING ( bucket_id = 'product-images' AND auth.role() = 'authenticated' );
