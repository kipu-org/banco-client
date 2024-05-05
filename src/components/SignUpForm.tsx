'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSignUpMutation } from '@/graphql/mutations/__generated__/signUp.generated';
import {
  argon2Hash,
  createProtectedSymmetricKey,
  rsaGenerateProtectedKeyPair,
} from '@/utils/crypto';
import {
  evaluatePasswordStrength,
  MIN_PASSWORD_LENGTH,
} from '@/utils/password';

import { Checkbox } from './ui/checkbox';

const FormSchema = z
  .object({
    email: z.string().email().min(5, {
      message: 'Invalid email.',
    }),
    password: z.string().min(MIN_PASSWORD_LENGTH, {
      message: `Password needs to be at least ${MIN_PASSWORD_LENGTH} characters.`,
    }),
    confirm_password: z.string(),
    password_hint: z.string().optional(),
    accept_tos_and_pp: z.boolean(),
  })
  .refine(data => data.password === data.confirm_password, {
    message: "Passwords don't match.",
    path: ['confirm_password'],
  })
  .refine(data => !!data.accept_tos_and_pp, {
    message: 'You must accept to sign up.',
    path: ['accept_tos_and_pp'],
  });

export function SignUpForm() {
  const [loading, setLoading] = useState(false);

  const [signUp] = useSignUpMutation({
    onError: () => console.log('errooooooooor'),
    onCompleted: () => {
      window.location.href = '/user';
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    reValidateMode: 'onChange',
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      password_hint: '',
      confirm_password: '',
      accept_tos_and_pp: false,
    },
  });

  const password = form.watch('password', '');
  const strength = evaluatePasswordStrength(password);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (loading) return;

    setLoading(true);
    try {
      const masterKey = await argon2Hash(data.password, data.email);
      const masterPasswordHash = await argon2Hash(masterKey, data.password);

      const { protectedSymmetricKey, iv } =
        await createProtectedSymmetricKey(masterKey);

      const { publicKey, protectedPrivateKey } =
        await rsaGenerateProtectedKeyPair(masterKey, iv);

      signUp({
        variables: {
          input: {
            email: data.email,
            master_password_hash: masterPasswordHash,
            password_hint: data.password_hint || undefined,
            symmetric_key_iv: iv,
            protected_symmetric_key: protectedSymmetricKey,
            rsa_key_pair: {
              public_key: publicKey,
              protected_private_key: protectedPrivateKey,
            },
          },
        },
      });
    } catch (error) {
      console.log('ERROR', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="satoshi@nakamoto.com" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                You will use your email to login.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Master Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="supersecretpassword"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                <strong>Important: </strong>
                Your master password cannot be recovered if you forget it!{' '}
                {strength ? `Password is: ${strength.title}` : null}
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm your Master Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="supersecretpassword"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password_hint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Master Password Hint</FormLabel>
              <FormControl>
                <Input
                  placeholder="Hint to remember your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accept_tos_and_pp"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="flex flex-col gap-2">
                <FormLabel>
                  By checking this box you agree to the Terms of Service and the
                  Privacy Policy.
                </FormLabel>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Sign Up
        </Button>
      </form>
    </Form>
  );
}
