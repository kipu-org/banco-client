/* THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY. */
/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../types';

const defaultOptions = {} as const;
export type TwoFactorOtpAddMutationVariables = Types.Exact<{
  [key: string]: never;
}>;

export type TwoFactorOtpAddMutation = {
  __typename?: 'Mutation';
  two_factor: {
    __typename?: 'TwoFactorMutations';
    otp: {
      __typename?: 'TwoFactorOTPMutations';
      add: {
        __typename?: 'CreateTwoFactorOTP';
        otp_secret: string;
        otp_url: string;
      };
    };
  };
};

export type TwoFactorOtpVerifyMutationVariables = Types.Exact<{
  input: Types.TwoFactorOtpVerifyInput;
}>;

export type TwoFactorOtpVerifyMutation = {
  __typename?: 'Mutation';
  two_factor: {
    __typename?: 'TwoFactorMutations';
    otp: { __typename?: 'TwoFactorOTPMutations'; verify: boolean };
  };
};

export type TwoFactorOtpLoginMutationVariables = Types.Exact<{
  input: Types.TwoFactorOtpLogin;
}>;

export type TwoFactorOtpLoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'LoginMutations';
    two_factor: {
      __typename?: 'TwoFactorLoginMutations';
      otp: {
        __typename?: 'Login';
        access_token?: string | null;
        refresh_token?: string | null;
      };
    };
  };
};

export const TwoFactorOtpAddDocument = gql`
  mutation TwoFactorOtpAdd {
    two_factor {
      otp {
        add {
          otp_secret
          otp_url
        }
      }
    }
  }
`;
export type TwoFactorOtpAddMutationFn = Apollo.MutationFunction<
  TwoFactorOtpAddMutation,
  TwoFactorOtpAddMutationVariables
>;

/**
 * __useTwoFactorOtpAddMutation__
 *
 * To run a mutation, you first call `useTwoFactorOtpAddMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTwoFactorOtpAddMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [twoFactorOtpAddMutation, { data, loading, error }] = useTwoFactorOtpAddMutation({
 *   variables: {
 *   },
 * });
 */
export function useTwoFactorOtpAddMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TwoFactorOtpAddMutation,
    TwoFactorOtpAddMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    TwoFactorOtpAddMutation,
    TwoFactorOtpAddMutationVariables
  >(TwoFactorOtpAddDocument, options);
}
export type TwoFactorOtpAddMutationHookResult = ReturnType<
  typeof useTwoFactorOtpAddMutation
>;
export type TwoFactorOtpAddMutationResult =
  Apollo.MutationResult<TwoFactorOtpAddMutation>;
export type TwoFactorOtpAddMutationOptions = Apollo.BaseMutationOptions<
  TwoFactorOtpAddMutation,
  TwoFactorOtpAddMutationVariables
>;
export const TwoFactorOtpVerifyDocument = gql`
  mutation TwoFactorOtpVerify($input: TwoFactorOTPVerifyInput!) {
    two_factor {
      otp {
        verify(input: $input)
      }
    }
  }
`;
export type TwoFactorOtpVerifyMutationFn = Apollo.MutationFunction<
  TwoFactorOtpVerifyMutation,
  TwoFactorOtpVerifyMutationVariables
>;

/**
 * __useTwoFactorOtpVerifyMutation__
 *
 * To run a mutation, you first call `useTwoFactorOtpVerifyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTwoFactorOtpVerifyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [twoFactorOtpVerifyMutation, { data, loading, error }] = useTwoFactorOtpVerifyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTwoFactorOtpVerifyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TwoFactorOtpVerifyMutation,
    TwoFactorOtpVerifyMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    TwoFactorOtpVerifyMutation,
    TwoFactorOtpVerifyMutationVariables
  >(TwoFactorOtpVerifyDocument, options);
}
export type TwoFactorOtpVerifyMutationHookResult = ReturnType<
  typeof useTwoFactorOtpVerifyMutation
>;
export type TwoFactorOtpVerifyMutationResult =
  Apollo.MutationResult<TwoFactorOtpVerifyMutation>;
export type TwoFactorOtpVerifyMutationOptions = Apollo.BaseMutationOptions<
  TwoFactorOtpVerifyMutation,
  TwoFactorOtpVerifyMutationVariables
>;
export const TwoFactorOtpLoginDocument = gql`
  mutation TwoFactorOtpLogin($input: TwoFactorOTPLogin!) {
    login {
      two_factor {
        otp(input: $input) {
          access_token
          refresh_token
        }
      }
    }
  }
`;
export type TwoFactorOtpLoginMutationFn = Apollo.MutationFunction<
  TwoFactorOtpLoginMutation,
  TwoFactorOtpLoginMutationVariables
>;

/**
 * __useTwoFactorOtpLoginMutation__
 *
 * To run a mutation, you first call `useTwoFactorOtpLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTwoFactorOtpLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [twoFactorOtpLoginMutation, { data, loading, error }] = useTwoFactorOtpLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTwoFactorOtpLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TwoFactorOtpLoginMutation,
    TwoFactorOtpLoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    TwoFactorOtpLoginMutation,
    TwoFactorOtpLoginMutationVariables
  >(TwoFactorOtpLoginDocument, options);
}
export type TwoFactorOtpLoginMutationHookResult = ReturnType<
  typeof useTwoFactorOtpLoginMutation
>;
export type TwoFactorOtpLoginMutationResult =
  Apollo.MutationResult<TwoFactorOtpLoginMutation>;
export type TwoFactorOtpLoginMutationOptions = Apollo.BaseMutationOptions<
  TwoFactorOtpLoginMutation,
  TwoFactorOtpLoginMutationVariables
>;
