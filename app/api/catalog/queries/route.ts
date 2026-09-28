import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { supabase } from '@/lib/supabaseClient';

const QUERIES_FILE = path.join(process.cwd(), 'data', 'queries.json');

function getLocalQueries(): any[] {
  try {
    if (!fs.existsSync(QUERIES_FILE)) {
      fs.mkdirSync(path.dirname(QUERIES_FILE), { recursive: true });
      fs.writeFileSync(QUERIES_FILE, '[]', 'utf8');
      return [];
    }
    const content = fs.readFileSync(QUERIES_FILE, 'utf8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error('Error reading queries.json:', err);
    return [];
  }
}

function saveLocalQueries(queries: any[]) {
  try {
    if (!fs.existsSync(path.dirname(QUERIES_FILE))) {
      fs.mkdirSync(path.dirname(QUERIES_FILE), { recursive: true });
    }
    fs.writeFileSync(QUERIES_FILE, JSON.stringify(queries, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing queries.json:', err);
  }
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET() {
  const localQueries = getLocalQueries();
  const allQueries: any[] = [...localQueries];

  // Try Supabase if table exists
  try {
    const { data: dbQueries, error } = await supabase
      .from('queries')
      .select('*, products(name)')
      .order('created_at', { ascending: false });

    if (!error && dbQueries && dbQueries.length > 0) {
      dbQueries.forEach((item: any) => {
        const exists = allQueries.some((q) => q.id === item.id);
        if (!exists) {
          allQueries.push({
            id: item.id,
            customer_name: item.customer_name,
            customer_phone: item.customer_phone,
            customer_email: item.customer_email,
            message: item.message,
            status: item.status || 'New',
            created_at: item.created_at,
            product_name: item.products?.name,
          });
        }
      });
    }
  } catch {
    // Supabase table not created yet or offline
  }

  return NextResponse.json(allQueries, { headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const id = body.id || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newQuery = {
      id,
      customer_name: body.customer_name || body.name || 'Interested Buyer',
      customer_phone: body.customer_phone || body.phone || '',
      customer_email: body.customer_email || body.email || '',
      message: body.message || body.notes || 'Inquired about boiler specifications and quote.',
      status: 'New',
      product_name: body.product_name || body.productName || '',
      product_id: body.product_id || null,
      created_at: new Date().toISOString(),
    };

    // 1. Save locally
    const localQueries = getLocalQueries();
    localQueries.unshift(newQuery);
    saveLocalQueries(localQueries);

    // 2. Try Supabase
    try {
      await supabase.from('queries').insert({
        customer_name: newQuery.customer_name,
        customer_phone: newQuery.customer_phone,
        customer_email: newQuery.customer_email,
        message: newQuery.message,
        status: 'New',
        product_id: newQuery.product_id,
      });
    } catch {
      // Supabase table not ready
    }

    return NextResponse.json(newQuery, { status: 201, headers: CORS_HEADERS });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to submit inquiry' },
      { status: 400, headers: CORS_HEADERS }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400, headers: CORS_HEADERS });
    }

    const localQueries = getLocalQueries();
    const updated = localQueries.map((q) => (q.id === id ? { ...q, status } : q));
    saveLocalQueries(updated);

    try {
      await supabase.from('queries').update({ status }).eq('id', id);
    } catch {
      // Supabase table not ready
    }

    return NextResponse.json({ success: true, id, status }, { headers: CORS_HEADERS });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to update inquiry' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
