import { Header } from '@/components/Header';
import { LoginForm } from '@/components/LoginForm';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-2 2xl:p-24">
      <Header />
      <div className="flex w-full max-w-5xl items-center justify-center py-10 2xl:py-40">
        <LoginForm />
      </div>
    </main>
  );
}
