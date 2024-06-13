export type CryptoWorkerMessage =
  | {
      type: 'newWallet';
      payload: {
        masterKey: string;
      };
    }
  | {
      type: 'restoreWallet';
      payload: {
        mnemonic: string;
        masterKey: string;
      };
    }
  | {
      type: 'signPset';
      payload: {
        wallet_account_id: string;
        mnemonic: string;
        descriptor: string;
        masterKey: string;
        pset: string;
      };
    }
  | {
      type: 'decryptMnemonic';
      payload: {
        protectedMnemonic: string;
        masterKey: string;
      };
    }
  | {
      type: 'encryptMessage';
      payload: {
        protectedPrivateKey: string;
        masterKey: string;
        receiver_pubkey: string;
        receiver_money_address: string;
        msg: string;
      };
    }
  | {
      type: 'decryptMessages';
      payload: {
        protectedPrivateKey: string;
        masterKey: string;
        messages: {
          id: string;
          contact_is_sender: boolean;
          payload: string;
        }[];
      };
    };

export type CryptoWorkerResponse =
  | {
      type: 'newWallet';
      payload: {
        protectedMnemonic: string;
        liquidDescriptor: string;
        secp256k1_key_pair: {
          public_key: string;
          protected_private_key: string;
        };
      };
    }
  | {
      type: 'signPset';
      payload: {
        wallet_account_id: string;
        signedPset: string;
      };
    }
  | {
      type: 'decryptMnemonic';
      payload: {
        mnemonic: string;
      };
    }
  | {
      type: 'encryptMessage';
      payload: {
        receiver_money_address: string;
        sender_payload: string;
        receiver_payload: string;
      };
    }
  | {
      type: 'decryptMessages';
      payload: {
        id: string;
        contact_is_sender: boolean;
        message: string;
      }[];
    }
  | { type: 'loaded' }
  | { type: 'error'; msg: string };
