-- ========================================================
-- PANDAYJI IRON WORKS — DATABASE & STORAGE SCHEMA
-- Run this in Supabase Dashboard -> SQL Editor -> New Query -> Run
-- Project: https://supabase.com/dashboard/project/jleoipecxyohpkyywtde/sql/new
-- ========================================================

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL DEFAULT 0,
    capacity TEXT,
    specifications TEXT,
    manufacturer TEXT DEFAULT 'Pandayji Iron Works',
    show_call_now BOOLEAN DEFAULT true,
    show_interested BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Product Images Table
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Queries / Leads Table
CREATE TABLE IF NOT EXISTS public.queries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT,
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    customer_phone TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Resolved', 'Spam')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure product_name exists if table was previously created
ALTER TABLE public.queries ADD COLUMN IF NOT EXISTS product_name TEXT;

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.queries ENABLE ROW LEVEL SECURITY;

-- 5. Full RLS Policies for Products (Read & Write)
DROP POLICY IF EXISTS "Allow all operations for products" ON public.products;
DROP POLICY IF EXISTS "Public products viewable by everyone" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can manage products" ON public.products;

CREATE POLICY "Allow all operations for products"
ON public.products FOR ALL
USING ( true )
WITH CHECK ( true );

-- 6. Full RLS Policies for Product Images (Read & Write)
DROP POLICY IF EXISTS "Allow all operations for product images" ON public.product_images;
DROP POLICY IF EXISTS "Public images viewable by everyone" ON public.product_images;
DROP POLICY IF EXISTS "Authenticated users can manage images" ON public.product_images;

CREATE POLICY "Allow all operations for product images"
ON public.product_images FOR ALL
USING ( true )
WITH CHECK ( true );

-- 7. Full RLS Policies for Queries / Leads
DROP POLICY IF EXISTS "Allow all operations for queries" ON public.queries;
DROP POLICY IF EXISTS "Public can submit queries" ON public.queries;
DROP POLICY IF EXISTS "Authenticated users can view queries" ON public.queries;
DROP POLICY IF EXISTS "Authenticated users can update queries" ON public.queries;

CREATE POLICY "Allow all operations for queries"
ON public.queries FOR ALL
USING ( true )
WITH CHECK ( true );

-- 8. Storage Bucket for Product Photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 9. Storage Object Policies (Public Read & Write)
DROP POLICY IF EXISTS "Allow all access to product images" ON storage.objects;
DROP POLICY IF EXISTS "Public can read product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can delete product images" ON storage.objects;

CREATE POLICY "Allow all access to product images"
ON storage.objects FOR ALL
USING ( bucket_id = 'product-images' )
WITH CHECK ( bucket_id = 'product-images' );
