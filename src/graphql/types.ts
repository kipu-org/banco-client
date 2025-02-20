/* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY. */
/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type AmbossInfo = {
  __typename?: 'AmbossInfo';
  id: Scalars['String']['output'];
  referral_codes: Array<ReferralCode>;
};

export type BroadcastLiquidTransaction = {
  __typename?: 'BroadcastLiquidTransaction';
  tx_id: Scalars['String']['output'];
};

export type BroadcastLiquidTransactionInput = {
  signed_pset: Scalars['String']['input'];
  wallet_account_id: Scalars['String']['input'];
};

export type ChangePasswordInput = {
  current_master_password_hash: Scalars['String']['input'];
  new_master_password_hash: Scalars['String']['input'];
  new_password_hint?: InputMaybe<Scalars['String']['input']>;
  new_protected_symmetric_key: Scalars['String']['input'];
};

export type ContactMessage = {
  __typename?: 'ContactMessage';
  contact_is_sender: Scalars['Boolean']['output'];
  created_at: Scalars['String']['output'];
  id: Scalars['String']['output'];
  payload: Scalars['String']['output'];
};

export type ContactMutations = {
  __typename?: 'ContactMutations';
  create: CreateContact;
  send_message: SendMessage;
};

export type ContactMutationsCreateArgs = {
  input: CreateContactInput;
};

export type ContactMutationsSend_MessageArgs = {
  input: SendMessageInput;
};

export type CreateAccountInput = {
  liquid_descriptor: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  type: WalletAccountType;
};

export type CreateContact = {
  __typename?: 'CreateContact';
  id: Scalars['String']['output'];
  money_address: Scalars['String']['output'];
};

export type CreateContactInput = {
  money_address: Scalars['String']['input'];
  wallet_id: Scalars['String']['input'];
};

export type CreateLightingInvoice = {
  __typename?: 'CreateLightingInvoice';
  payment_request: Scalars['String']['output'];
};

export type CreateLightingInvoiceInput = {
  amount: Scalars['Float']['input'];
  invoice_description?: InputMaybe<Scalars['String']['input']>;
  wallet_account_id: Scalars['String']['input'];
};

export type CreateLiquidTransaction = {
  __typename?: 'CreateLiquidTransaction';
  base_64: Scalars['String']['output'];
  wallet_account: WalletAccount;
};

export type CreateOnchainAddress = {
  __typename?: 'CreateOnchainAddress';
  address: Scalars['String']['output'];
  bip21?: Maybe<Scalars['String']['output']>;
  network: OnchainAddressType;
};

export type CreateOnchainAddressInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  asset?: InputMaybe<LiquidAssetEnum>;
  wallet_account_id: Scalars['String']['input'];
};

export type CreateReferralInput = {
  max_allowed_uses?: InputMaybe<Scalars['Float']['input']>;
  referral_code?: InputMaybe<Scalars['String']['input']>;
};

export type CreateReferralResult = {
  __typename?: 'CreateReferralResult';
  success: Scalars['Boolean']['output'];
};

export type CreateTwoFactorOtp = {
  __typename?: 'CreateTwoFactorOTP';
  otp_secret: Scalars['String']['output'];
  otp_url: Scalars['String']['output'];
};

export type CreateTwoFactorPasskey = {
  __typename?: 'CreateTwoFactorPasskey';
  options: Scalars['String']['output'];
};

export type CreateWallet = {
  __typename?: 'CreateWallet';
  id: Scalars['String']['output'];
};

export type CreateWalletDetailsInput = {
  protected_mnemonic?: InputMaybe<Scalars['String']['input']>;
  type: WalletType;
};

export type CreateWalletInput = {
  accounts: Array<CreateAccountInput>;
  details: CreateWalletDetailsInput;
  name?: InputMaybe<Scalars['String']['input']>;
  secp256k1_key_pair: Secp256k1KeyPairInput;
};

export type FeeAmount = {
  __typename?: 'FeeAmount';
  id: Scalars['String']['output'];
  satoshis: Scalars['Float']['output'];
  usd: Scalars['Float']['output'];
};

