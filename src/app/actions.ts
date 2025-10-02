
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const CategorySchema = z.object({
  id: z.string(),
  frName: z.string({
    invalid_type_error: 'Please enter a french name.',
  }),
  enName: z.string({
    invalid_type_error: 'Please enter an english name.',
  }),
});

const ProfessionSchema = z.object({
    id: z.string(),
    category: z.string({
        invalid_type_error: 'Please select a category.',
    }),
    frName: z.string({
        invalid_type_error: 'Please enter a french name.',
    }),
    enName: z.string({
        invalid_type_error: 'Please enter an english name.',
    }),
    romeCode: z.string({
        invalid_type_error: 'Please enter a ROME code.',
    }),
});

const CreateCategory = CategorySchema.omit({ id: true });
const CreateProfession = ProfessionSchema.omit({ id: true });

export type CategoryState = {
  errors?: {
    frName?: string[];
    enName?: string[];
  };
  message?: string | null;
};

export type ProfessionState = {
    errors?: {
        category?: string[];
        frName?: string[];
        enName?: string[];
        romeCode?: string[];
    };
    message?: string | null;
}

export async function createCategory(prevState: CategoryState, formData: FormData) {
  const validatedFields = CreateCategory.safeParse({
    frName: formData.get('frName'),
    enName: formData.get('enName'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Category.',
    };
  }

  const { frName, enName } = validatedFields.data;
  
  // In a real app, you would insert the data into a database.
  // For now, we'll just log it.
  console.log('Creating category:', { frName, enName });

  revalidatePath('/categories');
  return { message: `${frName} (${enName})`, errors: undefined };
}


export async function createProfession(prevState: ProfessionState, formData: FormData) {
    const validatedFields = CreateProfession.safeParse({
        category: formData.get('category'),
        frName: formData.get('frName'),
        enName: formData.get('enName'),
        romeCode: formData.get('romeCode'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Profession.',
        };
    }

    const { category, frName, enName, romeCode } = validatedFields.data;
    
    // In a real app, you would insert the data into a database.
    // For now, we'll just log it.
    console.log('Creating profession:', { category, frName, enName, romeCode });
    
    revalidatePath('/professions');
    return { message: `${frName} (${enName})`, errors: undefined };
}
