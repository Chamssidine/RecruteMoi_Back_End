
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

export default function NewCategoryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Category</CardTitle>
        <CardDescription>
          Fill out the form to add a new job category.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fr-name">French Name</Label>
            <Input
              id="fr-name"
              name="frName"
              placeholder="e.g. Technologie de l'information"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="en-name">English Name</Label>
            <Input
              id="en-name"
              name="enName"
              placeholder="e.g. Information Technology"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Add Category</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
