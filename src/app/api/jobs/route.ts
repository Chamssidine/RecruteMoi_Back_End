import { getJobs } from '@/lib/db';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    
    let jobs = await getJobs();

    if (categoryId) {
      jobs = jobs.filter(job => job.categoryId === categoryId);
    }

    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return NextResponse.json({ message: 'Failed to fetch jobs' }, { status: 500 });
  }
}
