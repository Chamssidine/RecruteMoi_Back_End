
'use client';

import Link from 'next/link';
import * as React from 'react';
import { getProfessions } from '@/lib/db';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import type { Category } from '@/lib/types';

export default function CategoriesPage() {
    const [categories, setCategories] = React.useState<Category[]>([]);

    React.useEffect(() => {
        async function fetchCategories() {
            const professions = await getProfessions();
            setCategories(professions.Categories);
        }
        fetchCategories();
    }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-muted-foreground">
          Browse and manage the job categories for the recruteMoi app.
        </p>
        <Button asChild>
          <Link href="/categories/new">
            <PlusCircle />
            <span>Add Category</span>
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Job Categories</CardTitle>
          <CardDescription>
            A list of all the job categories.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {categories.map((category) => (
              <div key={category.En} className="py-2 flex justify-between items-center">
                <div>
                    <p className="font-medium">{category.Fr}</p>
                    <p className="text-sm text-muted-foreground">{category.En}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
