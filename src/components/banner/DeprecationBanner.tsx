'use client';

import { ExternalLink, TriangleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

const BLOCKSTREAM_APP_URL = 'https://blockstream.com/app/';

export const DeprecationBanner = () => {
  const t = useTranslations('Deprecation');

  return (
    <div className="w-full bg-red-600 px-4 py-3 text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4">
        <div className="flex items-center gap-2">
          <TriangleAlert className="size-5 shrink-0" />

          <p className="text-sm font-semibold sm:text-base">
            {t('banner')}{' '}
            <a
              href={BLOCKSTREAM_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-red-100"
            >
              {t('banner-link')}
            </a>
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <button className="shrink-0 rounded-md border border-white/60 bg-white/10 px-3 py-1 text-sm font-semibold transition-colors hover:bg-white/20">
              {t('how-to')}
            </button>
          </DialogTrigger>

          <DialogContent className="max-h-[90dvh] overflow-y-auto text-left">
            <DialogHeader>
              <DialogTitle>{t('dialog-title')}</DialogTitle>
              <DialogDescription>{t('dialog-description')}</DialogDescription>
            </DialogHeader>

            <ol className="list-decimal space-y-3 pl-5 text-sm">
              <li>
                {t.rich('step-one', {
                  link: chunks => (
                    <a
                      href="/wallet/settings"
                      className="font-semibold underline underline-offset-2"
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </li>
              <li>{t('step-two')}</li>
              <li>
                {t.rich('step-three', {
                  link: chunks => (
                    <a
                      href={BLOCKSTREAM_APP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold underline underline-offset-2"
                    >
                      {chunks}
                      <ExternalLink className="size-3.5" />
                    </a>
                  ),
                })}
              </li>
              <li>{t('step-four')}</li>
              <li>{t('step-five')}</li>
            </ol>

            <p className="rounded-md bg-red-600/10 p-3 text-sm font-medium text-red-600 dark:text-red-400">
              {t('warning')}
            </p>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
