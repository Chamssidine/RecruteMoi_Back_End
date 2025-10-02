import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJob, getCategory, getPromptsByJobId } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PromptClient } from './components/prompt-client';
import { ArrowLeft } from 'lucide-react';

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const job = await getJob(params.id);
  if (!job) {
    notFound();
  }

  const category = await getCategory(job.categoryId);
  const prompts = await getPromptsByJobId(params.id);

  return (
    <div className="flex flex-col gap-6">
       <Link href="/jobs" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to all jobs
      </Link>
      
      <div className='grid gap-6 lg:grid-cols-3'>
        <div className="lg:col-span-1 flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">{job.title}</CardTitle>
                    <CardDescription>in <span className="font-semibold text-primary">{category?.name || 'Uncategorized'}</span></CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{job.description}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Required Skills</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {job.requiredSkills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Soft Skills</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {job.softSkills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <PromptClient job={job} initialPrompts={prompts} />
        </div>
      </div>
    </div>
  );
}
