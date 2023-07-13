/* eslint-disable react/require-default-props */
import React from 'react';

type Props = {
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  setState: (value: string) => void;
};

const FromField = ({
  type,
  title,
  state,
  placeholder,
  setState,
  isTextArea
}: Props) => {
  return (
    <div className="flexStart flex-col w-full gap4">
      <label htmlFor="title" className="w-full text-gray">
        {title}
      </label>

      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={state}
          rows={5}
          required
          className="form_field-input"
          onChange={event => setState(event.target.value)}
        />
      ) : (
        <input
          type={type || 'text'}
          placeholder={placeholder}
          value={state}
          required
          className="form_field-input"
          onChange={event => setState(event.target.value)}
        />
      )}
    </div>
  );
};

export default FromField;
