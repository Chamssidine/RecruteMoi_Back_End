
import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to a placeholder page as the dashboard is removed for now.
  redirect('/professions');
}
