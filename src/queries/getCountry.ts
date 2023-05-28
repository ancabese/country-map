import gql from "graphql-tag";

export const GET_COUNTRY = gql`
  query GetCountry($countryCode: ID!) {
    country(code: $countryCode) {
      name
      capital
      native
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;
