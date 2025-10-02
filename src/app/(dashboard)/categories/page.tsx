import { getCategories } from '@/lib/db';
import { CategoryClient } from './components/category-client';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <p className="text-muted-foreground mb-4">
        Manage the job categories for your organization. You can add, edit, and delete categories as needed.
      </p>
      <CategoryClient data={categories} />
    </div>
  );
}
