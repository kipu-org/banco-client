/* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY. */
/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../types';

const defaultOptions = {} as const;
export type GetWalletContactsQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;

export type GetWalletContactsQuery = {
  __typename?: 'Query';
  wallets: {
    __typename?: 'WalletQueries';
    id: string;
    find_one: {
      __typename?: 'Wallet';
      id: string;
      contacts: {
        __typename?: 'WalletContacts';
        id: string;
        find_many: Array<{
          __typename?: 'SimpleWalletContact';
          id: string;
          money_address: string;
        }>;
      };
    };
  };
};

export type GetWalletContactQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  contact_id: Types.Scalars['String']['input'];
}>;

export type GetWalletContactQuery = {
  __typename?: 'Query';
  wallets: {
    __typename?: 'WalletQueries';
    id: string;
    find_one: {
      __typename?: 'Wallet';
      id: string;
      secp256k1_key_pair: {
        __typename?: 'Secp256k1KeyPair';
        id: string;
        encryption_pubkey: string;
      };
      contacts: {
        __typename?: 'WalletContacts';
        id: string;
        find_one: {
          __typename?: 'WalletContact';
          id: string;
          money_address: string;
          encryption_pubkey?: string | null;
          lnurl_info?: {
            __typename?: 'LnUrlInfo';
            id: string;
            min_sendable: string;
            max_sendable: string;
            variable_fee_percentage: string;
            fixed_fee: string;
          } | null;
        };
      };
    };
  };
};

export type GetWalletContactMessagesQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  contact_id: Types.Scalars['String']['input'];
}>;

export type GetWalletContactMessagesQuery = {
  __typename?: 'Query';
  wallets: {
    __typename?: 'WalletQueries';
    id: string;
    find_one: {
      __typename?: 'Wallet';
      id: string;
      secp256k1_key_pair: {
        __typename?: 'Secp256k1KeyPair';
        id: string;
        protected_encryption_private_key: string;
      };
      contacts: {
        __typename?: 'WalletContacts';
        id: string;
        find_one: {
          __typename?: 'WalletContact';
          id: string;
          messages: Array<{
            __typename?: 'ContactMessage';
            id: string;
            contact_is_sender: boolean;
            protected_message: string;
          }>;
        };
      };
    };
  };
};

export const GetWalletContactsDocument = gql`
  query getWalletContacts($id: String!) {
    wallets {
      id
      find_one(id: $id) {
        id
        contacts {
          id
          find_many {
            id
            money_address
          }
        }
      }
    }
  }
`;

/**
 * __useGetWalletContactsQuery__
 *
 * To run a query within a React component, call `useGetWalletContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWalletContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWalletContactsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetWalletContactsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetWalletContactsQuery,
    GetWalletContactsQueryVariables
  > &
    (
      | { variables: GetWalletContactsQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetWalletContactsQuery,
    GetWalletContactsQueryVariables
  >(GetWalletContactsDocument, options);
}
export function useGetWalletContactsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetWalletContactsQuery,
    GetWalletContactsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetWalletContactsQuery,
    GetWalletContactsQueryVariables
  >(GetWalletContactsDocument, options);
}
export function useGetWalletContactsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetWalletContactsQuery,
    GetWalletContactsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetWalletContactsQuery,
    GetWalletContactsQueryVariables
  >(GetWalletContactsDocument, options);
}
export type GetWalletContactsQueryHookResult = ReturnType<
  typeof useGetWalletContactsQuery
>;
export type GetWalletContactsLazyQueryHookResult = ReturnType<
  typeof useGetWalletContactsLazyQuery
>;
export type GetWalletContactsSuspenseQueryHookResult = ReturnType<
  typeof useGetWalletContactsSuspenseQuery
>;
export type GetWalletContactsQueryResult = Apollo.QueryResult<
  GetWalletContactsQuery,
  GetWalletContactsQueryVariables
>;
export const GetWalletContactDocument = gql`
  query getWalletContact($id: String!, $contact_id: String!) {
    wallets {
      id
      find_one(id: $id) {
        id
        secp256k1_key_pair {
          id
          encryption_pubkey
        }
        contacts {
          id
          find_one(id: $contact_id) {
            id
            money_address
            encryption_pubkey
            lnurl_info {
              id
              min_sendable
              max_sendable
              variable_fee_percentage
              fixed_fee
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetWalletContactQuery__
 *
 * To run a query within a React component, call `useGetWalletContactQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWalletContactQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWalletContactQuery({
 *   variables: {
 *      id: // value for 'id'
 *      contact_id: // value for 'contact_id'
 *   },
 * });
 */
