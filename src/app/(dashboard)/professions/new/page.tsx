
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

export default async function NewProfessionPage() {
  const professions = await getProfessions();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Profession</CardTitle>
        <CardDescription>
          Fill out the form to add a new profession to a category.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select name="category">
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {professions.Categories.map((category) => (
                  <SelectItem key={category.En} value={category.En}>
                    {category.Fr} ({category.En})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="fr-name">French Name</Label>
            <Input
              id="fr-name"
              name="frName"
              placeholder="e.g. Développeur Web"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="en-name">English Name</Label>
            <Input
              id="en-name"
              name="enName"
              placeholder="e.g. Web Developer"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rome-code">ROME Code</Label>
            <Input
              id="rome-code"
              name="romeCode"
              placeholder="e.g. M1805"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Add Profession</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
