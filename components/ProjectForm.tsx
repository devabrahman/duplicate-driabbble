'use client';

import React, { ChangeEvent } from 'react';
import Image from 'next/image';
import { SessionInterface } from '@/common.type';
import FromField from './FromField';

type Props = {
  type: string;
  session: SessionInterface;
};

const form = {
  image: '',
  title: '',
  description: ''
};

const ProjectForm = ({ type, session }: Props) => {
  const handelFormSubmit = (e: React.FormEvent) => {};
  const handelChangeImage = (e: ChangeEvent<HTMLInputElement>) => {};

  const handelStateChange = (fieldName: string, value: string) => {};

  return (
    <form className="flexStart form" onSubmit={handelFormSubmit}>
      <div className="flexStart form_form.image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && 'Choose a poster for your project'}
        </label>
        <input
          alt="image input"
          type="image"
          id="image"
          accept="image/*"
          required={type === 'create'}
          className="form_image-input"
          onChange={handelChangeImage}
        />
        {form.image && (
          <Image
            src={form.image}
            alt="Project Poster"
            className="sm:p-10 object-contain z-20"
          />
        )}
      </div>
      <FromField
        title="Title"
        state={form.title}
        placeholder="flexibble"
        setState={value => handelStateChange('title', value)}
      />
      <FromField
        title="Description"
        isTextArea
        state={form.description}
        placeholder="Showcase and descover remakable developer project"
        setState={value => handelStateChange('description', value)}
      />
      <FromField
        title="Title"
        state={form.title}
        placeholder="flexibble"
        setState={value => handelStateChange('title', value)}
      />
      <FromField
        title="Title"
        state={form.title}
        placeholder="flexibble"
        setState={value => handelStateChange('title', value)}
      />
      <FromField
        title="Title"
        state={form.title}
        placeholder="flexibble"
        setState={value => handelStateChange('title', value)}
      />
    </form>
  );
};

export default ProjectForm;
