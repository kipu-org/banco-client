import { gql } from '@apollo/client';

export const CreateReferralCode = gql`
  mutation CreateReferralCode($input: CreateReferralInput!) {
    referrals {
      create(input: $input) {
        success
      }
    }
  }
`;
