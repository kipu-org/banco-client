import { useLocalStorage } from 'usehooks-ts';

import { useGetWalletContactQuery } from '@/graphql/queries/__generated__/contacts.generated';
import { useUserQuery } from '@/graphql/queries/__generated__/user.generated';
import { useContactStore } from '@/stores/contacts';
import { LOCALSTORAGE_KEYS } from '@/utils/constants';

export const useContactInfo = () => {
  const currentContact = useContactStore(s => s.currentContact);
  const [value] = useLocalStorage(LOCALSTORAGE_KEYS.currentWalletId, '');

  const { data, loading } = useGetWalletContactQuery({
    variables: { id: value, contact_id: currentContact?.id || '' },
    skip: !currentContact?.id,
    errorPolicy: 'ignore',
  });

  return {
    loading,
    protected_encryption_private_key:
      data?.wallets.find_one.secp256k1_key_pair
        .protected_encryption_private_key || '',
    contact: {
      money_address: data?.wallets.find_one.contacts.find_one.money_address,
      encryption_pubkey:
        data?.wallets.find_one.contacts.find_one.encryption_pubkey,
      payment_options:
        data?.wallets.find_one.contacts.find_one.payment_options || [],
    },
  };
};

export const useUser = () => {
  const { data, loading } = useUserQuery();

  return {
    loading,
    amboss_referrals: data?.user.amboss?.referral_codes || [],
  };
};
