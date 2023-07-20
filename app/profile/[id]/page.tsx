import React from 'react';

import { UserProfile } from '@/common.type';
import ProfilePage from '@/components/ProfilePage';
import { getUserProjects } from '@/lib/action';

type Props = {
  params: {
    id: string;
  };
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
const UserProfile = async ({ params }: Props) => {
  const result = (await getUserProjects(params.id, 100)) as {
    user: UserProfile;
  };

  if (!result?.user)
    return <p className="no-result-text">Failed to fetch user info</p>;

  return <ProfilePage user={result?.user} />;
};

export default UserProfile;
