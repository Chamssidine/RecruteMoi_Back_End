import { getCategories, getJobs } from '@/lib/db';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Shapes, Briefcase, Bot } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default async function DashboardPage() {
  const categories = await getCategories();
  const jobs = await getJobs();

  const stats = [
    {
      title: 'Total Categories',
      value: categories.length,
      icon: <Shapes className="h-6 w-6 text-muted-foreground" />,
    },
    {
      title: 'Total Jobs',
      value: jobs.length,
      icon: <Briefcase className="h-6 w-6 text-muted-foreground" />,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-headline text-3xl font-bold tracking-tight">
        Welcome Back!
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="flex flex-col items-center justify-center p-8 text-center bg-card shadow-lg rounded-lg">
        <Bot className="h-16 w-16 text-primary mb-4" />
        <h2 className="font-headline text-2xl font-semibold mb-2">
          Start an Interview Simulation
        </h2>
        <p className="max-w-md text-muted-foreground mb-6">
          Practice your interview skills by simulating a real-world job interview with our advanced AI.
        </p>
        <Button asChild size="lg">
          <Link href="/simulator">
            Go to Simulator <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </Card>
    </div>
  );
}
