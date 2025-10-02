'use client';

import * as React from 'react';
import { runInterviewTurnAction } from '@/lib/actions/ai';
import { type Job, type Message } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, User, Send, CornerDownLeft } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

type JobWithCategory = Job & { categoryName: string };

export function SimulatorClient({ jobs }: { jobs: JobWithCategory[] }) {
  const [selectedJobId, setSelectedJobId] = React.useState<string | null>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const jobsByCategory = jobs.reduce((acc, job) => {
    (acc[job.categoryName] = acc[job.categoryName] || []).push(job);
    return acc;
  }, {} as Record<string, JobWithCategory[]>);

  React.useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [messages])

  const handleJobSelect = async (jobId: string) => {
    setSelectedJobId(jobId);
    setMessages([]);
    setIsLoading(true);

    const result = await runInterviewTurnAction(jobId, []);
    if (result.success && result.response) {
      setMessages([{ id: Date.now().toString(), role: 'assistant', content: result.response }]);
    } else {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
      setSelectedJobId(null);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedJobId || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const result = await runInterviewTurnAction(selectedJobId, newMessages);

    if (result.success && result.response) {
      const assistantMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: result.response };
      setMessages([...newMessages, assistantMessage]);
    } else {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
      // Remove the user message if the AI fails to respond
      setMessages(messages);
    }
    setIsLoading(false);
  };
  
  if (!selectedJobId) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-2 text-center">Select a Job Role</h2>
          <Select onValueChange={handleJobSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a job to start..." />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(jobsByCategory).map(([category, jobs]) => (
                <SelectGroup key={category}>
                  <SelectLabel>{category}</SelectLabel>
                  {jobs.map(job => (
                    <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    );
  }

  const selectedJob = jobs.find(j => j.id === selectedJobId);

  return (
    <Card className="h-[75vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
            <div>
                <h2 className="font-headline font-semibold">{selectedJob?.title} Interview</h2>
                <p className="text-sm text-muted-foreground">AI Simulation</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setSelectedJobId(null)}>Change Job</Button>
        </div>
      <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full" ref={scrollAreaRef}>
             <div className="p-4 space-y-4">
                {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                    message.role === 'user' ? 'justify-end' : ''
                    }`}
                >
                    {message.role === 'assistant' && (
                    <Avatar className="w-8 h-8">
                        <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    )}
                    <div
                    className={`max-w-sm md:max-w-md lg:max-w-lg rounded-xl px-4 py-2 ${
                        message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary'
                    }`}
                    >
                    <p className="text-sm">{message.content}</p>
                    </div>
                    {message.role === 'user' && (
                    <Avatar className="w-8 h-8">
                        <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    )}
                </div>
                ))}
                {isLoading && messages.length > 0 && (
                     <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                            <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                        </Avatar>
                        <div className="max-w-sm md:max-w-md lg:max-w-lg rounded-xl px-4 py-2 bg-secondary flex items-center gap-2">
                           <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                           <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                           <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        </div>
                    </div>
                )}
             </div>
          </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer..."
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
