
'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';

import { getProfessions } from '@/lib/db';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { createProfession, type ProfessionState } from '@/app/actions';
import type { Category } from '@/lib/types';


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Adding Profession...' : 'Add Profession'}
    </Button>
  );
}

export default function NewProfessionPage() {
    const router = useRouter();
    const [categories, setCategories] = React.useState<Category[]>([]);
    const initialState: ProfessionState = { message: null, errors: {} };
    const [state, dispatch] = useActionState(createProfession, initialState);

    React.useEffect(() => {
        async function fetchProfessions() {
            const professionsData = await getProfessions();
            setCategories(professionsData.Categories);
        }
        fetchProfessions();
    }, []);

    React.useEffect(() => {
        if (state.message && !state.errors) {
            toast({
                title: 'Profession Created',
                description: `Successfully created profession: ${state.message}`,
            });
            router.push('/professions');
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
        <CardTitle>Add New Profession</CardTitle>
        <CardDescription>
          Fill out the form to add a new profession to a category.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={dispatch} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select name="category">
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.En} value={category.En}>
                    {category.Fr} ({category.En})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state.errors?.category &&
                state.errors.category.map((error: string) => (
                    <p className="text-sm font-medium text-destructive" key={error}>
                    {error}
                    </p>
                ))}
          </div>
          <div className="space-y-2">
            <Label htmlFor="fr-name">French Name</Label>
            <Input
              id="fr-name"
              name="frName"
              placeholder="e.g. Développeur Web"
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
              placeholder="e.g. Web Developer"
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
            <Label htmlFor="rome-code">ROME Code</Label>
            <Input
              id="rome-code"
              name="romeCode"
              placeholder="e.g. M1805"
              required
            />
            {state.errors?.romeCode &&
                state.errors.romeCode.map((error: string) => (
                    <p className="text-sm font-medium text-destructive" key={error}>
                    {error}
                    </p>
                ))}
          </div>
          <div className="flex justify-end">
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
