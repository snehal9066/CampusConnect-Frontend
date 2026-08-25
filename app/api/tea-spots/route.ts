import { NextResponse } from 'next/server';
import API_URL from '../../../services/api';

export async function GET(request: Request) {
  if (!API_URL) {
    return NextResponse.json({ error: 'Backend URL not configured' }, { status: 500 });
  }
  try {
    const res = await fetch(`${API_URL}/api/tea-spots`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch tea spots' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!API_URL) {
    return NextResponse.json({ error: 'Backend URL not configured' }, { status: 500 });
  }
  try {
    const body = await request.json();
    const res = await fetch(`${API_URL}/api/tea-spots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create tea spot' }, { status: 500 });
  }
}
