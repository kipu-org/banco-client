'use client';

import { ApolloError, useApolloClient } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BroadcastLiquidTransactionDocument,
  BroadcastLiquidTransactionMutation,
  BroadcastLiquidTransactionMutationVariables,
} from '@/graphql/mutations/__generated__/broadcastLiquidTransaction.generated';
import {
  PayLiquidAddressDocument,
  PayLiquidAddressMutation,
  PayLiquidAddressMutationVariables,
} from '@/graphql/mutations/__generated__/pay.generated';
import { useGetWalletQuery } from '@/graphql/queries/__generated__/wallet.generated';
import { useUserInfo } from '@/hooks/user';
import { useWalletInfo } from '@/hooks/wallet';
import { cn } from '@/lib/utils';
import { useKeyStore } from '@/stores/keys';
import { toWithError } from '@/utils/async';
import { handleApolloError } from '@/utils/error';
import { numberWithoutPrecision } from '@/utils/numbers';
import { ROUTES } from '@/utils/routes';
import {
  CryptoWorkerMessage,
  CryptoWorkerResponse,
} from '@/workers/crypto/types';

import { VaultButton } from '../button/VaultButton';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { useToast } from '../ui/use-toast';

const formSchema = z
  .object({
    destination: z.string().min(1, { message: 'A destination is mandatory' }),
    assetId: z.string().min(1, { message: 'An asset is mandatory' }),
    amount: z.string(),
    feeRate: z.string().min(1, { message: 'A fee rate is mandatory' }),
    sendAllBtc: z.boolean(),
  })
  .refine(data => data.sendAllBtc || data.amount, {
    message: 'An amount is mandatory',
    path: ['amount'],
  });

const LBTC_ASSET_ID =
  '6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d';

