'use client';

import * as React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from '@/hooks/use-toast';
import { Bot, Trash2, Wand2, CornerDownLeft } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { Job, Prompt } from '@/lib/types';
import { createPrompt, createAiPrompts, removePrompt, type PromptState } from '@/lib/actions/prompts';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

function CreatePromptButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="icon" type="submit" disabled={pending}>
      {pending ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" /> : <CornerDownLeft className="h-4 w-4" />}
    </Button>
  );
}

function GenerateAiPromptsButton({jobId}: {jobId: string}) {
  const [isPending, startTransition] = React.useTransition();

  const handleGenerate = () => {
    startTransition(async () => {
      const result = await createAiPrompts(jobId);
      if (result?.message) {
        toast({
          title: result.message.startsWith('Successfully') ? 'Success' : 'Error',
          description: result.message,
          variant: result.message.startsWith('Successfully') ? 'default' : 'destructive',
        });
      }
    });
  }

  return (
    <Button onClick={handleGenerate} disabled={isPending}>
      <Wand2 className={`mr-2 h-4 w-4 ${isPending ? 'animate-pulse' : ''}`} />
      {isPending ? 'Generating with AI...' : 'Generate with AI'}
    </Button>
  );
}

function DeletePromptButton({ promptId, jobId }: { promptId: string, jobId: string }) {
    const [isPending, startTransition] = React.useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            const result = await removePrompt(promptId, jobId);
             if (result?.message) {
                 toast({
                    title: 'Success',
                    description: result.message,
                });
            }
        });
    }

    return (
        <Button variant="ghost" size="icon" onClick={handleDelete} disabled={isPending}>
            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
        </Button>
    )
}

export function PromptClient({ job, initialPrompts }: { job: Job; initialPrompts: Prompt[] }) {
  const initialState: PromptState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createPrompt, initialState);
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state.message && !state.errors) {
      formRef.current?.reset();
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

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline">Interview Prompts</CardTitle>
        <CardDescription>
          Manage the AI-driven interview prompts for this job.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4">
        <div className="flex justify-start">
            <GenerateAiPromptsButton jobId={job.id} />
        </div>
        <Separator />
        {initialPrompts.length > 0 ? (
          <div className="flex-grow space-y-3 overflow-y-auto pr-2">
            {initialPrompts.map(prompt => (
              <div key={prompt.id} className="flex items-center gap-2 group">
                <div className="flex-grow p-3 bg-secondary rounded-md text-sm">
                  {prompt.text}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <DeletePromptButton promptId={prompt.id} jobId={job.id}/>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-8 bg-secondary rounded-lg flex-grow">
            <Bot className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold">No prompts yet</h3>
            <p className="text-sm text-muted-foreground">Add a prompt manually or generate them with AI.</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-6">
        <form ref={formRef} action={dispatch} className="flex w-full items-start gap-2">
          <input type="hidden" name="jobId" value={job.id} />
          <div className="flex-grow">
            <Textarea
              name="text"
              placeholder="Type a new prompt manually..."
              className="min-h-[40px]"
            />
            {state?.errors?.text && <p className="text-xs text-destructive mt-1">{state.errors.text}</p>}
          </div>
          <CreatePromptButton />
        </form>
      </CardFooter>
    </Card>
  );
}
