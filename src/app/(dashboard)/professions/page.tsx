
'use client';

import Link from 'next/link';
import * as React from 'react';
import { getProfessions } from '@/lib/db';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import type { Category } from '@/lib/types';


export default function ProfessionsPage() {
  const [professions, setProfessions] = React.useState<Category[]>([]);

  React.useEffect(() => {
    async function fetchProfessions() {
        const professionsData = await getProfessions();
        setProfessions(professionsData.Categories);
    }
    fetchProfessions();
  }, []);


  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-muted-foreground">
          Browse the job categories and professions available in the recruteMoi app.
        </p>
        <Button asChild>
          <Link href="/professions/new">
            <PlusCircle />
            <span>Add Profession</span>
          </Link>
        </Button>
      </div>
       <Accordion type="single" collapsible className="w-full">
        {professions.map((category) => (
          <AccordionItem value={category.En} key={category.En}>
            <AccordionTrigger>
                <div className='flex items-center gap-4'>
                    <span className="font-semibold">{category.Fr}</span>
                    <span className="text-muted-foreground">({category.En})</span>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className="flex flex-col gap-2 p-4 bg-secondary rounded-md">
                    {category.Metiers.map((metier) => (
                        <div key={metier.Rome} className="flex justify-between items-center p-2 rounded-md hover:bg-background/50">
                            <div>
                                <p className="font-medium">{metier.Fr}</p>
                                <p className="text-sm text-muted-foreground">{metier.En}</p>
                            </div>
                            <Badge variant="outline">{metier.Rome}</Badge>
                        </div>
                    ))}
                </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
