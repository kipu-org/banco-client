'use client';

import {
  ArrowLeft,
  Binary,
  Copy,
  CopyCheck,
  Handshake,
  Info,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';

import { Button } from '@/components/ui/button-v2';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useToast } from '@/components/ui/use-toast';
import { useCreateReferralCodeMutation } from '@/graphql/mutations/__generated__/referrals.generated';
import useCopyClipboard from '@/hooks/useClipboardCopy';
import { useUser } from '@/hooks/user';
import { handleApolloError } from '@/utils/error';
import { numberWithPrecisionAndDecimals } from '@/utils/numbers';
import { ROUTES } from '@/utils/routes';

import { Setting } from './Setting';

const ReferralCode: FC<{
  code: string;
  current_uses: number;
  max_allowed_uses: number;
}> = ({ code, current_uses, max_allowed_uses }) => {
  const t = useTranslations();
  const [copiedText, copy] = useCopyClipboard();

  return (
    <>
      <div>
        <Setting
          title={code || t('Public.Login.passkey')}
          description={`${current_uses} slot${current_uses === 1 ? '' : 's'} out of ${numberWithPrecisionAndDecimals(max_allowed_uses, 0)} have been used.`}
          icon={<Binary size={24} />}
        ></Setting>
      </div>

      <button
        onClick={() => copy(`https://bancolibre.com/sign-up?referral=${code}`)}
        className="px-2 transition-opacity hover:opacity-75 disabled:cursor-not-allowed"
      >
        {copiedText ? (
          <CopyCheck size={24} stroke="#22c55e" />
        ) : (
          <Copy size={24} />
        )}
      </button>
    </>
  );
};

const ReferralCodeList = () => {
  const t = useTranslations();

  const { amboss_referrals } = useUser();

  if (!amboss_referrals.length) {
    return null;
  }

  return (
    <div>
      <h3 className="mb-3 mt-7 w-full border-b border-slate-200 pb-2 font-semibold text-slate-600 dark:border-neutral-800 dark:text-neutral-400">
        {t('App.Settings.saved-referrals')}
      </h3>

      <div className="w-full space-y-6">
        {amboss_referrals.map(p => (
          <div
            key={p.id}
            className="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center md:justify-between"
          >
            <ReferralCode
              code={p.code}
              current_uses={p.current_uses}
              max_allowed_uses={p.max_allowed_uses}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ReferralsContent = () => {
  const t = useTranslations();

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [referralCode, setReferralCode] = useState<string>('');

  const { toast } = useToast();

  const { amboss_referrals, loading } = useUser();

  const [create, { loading: createLoading }] = useCreateReferralCodeMutation({
    onCompleted: data => {
      if (data.referrals.create.success) {
        toast({
          title: 'New referral code created.',
        });
        setOpenDrawer(false);
      } else {
        toast({
          variant: 'destructive',
          title: 'Unable to create referral code.',
        });
      }
    },
    refetchQueries: ['User'],
    onError: err => {
      const messages = handleApolloError(err);

      toast({
        variant: 'destructive',
        title: 'Error creating referral code.',
        description: messages.join(', '),
      });
    },
  });

  return (
    <>
      <div className="flex w-full items-center justify-between space-x-2">
        <Setting
          title={t('App.Settings.referral')}
          description={t(
            amboss_referrals.length >= 1
              ? 'App.Settings.referral-description2'
              : 'App.Settings.referral-description'
          )}
          icon={<Handshake size={24} />}
        />

        <Button
          variant="secondary"
          onClick={() => {
            if (createLoading) return;
            if (amboss_referrals.length === 0) {
              create({
                variables: {
                  input: { max_allowed_uses: 100000, referral_code: '' },
                },
              });
            }
            if (amboss_referrals.length >= 1) {
              setOpenDrawer(true);
            }
          }}
          disabled={amboss_referrals.length >= 5 || loading || createLoading}
          className="flex items-center justify-center"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-black" />
          ) : null}
          {t('App.Settings.referral-create')}
        </Button>
      </div>

      <ReferralCodeList />

      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerTrigger
          asChild
          className="absolute right-0 top-0 transition-opacity hover:opacity-75 lg:-right-16"
        >
          <button>
            <Info size={24} />
          </button>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader className="gap-2 pb-0 !text-left">
            <DrawerTitle className="text-2xl">
              {t('App.Settings.referral-description')}
            </DrawerTitle>
            <DrawerDescription className="font-medium">
              {t('App.Settings.referral-create-rules')}
            </DrawerDescription>
          </DrawerHeader>

          <input
            autoFocus
            id="description"
            type="text"
            value={referralCode}
            onChange={e => {
              setReferralCode(e.target.value);
            }}
            className="mt-16 w-full border-b border-primary bg-transparent pb-px text-center text-5xl font-medium focus:outline-none"
          />

          <DrawerFooter className="pt-6">
            <Button
              onClick={() => {
                create({
                  variables: {
                    input: {
                      max_allowed_uses: 100000,
                      referral_code: referralCode,
                    },
                  },
                });
              }}
              disabled={createLoading}
              className="mb-4 w-full"
            >
              {t('App.Settings.referral-create')}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const Referrals = () => {
  const t = useTranslations();

  return (
    <div className="mx-auto w-full max-w-lg py-6 lg:py-10">
      <div className="mb-6 flex w-full items-center justify-between space-x-2">
        <Link
          href={ROUTES.settings.home}
          className="flex h-10 w-10 items-center justify-center transition-opacity hover:opacity-75"
        >
          <ArrowLeft size={24} />
        </Link>

        <h1 className="text-2xl font-semibold">{t('App.Settings.referral')}</h1>

        <div />
      </div>

      <ReferralsContent />
    </div>
  );
};