export type FeeEstimation = {
  __typename?: 'FeeEstimation';
  id: Scalars['String']['output'];
  network_fee: FeeAmount;
  swap_fee_rate: Scalars['Float']['output'];
  type: PaymentOptionNetwork;
};

export type FeeInfo = {
  __typename?: 'FeeInfo';
  fee_estimations: Array<FeeEstimation>;
  id: Scalars['String']['output'];
};

export type FiatInfo = {
  __typename?: 'FiatInfo';
  fiat_to_btc?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
};

export type LiquidAccount = {
  __typename?: 'LiquidAccount';
  assets: Array<LiquidAsset>;
  id: Scalars['String']['output'];
  transactions: Array<LiquidTransaction>;
};

export type LiquidAsset = {
  __typename?: 'LiquidAsset';
  asset_id: Scalars['String']['output'];
  asset_info: LiquidAssetInfo;
  balance: Scalars['String']['output'];
  fiat_info: FiatInfo;
  id: Scalars['String']['output'];
};

export enum LiquidAssetEnum {
  Btc = 'BTC',
  Usdt = 'USDT',
}

export type LiquidAssetInfo = {
  __typename?: 'LiquidAssetInfo';
  id: Scalars['String']['output'];
  is_featured: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  precision: Scalars['Float']['output'];
  ticker: Scalars['String']['output'];
};

export type LiquidRecipientInput = {
  address: Scalars['String']['input'];
  amount: Scalars['String']['input'];
  asset_id?: InputMaybe<Scalars['String']['input']>;
};

export type LiquidTransaction = {
  __typename?: 'LiquidTransaction';
  asset_id: Scalars['String']['output'];
  asset_info: LiquidAssetInfo;
  balance: Scalars['String']['output'];
  blinded_url: Scalars['String']['output'];
  block_height?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  fee: Scalars['String']['output'];
  fiat_info: FiatInfo;
  id: Scalars['String']['output'];
  tx_id: Scalars['String']['output'];
  unblinded_url: Scalars['String']['output'];
};

export type LnAddressPaymentOption = {
  code: Scalars['String']['input'];
  network: Scalars['String']['input'];
};

export type LnUrlCurrency = {
  __typename?: 'LnUrlCurrency';
  code: PaymentOptionCode;
  decimals: Scalars['Float']['output'];
  fixed_fee: Scalars['String']['output'];
  id: Scalars['String']['output'];
  max_sendable?: Maybe<Scalars['String']['output']>;
  min_sendable?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  network: PaymentOptionNetwork;
  symbol: Scalars['String']['output'];
  variable_fee_percentage: Scalars['String']['output'];
};

export type LnUrlInfo = {
  __typename?: 'LnUrlInfo';
  id: Scalars['String']['output'];
  payment_options: Array<LnUrlCurrency>;
};

export type LnUrlInfoInput = {
  money_address: Scalars['String']['input'];
};

export type Login = {
  __typename?: 'Login';
  access_token?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  refresh_token?: Maybe<Scalars['String']['output']>;
  two_factor?: Maybe<TwoFactorLogin>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  master_password_hash: Scalars['String']['input'];
};

export type LoginMutations = {
  __typename?: 'LoginMutations';
  initial: Login;
  passkey: PasskeyLoginMutations;
  two_factor: TwoFactorLoginMutations;
};

export type LoginMutationsInitialArgs = {
  input: LoginInput;
};

export type MoneyAddress = {
  __typename?: 'MoneyAddress';
  domains: Array<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  user: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  contacts: ContactMutations;
  login: LoginMutations;
  logout: Scalars['Boolean']['output'];
  passkey: PasskeyMutations;
  password: PasswordMutations;
  pay: PayMutations;
  referrals: ReferralMutations;
  refreshToken: RefreshToken;
  signUp: NewAccount;
  two_factor: TwoFactorMutations;
  wallets: WalletMutations;
};

export type MutationPayArgs = {
  input: PayInput;
};

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type NewAccount = {
  __typename?: 'NewAccount';
  access_token: Scalars['String']['output'];
  id: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
};

export enum OnchainAddressType {
  Btc = 'BTC',
  LBtc = 'L_BTC',
}

export type PasskeyAuthenticateInput = {
  options: Scalars['String']['input'];
  protected_symmetric_key?: InputMaybe<Scalars['String']['input']>;
};

