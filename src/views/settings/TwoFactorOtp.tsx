'use client';

import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Check, Copy, CopyCheck, Loader2 } from 'lucide-react';
import { useQRCode } from 'next-qrcode';
import { FC, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import {
  useTwoFactorOtpAddMutation,
  useTwoFactorOtpVerifyMutation,
} from '@/graphql/mutations/__generated__/otp.generated';
import useCopyClipboard from '@/hooks/useClipboardCopy';
import { handleApolloError } from '@/utils/error';

import { Section } from './Section';

export const OTP: FC<{ hasAlready: boolean }> = ({ hasAlready }) => {
  const { Canvas } = useQRCode();

  const { toast } = useToast();

  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  const [setup, { data, loading }] = useTwoFactorOtpAddMutation({
    onError: err => {
      const messages = handleApolloError(err);

      toast({
        variant: 'destructive',
        title: 'Error getting 2FA details.',
        description: messages.join(', '),
      });
    },
  });

  const [verify, { loading: verifyLoading }] = useTwoFactorOtpVerifyMutation({
    onCompleted: () => {
      toast({
        title: 'OTP Setup',
        description: 'OTP 2FA login has been configured for your account.',
      });
      setValue('');
      setOpen(false);
    },
    onError: err => {
      const messages = handleApolloError(err);

      toast({
        variant: 'destructive',
        title: 'Error verifying password.',
        description: messages.join(', '),
      });

      setValue('');
    },
    refetchQueries: ['getAccountTwoFactorMethods'],
  });

  const [isCopied, copy] = useCopyClipboard();

  const handleOTPChange = (value: string) => {
    if (verifyLoading) return;
    setValue(value);

    if (value.length >= 6) {
      verify({ variables: { input: { code: value } } });
    }
  };

  return (
    <Section
      title={'One Time Password (OTP)'}
      description={
        'Enhance the security of your account by setting up Two-Factor Authentication (2FA).'
      }
    >
      <Dialog
        open={open}
        onOpenChange={() => {
          if (loading || hasAlready) return;
          setOpen(o => !o);
        }}
      >
        <DialogTrigger asChild>
          {hasAlready ? (
            <Button className="w-full md:w-fit" variant={'outline'}>
              Enabled <Check className="ml-2 size-4" color="green" />
            </Button>
          ) : (
            <Button
              className="w-full md:w-fit"
              onClick={() => {
                setup();
              }}
            >
              Setup OTP
            </Button>
          )}
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Setup OTP</DialogTitle>
            <DialogDescription>
              Scan the QR code below with your preferred authenticator app or
              manually enter the code provided. Once set up, you will need to
              enter a one-time password (OTP) generated by the app each time you
              log in.
            </DialogDescription>
          </DialogHeader>

          {!data?.two_factor.otp.add.otp_url ? (
            <div className="flex min-h-[300px] w-full items-center justify-center">
              <Loader2 className="size-4 animate-spin" />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Canvas
                text={data.two_factor.otp.add.otp_url}
                options={{
                  errorCorrectionLevel: 'M',
                  margin: 3,
                  scale: 4,
                  width: 280,
                  color: {
                    dark: '#000000',
                    light: '#FFFFFF',
                  },
                }}
              />
              <Label className="mb-2 mt-4">Secret</Label>
              <div className="flex w-full max-w-[280px] gap-2">
                <Input
                  defaultValue={data.two_factor.otp.add.otp_secret}
                  contentEditable={'false'}
                />
                <Button
                  type="button"
                  onClick={() => copy(data.two_factor.otp.add.otp_secret)}
                  size={'icon'}
                  className="px-2"
                  variant={'outline'}
                >
                  {isCopied ? (
                    <CopyCheck color="green" className="size-4" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
          <div className="flex flex-col items-center justify-center">
            <div className="mb-2 mt-4">
              {verifyLoading ? (
                <div className="flex h-[22px] w-full items-center justify-center">
                  <Loader2 className="size-4 animate-spin" />
                </div>
              ) : (
                <Label>Please enter the one-time password</Label>
              )}
            </div>
            <div className="flex w-full justify-center">
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                value={value}
                onChange={handleOTPChange}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Section>
  );
};
