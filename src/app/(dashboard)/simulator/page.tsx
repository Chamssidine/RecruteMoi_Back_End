import { getJobs, getCategories } from '@/lib/db';
import { SimulatorClient } from './components/simulator-client';

export default async function SimulatorPage() {
    const jobs = await getJobs();
    const categories = await getCategories();

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
               Select a job to begin your simulated interview. The AI will ask you questions based on the job role.
            </p>
            <SimulatorClient jobs={jobsWithCategory} />
        </div>
    )
}
