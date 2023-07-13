import React from 'react';
import { redirect } from 'next/navigation';
import Model from '@/components/Model';
import ProjectForm from '@/components/ProjectForm';
import { getCurrentUser } from '@/lib/session';

const CreateProject = async () => {
  const session = await getCurrentUser();

  if (!session?.user) redirect('/');

  return (
    <Model>
      <h3 className="modal-head-text">Create a New Project</h3>
      <ProjectForm type="create" session={session} />
    </Model>
  );
};

export default CreateProject;
