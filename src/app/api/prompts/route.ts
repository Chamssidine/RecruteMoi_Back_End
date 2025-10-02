import { getPromptsByJobId } from '@/lib/db';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');

    if (!jobId) {
      return NextResponse.json({ message: 'jobId is required' }, { status: 400 });
    }
    
    const prompts = await getPromptsByJobId(jobId);

    return NextResponse.json(prompts);
  } catch (error) {
    console.error('Failed to fetch prompts:', error);
    return NextResponse.json({ message: 'Failed to fetch prompts' }, { status: 500 });
  }
}
