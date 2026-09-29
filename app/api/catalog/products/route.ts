import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { supabase } from '@/lib/supabaseClient';

const DATA_FILE = path.join(process.cwd(), 'data', 'products.json');
const DELETED_FILE = path.join(process.cwd(), 'data', 'deleted_ids.json');

function getDeletedIds(): string[] {
  try {
    if (!fs.existsSync(DELETED_FILE)) return [];
    const content = fs.readFileSync(DELETED_FILE, 'utf8');
    return JSON.parse(content || '[]');
  } catch {
    return [];
  }
}

function saveDeletedId(id: string) {
  try {
    if (!fs.existsSync(path.dirname(DELETED_FILE))) {
      fs.mkdirSync(path.dirname(DELETED_FILE), { recursive: true });
    }
    const list = getDeletedIds();
    if (!list.includes(id)) {
      list.push(id);
      fs.writeFileSync(DELETED_FILE, JSON.stringify(list, null, 2), 'utf8');
    }
  } catch (err) {
    console.error('Error saving deleted ID:', err);
  }
}

function getLocalProducts(): any[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
      fs.writeFileSync(DATA_FILE, '[]', 'utf8');
      return [];
    }
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error('Error reading products.json:', err);
    return [];
  }
}

function saveLocalProducts(products: any[]) {
  try {
    if (!fs.existsSync(path.dirname(DATA_FILE))) {
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing products.json:', err);
  }
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const allProducts: any[] = [];

  // 1. Primary Source of Truth: Supabase Cloud Database
  try {
    const { data: dbProducts, error } = await supabase
      .from('products')
      .select('*, product_images(image_url)')
      .order('created_at', { ascending: false });

    if (!error && dbProducts) {
      dbProducts.forEach((item: any) => {
        const imgs = item.product_images?.map((pi: any) => pi.image_url) || [];
        allProducts.push({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          capacity: item.capacity,
          specifications: item.specifications,
          manufacturer: item.manufacturer,
          show_call_now: item.show_call_now,
          show_interested: item.show_interested,
          images: imgs,
          created_at: item.created_at,
        });
      });

      const deletedIds = getDeletedIds();
      const filteredProducts = allProducts.filter((p) => !deletedIds.includes(p.id) && !deletedIds.includes(p.name?.toLowerCase()));
      return NextResponse.json(filteredProducts, { headers: CORS_HEADERS });
    }
  } catch (err) {
    // Supabase offline fallback
  }

  // 2. Offline fallback to local persistent file only if Supabase errored
  const localProducts = getLocalProducts();
  const deletedIds = getDeletedIds();
  const filteredProducts = localProducts.filter((p) => !deletedIds.includes(p.id) && !deletedIds.includes(p.name?.toLowerCase()));

    return NextResponse.json(filteredProducts, { headers: CORS_HEADERS });
  } catch (err: any) {
    console.error('Fatal error in GET /api/catalog/products:', err);
    return NextResponse.json([], { headers: CORS_HEADERS });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const id = body.id || `prod_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newProduct = {
      id,
      name: body.name || '',
      description: body.description || '',
      price: Number(body.price) || 0,
      capacity: body.capacity || '',
      specifications: body.specifications || '',
      manufacturer: body.manufacturer || 'Pandayji Iron Works',
      show_call_now: body.show_call_now ?? true,
      show_interested: body.show_interested ?? true,
      images: Array.isArray(body.images) ? body.images : [],
      created_at: body.created_at || new Date().toISOString(),
    };

    // 1. Save to local persistent JSON
    const localProducts = getLocalProducts();
    const filtered = localProducts.filter((p) => p.id !== id);
    filtered.unshift(newProduct);
    saveLocalProducts(filtered);

    // 2. Attempt save to Supabase
    try {
      const { data: inserted, error } = await supabase
        .from('products')
        .insert({
          name: newProduct.name,
          description: newProduct.description,
          price: newProduct.price,
          capacity: newProduct.capacity,
          specifications: typeof newProduct.specifications === 'string'
            ? newProduct.specifications
            : JSON.stringify(newProduct.specifications),
          manufacturer: newProduct.manufacturer,
          show_call_now: newProduct.show_call_now,
          show_interested: newProduct.show_interested,
        })
        .select()
        .single();

      if (!error && inserted && newProduct.images.length > 0) {
        const imgRows = newProduct.images.map((url: string) => ({
          product_id: inserted.id,
          image_url: url,
        }));
        await supabase.from('product_images').insert(imgRows);
      }
    } catch (err) {
      // Supabase table not created yet
    }

    return NextResponse.json(newProduct, { status: 201, headers: CORS_HEADERS });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to create product' },
      { status: 400, headers: CORS_HEADERS }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json({ error: 'Missing product ID' }, { status: 400, headers: CORS_HEADERS });
    }

    const localProducts = getLocalProducts();
    const index = localProducts.findIndex((p) => p.id === id);

    const updatedProduct = {
      id,
      name: body.name || '',
      description: body.description || '',
      price: Number(body.price) || 0,
      capacity: body.capacity || '',
      specifications: body.specifications || '',
      manufacturer: body.manufacturer || 'Pandayji Iron Works',
      show_call_now: body.show_call_now ?? true,
      show_interested: body.show_interested ?? true,
      images: Array.isArray(body.images) ? body.images : [],
      updated_at: new Date().toISOString(),
      created_at: body.created_at || (index >= 0 ? localProducts[index].created_at : new Date().toISOString()),
    };

    if (index >= 0) {
      localProducts[index] = updatedProduct;
    } else {
      localProducts.unshift(updatedProduct);
    }
    saveLocalProducts(localProducts);

    // Try updating Supabase
    try {
      await supabase
        .from('products')
        .update({
          name: updatedProduct.name,
          description: updatedProduct.description,
          price: updatedProduct.price,
          capacity: updatedProduct.capacity,
          specifications: typeof updatedProduct.specifications === 'string'
            ? updatedProduct.specifications
            : JSON.stringify(updatedProduct.specifications),
          manufacturer: updatedProduct.manufacturer,
          show_call_now: updatedProduct.show_call_now,
          show_interested: updatedProduct.show_interested,
        })
        .eq('id', id);

      if (updatedProduct.images.length > 0) {
        await supabase.from('product_images').delete().eq('product_id', id);
        const imgRows = updatedProduct.images.map((url: string) => ({
          product_id: id,
          image_url: url,
        }));
        await supabase.from('product_images').insert(imgRows);
      }
    } catch {
      // Supabase table not created yet
    }

    return NextResponse.json(updatedProduct, { headers: CORS_HEADERS });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to update product' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing product ID' }, { status: 400, headers: CORS_HEADERS });
    }

    // 1. Record ID in deleted list so it never resurrects
    saveDeletedId(id);

    // 2. Remove from local persistent JSON
    const localProducts = getLocalProducts();
    const updated = localProducts.filter((p) => p.id !== id && p.name?.toLowerCase() !== id.toLowerCase());
    saveLocalProducts(updated);

    // 3. Remove from Supabase
    try {
      await supabase.from('products').delete().eq('id', id);
    } catch {
      // ignore
    }

    return NextResponse.json({ success: true, id }, { headers: CORS_HEADERS });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to delete product' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
