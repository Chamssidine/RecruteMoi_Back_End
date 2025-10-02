
import { getProfessions } from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const professions = await getProfessions();
    return NextResponse.json(professions);
  } catch (error) {
    console.error('Failed to fetch professions:', error);
    return NextResponse.json({ message: 'Failed to fetch professions' }, { status: 500 });
  }
}