export const SendForm: FC<{
  walletId: string;
  accountId: string;
  assetId: string | undefined;
}> = ({ walletId, accountId, assetId }) => {
  const workerRef = useRef<Worker>();

  const client = useApolloClient();

  const { toast } = useToast();

  const { push } = useRouter();

  const walletInfo = useWalletInfo();
  const userInfo = useUserInfo();

  const [stateLoading, setStateLoading] = useState(false);

  const masterKey = useKeyStore(s => s.masterKey);

  const {
    data,
    loading: walletLoading,
    error,
  } = useGetWalletQuery({
    variables: { id: walletId },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: '',
      assetId,
      amount: '',
      feeRate: '0.1',
      sendAllBtc: false,
    },
  });

  const watchAsset = form.watch(['assetId', 'sendAllBtc']);

  useEffect(() => {
    const [watchedAssetId, watchedSendAll] = watchAsset;
    if (watchedAssetId !== LBTC_ASSET_ID && !!watchedSendAll) {
      form.resetField('sendAllBtc');
    }
  }, [watchAsset, form]);

  const selectedAsset = form.getValues('assetId');
  const sendAll = form.getValues('sendAllBtc');

  const loading = stateLoading || walletLoading;

  const asset = useMemo(() => {
    if (walletLoading || error) return;
    if (!data?.wallets.find_one.accounts.length) return;

    const currentAccount = data.wallets.find_one.accounts.find(
      a => a.id === accountId
    );

    if (!currentAccount?.liquid) return;

    const firstAsset = currentAccount.liquid.assets[0];
    const foundAsset = selectedAsset
      ? currentAccount.liquid.assets.find(a => a.asset_id === selectedAsset)
      : undefined;

    const currentAsset = foundAsset || firstAsset;

    if (!currentAccount) return;

    return currentAsset;
  }, [data, walletLoading, error, accountId, selectedAsset]);

  const accountAssets = useMemo(() => {
    if (walletLoading || error) return [];
    if (!data?.wallets.find_one.accounts.length) return [];

    const currentAccount = data.wallets.find_one.accounts.find(
      a => a.id === accountId
    );

    if (!currentAccount?.liquid?.assets) return [];

    return currentAccount.liquid.assets;
  }, [data, walletLoading, error, accountId]);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../../workers/crypto/crypto.ts', import.meta.url)
    );

    workerRef.current.onmessage = async event => {
      const message: CryptoWorkerResponse = event.data;

      switch (message.type) {
        case 'signPset':
          const [, error] = await toWithError(
            client.mutate<
              BroadcastLiquidTransactionMutation,
              BroadcastLiquidTransactionMutationVariables
            >({
              mutation: BroadcastLiquidTransactionDocument,
              variables: {
                input: {
                  wallet_account_id: message.payload.wallet_account_id,
                  signed_pset: message.payload.signedPset,
                },
              },
            })
          );

          if (error) {
            const messages = handleApolloError(error as ApolloError);

            toast({
              variant: 'destructive',
              title: 'Error Sending Money',
              description: messages.join(', '),
            });

            setStateLoading(false);
            return;
          }

          toast({
            title: 'Money Sent!',
            description: `Money has been sent.`,
          });

          push(ROUTES.app.home);

          break;
      }

      setStateLoading(false);
    };

    workerRef.current.onerror = error => {
      console.error('Worker error:', error);
      setStateLoading(false);
    };

    return () => {
      if (workerRef.current) workerRef.current.terminate();
    };
  }, [client, push, toast, walletId]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (loading) return;

    setStateLoading(true);

    if (values.sendAllBtc && values.assetId !== LBTC_ASSET_ID) {
      toast({
        variant: 'destructive',
        title: 'Error Sending Money',
        description: '"Send All" is only possible for BTC',
      });

      setStateLoading(false);

      return;
    }

    const [result, error] = await toWithError(
      client.mutate<
        PayLiquidAddressMutation,
        PayLiquidAddressMutationVariables
      >({
        mutation: PayLiquidAddressDocument,
        variables: {
          addressInput: {
            send_all_lbtc: values.sendAllBtc || undefined,
            fee_rate: Number(values.feeRate) * 1000,
            recipients: [
              {
                address: values.destination,
                amount: numberWithoutPrecision(
                  values.amount,
                  asset?.asset_info.precision || 0
                ),
                asset_id: values.assetId,
              },
            ],
          },
          payInput: {
            account_id: accountId,
          },
        },
      })
    );

    if (error) {
      const messages = handleApolloError(error as ApolloError);

      toast({
        variant: 'destructive',
        title: 'Error Sending Money',
        description: messages.join(', '),
      });

      setStateLoading(false);
      return;
    }

    if (
      !result.data?.pay.liquid_address ||
      !walletInfo.protected_mnemonic ||
      !masterKey ||
      !userInfo.symmetric_key_iv
    ) {
      setStateLoading(false);
      return;
    }

    if (!workerRef.current) {
      setStateLoading(false);
      return;
    }

    const message: CryptoWorkerMessage = {
      type: 'signPset',
      payload: {
        wallet_account_id: result.data.pay.liquid_address.wallet_account.id,
        mnemonic: walletInfo.protected_mnemonic,
        descriptor: result.data.pay.liquid_address.wallet_account.descriptor,
        pset: result.data.pay.liquid_address.base_64,
        masterKey,
        iv: userInfo.symmetric_key_iv,
      },
    };

    workerRef.current.postMessage(message);
  };

  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle>Send To Address</CardTitle>
      </CardHeader>{' '}
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="bc1qxvay4an52gcghxq..."
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className={cn(sendAll ? '' : 'grid grid-cols-2 gap-4')}>
              {sendAll ? null : (
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1000"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="assetId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose which asset you want to send." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {accountAssets.map(a => (
                          <SelectItem
                            key={a.asset_id}
                            value={a.asset_id}
                            onSelect={e => console.log(e)}
                          >
                            {a.asset_info.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {selectedAsset === LBTC_ASSET_ID ? (
              <FormField
                control={form.control}
                name="sendAllBtc"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="flex flex-col gap-2">
                      <FormLabel>Send All BTC</FormLabel>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            ) : null}

            <FormField
              control={form.control}
              name="feeRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fee Rate</FormLabel>
                  <FormControl>
                    <Input type="number" autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-center">
              {masterKey ? (
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Send
                </Button>
              ) : (
                <VaultButton lockedTitle="Unlock to Send" />
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