export type PasskeyLoginInit = {
  __typename?: 'PasskeyLoginInit';
  options: Scalars['String']['output'];
  session_id: Scalars['String']['output'];
};

export type PasskeyLoginInput = {
  options: Scalars['String']['input'];
  session_id: Scalars['String']['input'];
};

export type PasskeyLoginMutations = {
  __typename?: 'PasskeyLoginMutations';
  init: PasskeyLoginInit;
  login: Login;
};

export type PasskeyLoginMutationsLoginArgs = {
  input: PasskeyLoginInput;
};

export type PasskeyMutations = {
  __typename?: 'PasskeyMutations';
  add: Scalars['String']['output'];
  authenticate: Scalars['Boolean']['output'];
  init_authenticate: Scalars['String']['output'];
  verify: Scalars['Boolean']['output'];
};

export type PasskeyMutationsAuthenticateArgs = {
  input: PasskeyAuthenticateInput;
};

export type PasskeyMutationsInit_AuthenticateArgs = {
  id: Scalars['String']['input'];
};

export type PasskeyMutationsVerifyArgs = {
  options: Scalars['String']['input'];
};

export type PasskeyQueries = {
  __typename?: 'PasskeyQueries';
  find_many: Array<SimplePasskey>;
};

export type PasswordMutations = {
  __typename?: 'PasswordMutations';
  change: Scalars['Boolean']['output'];
  check: Scalars['Boolean']['output'];
};

export type PasswordMutationsChangeArgs = {
  input: ChangePasswordInput;
};

export type PasswordMutationsCheckArgs = {
  password: Scalars['String']['input'];
};

export type PayInput = {
  account_id?: InputMaybe<Scalars['String']['input']>;
  wallet_id?: InputMaybe<Scalars['String']['input']>;
};

