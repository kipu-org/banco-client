import Link from 'next/link';

import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-2 2xl:p-24">
      <div className="mt-1 flex w-full max-w-5xl items-center justify-between text-sm">
        <p className="text-lg font-bold">Banco</p>

        <ThemeToggle />
      </div>
      <div className="flex w-full items-center justify-center gap-4">
        <Button>
          <Link href="/login">Login</Link>
        </Button>
        <Button variant="secondary">
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>
    </main>
  );
}