export function useGetWalletContactQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetWalletContactQuery,
    GetWalletContactQueryVariables
  > &
    (
      | { variables: GetWalletContactQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetWalletContactQuery, GetWalletContactQueryVariables>(
    GetWalletContactDocument,
    options
  );
}
export function useGetWalletContactLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetWalletContactQuery,
    GetWalletContactQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetWalletContactQuery,
    GetWalletContactQueryVariables
  >(GetWalletContactDocument, options);
}
export function useGetWalletContactSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetWalletContactQuery,
    GetWalletContactQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetWalletContactQuery,
    GetWalletContactQueryVariables
  >(GetWalletContactDocument, options);
}
export type GetWalletContactQueryHookResult = ReturnType<
  typeof useGetWalletContactQuery
>;
export type GetWalletContactLazyQueryHookResult = ReturnType<
  typeof useGetWalletContactLazyQuery
>;
export type GetWalletContactSuspenseQueryHookResult = ReturnType<
  typeof useGetWalletContactSuspenseQuery
>;
export type GetWalletContactQueryResult = Apollo.QueryResult<
  GetWalletContactQuery,
  GetWalletContactQueryVariables
>;
export const GetWalletContactMessagesDocument = gql`
  query getWalletContactMessages($id: String!, $contact_id: String!) {
    wallets {
      id
      find_one(id: $id) {
        id
        secp256k1_key_pair {
          id
          protected_encryption_private_key
        }
        contacts {
          id
          find_one(id: $contact_id) {
            id
            messages {
              id
              contact_is_sender
              protected_message
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetWalletContactMessagesQuery__
 *
 * To run a query within a React component, call `useGetWalletContactMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWalletContactMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWalletContactMessagesQuery({
 *   variables: {
 *      id: // value for 'id'
 *      contact_id: // value for 'contact_id'
 *   },
 * });
 */
export function useGetWalletContactMessagesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetWalletContactMessagesQuery,
    GetWalletContactMessagesQueryVariables
  > &
    (
      | { variables: GetWalletContactMessagesQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetWalletContactMessagesQuery,
    GetWalletContactMessagesQueryVariables
  >(GetWalletContactMessagesDocument, options);
}
export function useGetWalletContactMessagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetWalletContactMessagesQuery,
    GetWalletContactMessagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetWalletContactMessagesQuery,
    GetWalletContactMessagesQueryVariables
  >(GetWalletContactMessagesDocument, options);
}
export function useGetWalletContactMessagesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetWalletContactMessagesQuery,
    GetWalletContactMessagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetWalletContactMessagesQuery,
    GetWalletContactMessagesQueryVariables
  >(GetWalletContactMessagesDocument, options);
}
export type GetWalletContactMessagesQueryHookResult = ReturnType<
  typeof useGetWalletContactMessagesQuery
>;
export type GetWalletContactMessagesLazyQueryHookResult = ReturnType<
  typeof useGetWalletContactMessagesLazyQuery
>;
export type GetWalletContactMessagesSuspenseQueryHookResult = ReturnType<
  typeof useGetWalletContactMessagesSuspenseQuery
>;
export type GetWalletContactMessagesQueryResult = Apollo.QueryResult<
  GetWalletContactMessagesQuery,
  GetWalletContactMessagesQueryVariables
>;
