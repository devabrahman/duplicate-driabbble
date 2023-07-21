/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-catch */
import { GraphQLClient } from 'graphql-request';
import {
  allProjectsQuery,
  createProjectMutation,
  createUserMutation,
  deleteProjectMutation,
  getProjectByIdQuery,
  getProjectsOfUserQuery,
  getUserQuery,
  projectsQuery,
  updateProjectMutation
} from '@/graphql';
import { ProjectForm } from '@/common.type';

const isProduction = process.env.NODE_ENV === 'production';

const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ''
  : 'http://127.0.0.1:4000/graphql';

const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ''
  : 'letmein';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : 'http://localhost:3000/';

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client?.request(query, variables);
  } catch (error) {
    console.log(
      '🔐 -> file: action.ts:33 -> makeGraphQLRequest -> error:'
      // error
    );
    throw error;
  }
};

export const getUser = (email: string): any => {
  client.setHeader('x-api-key', apiKey);

  return makeGraphQLRequest(getUserQuery, { email });
};
export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader('x-api-key', apiKey);

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

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return await response.json();
  } catch (error) {
    console.log('🔐 -> file: action.ts:61 -> fetchToken -> error:', error);
    throw new Error("token is not valid or can't purged");
  }
};

// eslint-disable-next-line consistent-return
export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: 'POST',
      body: JSON.stringify({ path: imagePath })
    });
    return await response.json();
  } catch (error) {
    console.log('🔐 -> file: action.ts:80 -> uploadImage -> error:', error);
  }
};

export const createNewProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
  // eslint-disable-next-line consistent-return
) => {
  client.setHeader('x-api-key', apiKey);

  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    client.setHeader('Authorization', `Bearer ${token}`);

    const variables = {
      input: {
        ...form,
        image: imageUrl.url,
        createdBy: {
          link: creatorId
        }
      }
    };

    return makeGraphQLRequest(createProjectMutation, variables);
  }
};

export const fetchAllProjects = async (
  category?: string,
  endcursor?: string
) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(allProjectsQuery);
};

export const getProjectDetails = (id: string) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(getProjectByIdQuery, { id });
};

export const getUserProjects = (id: string, last?: number) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(getProjectsOfUserQuery, { id, last });
};

export const deleteProject = (id: string, token: string) => {
  client.setHeader('Authorization', `Bearer ${token}`);
  client.setHeader('x-api-key', apiKey);

  return makeGraphQLRequest(deleteProjectMutation, { id });
};

export const updateProject = async (
  form: ProjectForm,
  projectId: string,
  token: string
) => {
  client.setHeader('x-api-key', apiKey);

  function isBase64DataURL(value: string) {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }

  let updatedForm = { ...form };

  const isUploadingNewImage = isBase64DataURL(form.image);

  if (isUploadingNewImage) {
    const imageUrl = await uploadImage(form.image);

    if (imageUrl.url) {
      updatedForm = { ...updatedForm, image: imageUrl.url };
    }
  }

  client.setHeader('Authorization', `Bearer ${token}`);

  const variables = {
    id: projectId,
    input: updatedForm
  };

  return makeGraphQLRequest(updateProjectMutation, variables);
};
