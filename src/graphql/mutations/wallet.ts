import { gql } from '@apollo/client';

export const CreateWallet = gql`
  mutation CreateWallet($input: CreateWalletInput!) {
    wallets {
      create(input: $input) {
        id
      }
    }
  }
`;

export const ChangeWalletName = gql`
  mutation ChangeWalletName($id: String!, $name: String!) {
    wallets {
      change_name(id: $id, name: $name)
    }
  }
`;

export const ChangeWalletMoneyAddress = gql`
  mutation ChangeWalletMoneyAddress(
    $id: String!
    $money_address_user: String!
  ) {
    wallets {
      change_money_address(id: $id, money_address_user: $money_address_user)
    }
  }
`;
