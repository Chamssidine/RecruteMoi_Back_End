'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { addCategory, updateCategory, deleteCategory } from '@/lib/db';

const CategorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: 'Name must be at least 3 characters long.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long.' }),
});

export type CategoryState = {
  errors?: {
    name?: string[];
    description?: string[];
  };
  message?: string | null;
};

export async function saveCategory(prevState: CategoryState, formData: FormData) {
  const id = formData.get('id') as string | null;
  const validatedFields = CategorySchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to save category. Please check the fields.',
    };
  }
  
  const { name, description } = validatedFields.data;

  try {
    if (id) {
        await updateCategory(id, { name, description });
    } else {
        await addCategory({ name, description });
    }
  } catch (e) {
    return { message: 'Database Error: Failed to save category.' };
  }

  revalidatePath('/categories');
  revalidatePath('/dashboard');
  return { message: `Successfully saved category ${name}.` };
}

export async function removeCategory(id: string) {
    try {
        await deleteCategory(id);
    } catch (e) {
        return { message: 'Database Error: Failed to delete category.' };
    }
    revalidatePath('/categories');
    revalidatePath('/dashboard');
    revalidatePath('/jobs');
}
