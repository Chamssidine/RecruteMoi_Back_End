
'use client';

import Link from 'next/link';
import Image from 'next/image';
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
              <div key={category.En} className="py-2 grid grid-cols-4 items-center gap-4">
                <div className="col-span-2">
                    <p className="font-medium">{category.Fr}</p>
                    <p className="text-sm text-muted-foreground">{category.En}</p>
                </div>
                 <div className="relative h-10 w-10">
                    <Image src={category.IconUrl} alt={`${category.En} icon`} fill className="object-contain" />
                </div>
                 <div className="flex gap-2">
                    <div className="relative h-16 w-16">
                        <Image src={category.FrIllustrationUrl} alt={`${category.Fr} illustration`} fill className="object-cover rounded-md" />
                         <p className="text-xs text-center absolute -bottom-4 w-full">FR</p>
                    </div>
                     <div className="relative h-16 w-16">
                        <Image src={category.EnIllustrationUrl} alt={`${category.En} illustration`} fill className="object-cover rounded-md" />
                         <p className="text-xs text-center absolute -bottom-4 w-full">EN</p>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
