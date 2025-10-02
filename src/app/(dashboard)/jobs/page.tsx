import { getJobs, getCategories } from '@/lib/db';
import { JobClient } from './components/job-client';

export default async function JobsPage() {
  const jobs = await getJobs();
  const categories = await getCategories();

  // Augment jobs with category name for easier display
  const jobsWithCategory = jobs.map(job => {
    const category = categories.find(c => c.id === job.categoryId);
    return {
      ...job,
      categoryName: category ? category.name : 'N/A',
    };
  });

  return (
    <div>
      <p className="text-muted-foreground mb-4">
        Define and manage specific jobs within each category, including required skills and soft skills.
      </p>
      <JobClient data={jobsWithCategory} categories={categories.map(({id, name}) => ({id, name}))} />
    </div>
  );
}
