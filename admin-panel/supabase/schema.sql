-- Create Products Table
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

-- Create Product Images Table
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Queries/Leads Table
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

-- Set up Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.queries ENABLE ROW LEVEL SECURITY;

-- Create Storage Bucket for Product Photos (Requires superuser, or do it via Dashboard)
-- insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true);

-- Policies for Products (Admins can do everything, public can read)
CREATE POLICY "Public profiles are viewable by everyone."
ON public.products FOR SELECT
USING ( true );

CREATE POLICY "Users can insert their own products."
ON public.products FOR ALL
USING ( auth.role() = 'authenticated' );

-- Policies for Images
CREATE POLICY "Public images are viewable by everyone."
ON public.product_images FOR SELECT
USING ( true );

CREATE POLICY "Users can insert images."
ON public.product_images FOR ALL
USING ( auth.role() = 'authenticated' );

-- Policies for Queries
CREATE POLICY "Public can insert queries."
ON public.queries FOR INSERT
WITH CHECK ( true );

CREATE POLICY "Only admins can view queries."
ON public.queries FOR SELECT
USING ( auth.role() = 'authenticated' );

CREATE POLICY "Only admins can update queries."
ON public.queries FOR UPDATE
USING ( auth.role() = 'authenticated' );