export type PayLiquidAddressInput = {
  fee_rate?: InputMaybe<Scalars['Float']['input']>;
  recipients: Array<LiquidRecipientInput>;
  send_all_lbtc?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayLnAddressInput = {
  address: Scalars['String']['input'];
  amount: Scalars['Float']['input'];
  payment_option?: InputMaybe<LnAddressPaymentOption>;
};

export type PayLnInvoiceInput = {
  invoice: Scalars['String']['input'];
};

export type PayMutations = {
  __typename?: 'PayMutations';
  lightning_invoice: CreateLiquidTransaction;
  liquid_address: CreateLiquidTransaction;
  money_address: CreateLiquidTransaction;
  network_swap: CreateLiquidTransaction;
  swap_address: CreateLiquidTransaction;
};

export type PayMutationsLightning_InvoiceArgs = {
  input: PayLnInvoiceInput;
};

export type PayMutationsLiquid_AddressArgs = {
  input: PayLiquidAddressInput;
};

export type PayMutationsMoney_AddressArgs = {
  input: PayLnAddressInput;
};

export type PayMutationsNetwork_SwapArgs = {
  input: PayNetworkSwapInput;
};

export type PayMutationsSwap_AddressArgs = {
  input: PaySwapAddressInput;
};

export type PayNetworkSwapInput = {
  quote_id: Scalars['String']['input'];
  settle_address: Scalars['String']['input'];
};

export type PayQueries = {
  __typename?: 'PayQueries';
  fee_info: FeeInfo;
  lnurl_info: LnUrlInfo;
  network_swap_quote: SwapQuote;
};

export type PayQueriesLnurl_InfoArgs = {
  input: LnUrlInfoInput;
};

export type PayQueriesNetwork_Swap_QuoteArgs = {
  input: SwapQuoteInput;
};

export type PaySwapAddressInput = {
  currency: PaySwapCurrency;
  fee_rate?: InputMaybe<Scalars['Float']['input']>;
  network: PaySwapNetwork;
  recipient: SwapRecipientInput;
  send_all_lbtc?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum PaySwapCurrency {
  Btc = 'BTC',
}

export enum PaySwapNetwork {
  Bitcoin = 'BITCOIN',
}

export enum PaymentOptionCode {
  Btc = 'BTC',
  Lightning = 'LIGHTNING',
  Usdt = 'USDT',
}

export enum PaymentOptionNetwork {
  Bitcoin = 'BITCOIN',
  Liquid = 'LIQUID',
}

export type PriceChartInput = {
  from_date: Scalars['String']['input'];
};

export type PriceHistorical = {
  __typename?: 'PriceHistorical';
  id: Scalars['String']['output'];
  interval: Scalars['String']['output'];
  points: Array<PricePoint>;
};

export type PricePoint = {
  __typename?: 'PricePoint';
  currency: Scalars['String']['output'];
  date: Scalars['String']['output'];
  id: Scalars['String']['output'];
  value?: Maybe<Scalars['Float']['output']>;
};

export type PriceQueries = {
  __typename?: 'PriceQueries';
  current: PricePoint;
  historical: PriceHistorical;
  id: Scalars['String']['output'];
};

export type PriceQueriesHistoricalArgs = {
  input: PriceChartInput;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
  passkey: PasskeyQueries;
  pay: PayQueries;
  prices: PriceQueries;
  two_factor: TwoFactorQueries;
  user: User;
  wallets: WalletQueries;
};

export type ReceiveSwap = {
  __typename?: 'ReceiveSwap';
  bip21?: Maybe<Scalars['String']['output']>;
  coin: SwapCoin;
  id: Scalars['String']['output'];
  max: Scalars['String']['output'];
  min: Scalars['String']['output'];
  network: SwapNetwork;
  receive_address: Scalars['String']['output'];
};

export type ReceiveSwapInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  deposit_coin: SwapCoin;
  deposit_network: SwapNetwork;
  wallet_account_id: Scalars['String']['input'];
};

export type ReferralCode = {
  __typename?: 'ReferralCode';
  code: Scalars['String']['output'];
  current_uses: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  is_available: Scalars['Boolean']['output'];
  max_allowed_uses: Scalars['Float']['output'];
};

export type ReferralMutations = {
  __typename?: 'ReferralMutations';
  create: CreateReferralResult;
};

export type ReferralMutationsCreateArgs = {
  input: CreateReferralInput;
};

export type RefreshToken = {
  __typename?: 'RefreshToken';
  access_token: Scalars['String']['output'];
  id: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
};

export type RefreshWalletInput = {
  full_scan?: InputMaybe<Scalars['Boolean']['input']>;
  wallet_id: Scalars['String']['input'];
};

export type Secp256k1KeyPair = {
  __typename?: 'Secp256k1KeyPair';
  encryption_pubkey: Scalars['String']['output'];
  id: Scalars['String']['output'];
  protected_encryption_private_key: Scalars['String']['output'];
};

export type Secp256k1KeyPairInput = {
  protected_private_key: Scalars['String']['input'];
  public_key: Scalars['String']['input'];
};

export type SendMessage = {
  __typename?: 'SendMessage';
  id: Scalars['String']['output'];
};

export type SendMessageInput = {
  contact_id: Scalars['String']['input'];
  receiver_money_address: Scalars['String']['input'];
  receiver_payload?: InputMaybe<Scalars['String']['input']>;
  sender_payload: Scalars['String']['input'];
};

export type SetupOtp = {
  __typename?: 'SetupOTP';
  otp_secret: Scalars['String']['output'];
  otp_url: Scalars['String']['output'];
};

export type SignUpInput = {
  email: Scalars['String']['input'];
  master_password_hash: Scalars['String']['input'];
  password_hint?: InputMaybe<Scalars['String']['input']>;
  protected_symmetric_key: Scalars['String']['input'];
  referral_code?: InputMaybe<Scalars['String']['input']>;
  secp256k1_key_pair: Secp256k1KeyPairInput;
  wallet?: InputMaybe<CreateWalletInput>;
};

export type SimplePasskey = {
  __typename?: 'SimplePasskey';
  created_at: Scalars['String']['output'];
  encryption_available: Scalars['Boolean']['output'];
  encryption_enabled: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type SimpleSwap = {
  __typename?: 'SimpleSwap';
  created_at: Scalars['String']['output'];
  deposit_amount?: Maybe<Scalars['String']['output']>;
  deposit_coin: Scalars['String']['output'];
  id: Scalars['String']['output'];
  provider: SwapProvider;
  settle_amount?: Maybe<Scalars['String']['output']>;
  settle_coin: Scalars['String']['output'];
};

export type SimpleTwoFactor = {
  __typename?: 'SimpleTwoFactor';
  created_at: Scalars['String']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  method: TwoFactorMethod;
  passkey_name?: Maybe<Scalars['String']['output']>;
};

export type SimpleWallet = {
  __typename?: 'SimpleWallet';
  accounts: Array<SimpleWalletAccount>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type SimpleWalletAccount = {
  __typename?: 'SimpleWalletAccount';
  account_type: WalletAccountType;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type SimpleWalletContact = {
  __typename?: 'SimpleWalletContact';
  id: Scalars['String']['output'];
  money_address: Scalars['String']['output'];
};

export enum SwapCoin {
  Btc = 'BTC',
  Usdt = 'USDT',
}

export enum SwapNetwork {
  Bitcoin = 'bitcoin',
  Ethereum = 'ethereum',
  Liquid = 'liquid',
  Tron = 'tron',
}

export enum SwapProvider {
  Boltz = 'BOLTZ',
  Sideshift = 'SIDESHIFT',
}

export type SwapQuote = {
  __typename?: 'SwapQuote';
  created_at: Scalars['String']['output'];
  deposit_amount: Scalars['String']['output'];
  deposit_coin: Scalars['String']['output'];
  deposit_network: Scalars['String']['output'];
  expires_at: Scalars['String']['output'];
  id: Scalars['String']['output'];
  rate: Scalars['String']['output'];
  settle_amount: Scalars['String']['output'];
  settle_coin: Scalars['String']['output'];
  settle_network: Scalars['String']['output'];
};

export type SwapQuoteInput = {
  settle_amount: Scalars['String']['input'];
  settle_coin: SwapCoin;
  settle_network: SwapNetwork;
};

export type SwapRecipientInput = {
  address: Scalars['String']['input'];
  amount: Scalars['String']['input'];
};

export type TwoFactorLogin = {
  __typename?: 'TwoFactorLogin';
  methods: Array<SimpleTwoFactor>;
  session_id: Scalars['String']['output'];
};

export type TwoFactorLoginMutations = {
  __typename?: 'TwoFactorLoginMutations';
  otp: Login;
  passkey: TwoFactorPasskeyLoginMutations;
};

export type TwoFactorLoginMutationsOtpArgs = {
  input: TwoFactorOtpLogin;
};

export enum TwoFactorMethod {
  Otp = 'OTP',
  Passkey = 'PASSKEY',
}

export type TwoFactorMutations = {
  __typename?: 'TwoFactorMutations';
  otp: TwoFactorOtpMutations;
  passkey: TwoFactorPasskeyMutations;
};

export type TwoFactorOtpLogin = {
  code: Scalars['String']['input'];
  session_id: Scalars['String']['input'];
};

export type TwoFactorOtpMutations = {
  __typename?: 'TwoFactorOTPMutations';
  add: CreateTwoFactorOtp;
  verify: Scalars['Boolean']['output'];
};

export type TwoFactorOtpMutationsVerifyArgs = {
  input: TwoFactorOtpVerifyInput;
};

export type TwoFactorOtpVerifyInput = {
  code: Scalars['String']['input'];
};

export type TwoFactorPasskeyAuthInput = {
  session_id: Scalars['String']['input'];
};

export type TwoFactorPasskeyAuthLoginInput = {
  options: Scalars['String']['input'];
  session_id: Scalars['String']['input'];
};

export type TwoFactorPasskeyLoginMutations = {
  __typename?: 'TwoFactorPasskeyLoginMutations';
  login: Login;
  options: Scalars['String']['output'];
};

export type TwoFactorPasskeyLoginMutationsLoginArgs = {
  input: TwoFactorPasskeyAuthLoginInput;
};

export type TwoFactorPasskeyLoginMutationsOptionsArgs = {
  input: TwoFactorPasskeyAuthInput;
};

export type TwoFactorPasskeyMutations = {
  __typename?: 'TwoFactorPasskeyMutations';
  add: CreateTwoFactorPasskey;
  verify: Scalars['Boolean']['output'];
};

export type TwoFactorPasskeyMutationsVerifyArgs = {
  options: Scalars['String']['input'];
};

export type TwoFactorQueries = {
  __typename?: 'TwoFactorQueries';
  find_many: Array<SimpleTwoFactor>;
  id: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  amboss?: Maybe<AmbossInfo>;
  default_wallet_id?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  protected_symmetric_key: Scalars['String']['output'];
  swap_info: UserSwapInfo;
  using_passkey_id?: Maybe<Scalars['String']['output']>;
  wallet: UserWalletInfo;
};

export type UserSwapInfo = {
  __typename?: 'UserSwapInfo';
  id: Scalars['String']['output'];
  shifts_enabled: Scalars['Boolean']['output'];
};

export type UserWalletInfo = {
  __typename?: 'UserWalletInfo';
  id: Scalars['String']['output'];
  wallet_limit: Scalars['Float']['output'];
};

export type Wallet = {
  __typename?: 'Wallet';
  accounts: Array<WalletAccount>;
  contacts: WalletContacts;
  details: WalletDetails;
  id: Scalars['String']['output'];
  money_address: Array<MoneyAddress>;
  name: Scalars['String']['output'];
  secp256k1_key_pair: Secp256k1KeyPair;
  swaps: WalletSwaps;
};

export type WalletAccount = {
  __typename?: 'WalletAccount';
  account_type: WalletAccountType;
  descriptor: Scalars['String']['output'];
  id: Scalars['String']['output'];
  liquid?: Maybe<LiquidAccount>;
  name: Scalars['String']['output'];
};

export enum WalletAccountType {
  Liquid = 'LIQUID',
}

export type WalletContact = {
  __typename?: 'WalletContact';
  encryption_pubkey?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  messages: Array<ContactMessage>;
  money_address: Scalars['String']['output'];
  payment_options?: Maybe<Array<LnUrlCurrency>>;
};

export type WalletContacts = {
  __typename?: 'WalletContacts';
  find_many: Array<SimpleWalletContact>;
  find_one: WalletContact;
  id: Scalars['String']['output'];
};

export type WalletContactsFind_OneArgs = {
  id: Scalars['String']['input'];
};

export type WalletDetails = {
  __typename?: 'WalletDetails';
  id: Scalars['String']['output'];
  protected_mnemonic?: Maybe<Scalars['String']['output']>;
  type: WalletType;
};

export type WalletMutations = {
  __typename?: 'WalletMutations';
  broadcast_liquid_transaction: BroadcastLiquidTransaction;
  change_money_address: Scalars['Boolean']['output'];
  change_name: Scalars['Boolean']['output'];
  create: CreateWallet;
  create_lightning_invoice: CreateLightingInvoice;
  create_onchain_address: CreateOnchainAddress;
  create_onchain_address_swap: ReceiveSwap;
  refresh_wallet: Scalars['Boolean']['output'];
};

export type WalletMutationsBroadcast_Liquid_TransactionArgs = {
  input: BroadcastLiquidTransactionInput;
};

export type WalletMutationsChange_Money_AddressArgs = {
  id: Scalars['String']['input'];
  money_address_user: Scalars['String']['input'];
};

export type WalletMutationsChange_NameArgs = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type WalletMutationsCreateArgs = {
  input: CreateWalletInput;
};

export type WalletMutationsCreate_Lightning_InvoiceArgs = {
  input: CreateLightingInvoiceInput;
};

export type WalletMutationsCreate_Onchain_AddressArgs = {
  input: CreateOnchainAddressInput;
};

export type WalletMutationsCreate_Onchain_Address_SwapArgs = {
  input: ReceiveSwapInput;
};

export type WalletMutationsRefresh_WalletArgs = {
  input: RefreshWalletInput;
};

export type WalletQueries = {
  __typename?: 'WalletQueries';
  find_many: Array<SimpleWallet>;
  find_one: Wallet;
  id: Scalars['String']['output'];
};

export type WalletQueriesFind_OneArgs = {
  id: Scalars['String']['input'];
};

export type WalletSwaps = {
  __typename?: 'WalletSwaps';
  find_many: Array<SimpleSwap>;
  id: Scalars['String']['output'];
};

export enum WalletType {
  ClientGenerated = 'CLIENT_GENERATED',
}
