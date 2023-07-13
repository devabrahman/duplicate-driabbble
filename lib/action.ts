/* eslint-disable no-useless-catch */
import { GraphQLClient } from 'graphql-request';
import { createUserMutation, getUserQuery } from '@/graphql';

const isProduction = process.env.NODE_ENV === 'production';

const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_API_URL || ''
  : 'http://127.0.0.1:4000/graphql';

const apiKey = isProduction ? process.env.NEXT_PUBLIC_API_KEY || '' : 'letmein';

const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : 'http://localhost:3000/';

const clint = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await clint.request(query, variables);
  } catch (error) {
    throw error;
    console.log(
      '🔐 -> file: action.ts:6 -> makeGraphQLRequest -> error:',
      error
    );
  }
};

export const getUser = (email: string): any => {
  clint.setHeader('x-api-key', apiKey);

  return makeGraphQLRequest(getUserQuery, { email });
};
export const createUser = (name: string, email: string, avatarUrl: string) => {
  clint.setHeader('x-api-key', apiKey);

  const variables = {
    input: {
      name,
      email,
      avatarUrl,
      description: 'something is special'
    }
  };

  return makeGraphQLRequest(createUserMutation, variables);
};
