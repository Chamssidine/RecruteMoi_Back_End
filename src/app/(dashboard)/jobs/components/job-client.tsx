'use client';

import * as React from 'react';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { MoreHorizontal, PlusCircle, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import type { Job, Category } from '@/lib/types';
import { saveJob, removeJob, type JobState } from '@/lib/actions/jobs';
import { Badge } from '@/components/ui/badge';

type SimpleCategory = Pick<Category, 'id' | 'name'>;
type JobWithCategoryName = Job & { categoryName: string };

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Job'}
    </Button>
  );
}

function JobForm({ job, categories }: { job?: Job; categories: SimpleCategory[] }) {
  const initialState: JobState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(saveJob, initialState);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (state.message && !state.errors) {
      setIsOpen(false);
      toast({
        title: 'Success',
        description: state.message,
      });
    } else if (state.message && state.errors) {
       toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state]);

  const isEditing = !!job;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {isEditing ? (
          <button className="w-full text-left relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Edit</button>
        ) : (
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Job
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline">
            {isEditing ? 'Edit Job' : 'Add New Job'}
          </DialogTitle>
          <DialogDescription>
             {isEditing ? 'Update the details for this job.' : 'Add a new job to a category.'}
          </DialogDescription>
        </DialogHeader>
        <form action={dispatch}>
          <div className="grid gap-4 py-4">
            {isEditing && <input type="hidden" name="id" value={job.id} />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" name="title" defaultValue={job?.title} />
                    {state.errors?.title && <p className="text-xs text-destructive">{state.errors.title}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="categoryId">Category</Label>
                    <Select name="categoryId" defaultValue={job?.categoryId}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                     {state.errors?.categoryId && <p className="text-xs text-destructive">{state.errors.categoryId}</p>}
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={job?.description} />
                {state.errors?.description && <p className="text-xs text-destructive">{state.errors.description}</p>}
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="requiredSkills">Required Skills</Label>
                    <Input id="requiredSkills" name="requiredSkills" defaultValue={job?.requiredSkills?.join(', ')} placeholder="React, Node.js, ..." />
                    <p className="text-xs text-muted-foreground">Separate skills with a comma.</p>
                    {state.errors?.requiredSkills && <p className="text-xs text-destructive">{state.errors.requiredSkills}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="softSkills">Soft Skills</Label>
                    <Input id="softSkills" name="softSkills" defaultValue={job?.softSkills?.join(', ')} placeholder="Communication, Teamwork, ..." />
                    <p className="text-xs text-muted-foreground">Separate skills with a comma.</p>
                    {state.errors?.softSkills && <p className="text-xs text-destructive">{state.errors.softSkills}</p>}
                </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
            <SubmitButton isEditing={isEditing} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteDialog({ jobId }: { jobId: string }) {
    const [isPending, startTransition] = React.useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            const result = await removeJob(jobId);
            if (result?.message) {
                 toast({ title: 'Error', description: result.message, variant: 'destructive'});
            } else {
                 toast({ title: 'Success', description: 'Job deleted.'});
            }
        });
    };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="w-full text-left text-destructive relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-destructive/10 focus:text-destructive data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Delete</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the job and all its prompts.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending} className="bg-destructive hover:bg-destructive/90">
            {isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export const JobClient = ({ data, categories }: { data: JobWithCategoryName[], categories: SimpleCategory[] }) => {
  
  const columns: ColumnDef<JobWithCategoryName>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => <div className="font-medium">{row.getValue('title')}</div>,
    },
    {
      accessorKey: 'categoryName',
      header: 'Category',
      cell: ({ row }) => <Badge variant="secondary">{row.getValue('categoryName')}</Badge>,
    },
     {
      accessorKey: 'requiredSkills',
      header: 'Skills',
      cell: ({ row }) => {
        const skills = row.getValue('requiredSkills') as string[];
        return <div className="flex flex-wrap gap-1 max-w-sm">{skills.slice(0,3).map(skill => <Badge key={skill} variant="outline">{skill}</Badge>)} {skills.length > 3 && <Badge variant="ghost">...</Badge>}</div>
      }
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const job = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
               <DropdownMenuItem asChild>
                <Link href={`/jobs/${job.id}`} className="flex items-center">
                    <Eye className="mr-2 h-4 w-4"/> View & Manage Prompts
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <JobForm job={job} categories={categories} />
              <DeleteDialog jobId={job.id} />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-end py-4">
        <JobForm categories={categories} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No jobs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
       <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
};
