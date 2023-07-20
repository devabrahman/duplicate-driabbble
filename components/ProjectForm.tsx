'use client';

import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormState, ProjectInterface, SessionInterface } from '@/common.type';
import FromField from './FromField';
import CustomMenu from './CustomMenu';
import { categoryFilters } from '@/constants';
import Button from './Button';
import { createNewProject, fetchToken, updateProject } from '@/lib/action';

type Props = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
};

const ProjectForm = ({ type, session, project }: Props) => {
  console.log(
    '🔐 -> file: ProjectForm.tsx:20 -> ProjectForm -> project:',
    project
  );

  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    title: project?.title || '',
    description: project?.description || '',
    image: project?.image || '',
    liveSiteUrl: project?.liveSiteUrl || '',
    githubUrl: project?.githubUrl || '',
    category: project?.category || ''
  });

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handelFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { token } = await fetchToken();

    try {
      if (type === 'create') {
        await createNewProject(form, session?.user?.id, token);

        router.push('/');
      }

      if (type === 'edit') {
        await updateProject(form, project?.id as string, token);

        router.push('/');
      }
    } catch (error) {
      console.log(
        '🔐 -> file: ProjectForm.tsx:45 -> handelFormSubmit -> error:',
        error
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleStateChange = (fieldName: keyof FormState, value: string) => {
    setForm(prevForm => ({ ...prevForm, [fieldName]: value }));
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;
    if (!file.type.includes('image')) {
      // eslint-disable-next-line consistent-return
      return alert('Please upload an image files');
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange('image', result);
    };
  };

  return (
    <form className="flexStart form" onSubmit={handelFormSubmit}>
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && 'Choose a poster for your project'}
        </label>

        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === 'create'}
          className="form_image-input"
          onChange={e => handleChangeImage(e)}
        />

        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="image"
            fill
          />
        )}
      </div>

      <FromField
        title="Title"
        state={form.title}
        placeholder="flexibble"
        setState={value => handleStateChange('title', value)}
      />
      <FromField
        title="Description"
        isTextArea
        state={form.description}
        placeholder="Showcase and descover remakable developer project"
        setState={value => handleStateChange('description', value)}
      />
      <FromField
        title="Live site URL"
        type="url"
        state={form.liveSiteUrl}
        placeholder="https://yourprojecturl.com"
        setState={value => handleStateChange('liveSiteUrl', value)}
      />
      <FromField
        title="github URL"
        type="url"
        state={form.githubUrl}
        placeholder="https://github.com/yourprojecturl"
        setState={value => handleStateChange('githubUrl', value)}
      />

      {/* custom input category... */}
      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={value => handleStateChange('category', value)}
      />

      <div className="flexStart w-full">
        <Button
          title={
            submitting
              ? `${type === 'edit' ? 'Updateing...' : 'Creating...'}`
              : `${type === 'create' ? 'Create' : 'Edit'}`
          }
          type="submit"
          leftIcon={submitting ? '' : '/plus.svg'}
          submitting={submitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
