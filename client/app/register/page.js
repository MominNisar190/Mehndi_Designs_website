import { redirect } from 'next/navigation';

// Registration is disabled — redirect to home
export default function RegisterPage() {
  redirect('/');
}
