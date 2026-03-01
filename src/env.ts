import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import { z } from 'zod';

const envSchema = z.object({
  URL: z.string().url('URL must be a valid URL'),
  SERVER_URL: z.string().url('SERVER_URL must be a valid URL'),
  EVENTS_URL: z.string().url('EVENTS_URL must be a valid URL').optional(),
  ENABLE_PLAUSIBLE: z.string().optional(),
  PLAUSIBLE_DOMAIN: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv() {
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) return;

  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('Invalid environment variables:');
    for (const issue of result.error.issues) {
      console.error(`  ${issue.path.join('.')}: ${issue.message}`);
    }
    throw new Error('Missing or invalid environment variables. Check .env.example for required values.');
  }

  return result.data;
}
