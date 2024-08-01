/* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY. */
/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../types';

const defaultOptions = {} as const;
export type GetAccountTwoFactorMethodsQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetAccountTwoFactorMethodsQuery = {
  __typename?: 'Query';
  two_factor: {
    __typename?: 'TwoFactorQueries';
    id: string;
    find_many: Array<{
      __typename?: 'SimpleTwoFactor';
      id: string;
      created_at: string;
      method: Types.TwoFactorMethod;
      enabled: boolean;
    }>;
  };
};

export const GetAccountTwoFactorMethodsDocument = gql`
  query getAccountTwoFactorMethods {
    two_factor {
      id
      find_many {
        id
        created_at
        method
        enabled
      }
    }
  }
`;

/**
 * __useGetAccountTwoFactorMethodsQuery__
 *
 * To run a query within a React component, call `useGetAccountTwoFactorMethodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountTwoFactorMethodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountTwoFactorMethodsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAccountTwoFactorMethodsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAccountTwoFactorMethodsQuery,
    GetAccountTwoFactorMethodsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAccountTwoFactorMethodsQuery,
    GetAccountTwoFactorMethodsQueryVariables
  >(GetAccountTwoFactorMethodsDocument, options);
}
export function useGetAccountTwoFactorMethodsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAccountTwoFactorMethodsQuery,
    GetAccountTwoFactorMethodsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAccountTwoFactorMethodsQuery,
    GetAccountTwoFactorMethodsQueryVariables
  >(GetAccountTwoFactorMethodsDocument, options);
}
export function useGetAccountTwoFactorMethodsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetAccountTwoFactorMethodsQuery,
    GetAccountTwoFactorMethodsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetAccountTwoFactorMethodsQuery,
    GetAccountTwoFactorMethodsQueryVariables
  >(GetAccountTwoFactorMethodsDocument, options);
}
export type GetAccountTwoFactorMethodsQueryHookResult = ReturnType<
  typeof useGetAccountTwoFactorMethodsQuery
>;
export type GetAccountTwoFactorMethodsLazyQueryHookResult = ReturnType<
  typeof useGetAccountTwoFactorMethodsLazyQuery
>;
export type GetAccountTwoFactorMethodsSuspenseQueryHookResult = ReturnType<
  typeof useGetAccountTwoFactorMethodsSuspenseQuery
>;
export type GetAccountTwoFactorMethodsQueryResult = Apollo.QueryResult<
  GetAccountTwoFactorMethodsQuery,
  GetAccountTwoFactorMethodsQueryVariables
>;
