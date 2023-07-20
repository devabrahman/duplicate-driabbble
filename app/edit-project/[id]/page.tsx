import { redirect } from 'next/navigation';
import React from 'react';

import Model from '@/components/Model';
import ProjectForm from '@/components/ProjectForm';
import { getCurrentUser } from '@/lib/session';
import { getProjectDetails } from '@/lib/action';
import { ProjectInterface } from '@/common.type';

const EditProject = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();

  if (!session?.user) redirect('/');

  const result = (await getProjectDetails(id)) as {
    project?: ProjectInterface;
  };

  if (!result?.project)
    return <p className="no-result-text">Failed to fetch project info</p>;

  return (
    <Model>
      <h3 className="modal-head-text">Edit Project</h3>

      <ProjectForm type="edit" session={session} project={result?.project} />
    </Model>
  );
};

export default EditProject;
