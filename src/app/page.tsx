
import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the professions page as the main dashboard.
  redirect('/professions');
}
