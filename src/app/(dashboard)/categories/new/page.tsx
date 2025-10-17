
'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import type { CategoryState } from '@/app/actions';
import { createCategory } from '@/app/actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Adding Category...' : 'Add Category'}
    </Button>
  );
}

export default function NewCategoryPage() {
  const router = useRouter();
  const initialState: CategoryState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(createCategory, initialState);

  React.useEffect(() => {
    if (state.message && !state.errors) {
      toast({
        title: 'Category Created',
        description: `Successfully created category: ${state.message}`,
      });
      router.push('/professions/new');
    } else if (state.message && state.errors) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, router]);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Category</CardTitle>
        <CardDescription>
          Fill out the form to add a new job category.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={dispatch} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fr-name">French Name</Label>
            <Input
              id="fr-name"
              name="frName"
              placeholder="e.g. Technologie de l'information"
              required
            />
             {state.errors?.frName &&
              state.errors.frName.map((error: string) => (
                <p className="text-sm font-medium text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <div className="space-y-2">
            <Label htmlFor="en-name">English Name</Label>
            <Input
              id="en-name"
              name="enName"
              placeholder="e.g. Information Technology"
              required
            />
            {state.errors?.enName &&
              state.errors.enName.map((error: string) => (
                <p className="text-sm font-medium text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
           <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <Input id="icon" name="icon" type="file" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Illustration Image</Label>
            <Input id="image" name="image" type="file" />
          </div>
          <div className="flex justify-end">
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
