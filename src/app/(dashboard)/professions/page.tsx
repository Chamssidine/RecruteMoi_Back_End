
import { getProfessions } from '@/lib/db';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from '@/components/ui/badge';


export default async function ProfessionsPage() {
  const professions = await getProfessions();

  return (
    <div>
      <p className="text-muted-foreground mb-4">
        Browse the job categories and professions available in the recruteMoi app.
      </p>
       <Accordion type="single" collapsible className="w-full">
        {professions.Categories.map((category) => (
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
