/* eslint-disable react/require-default-props */
import Image from 'next/image';
import React, { MouseEventHandler } from 'react';

type Props = {
  title: string;
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleClick?: MouseEventHandler;
  submitting?: boolean | false;
  type?: 'button' | 'submit';
  bgColor?: string;
  textColor?: string;
};

const toCapitalCase = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Button = ({
  title,
  leftIcon,
  rightIcon,
  handleClick,
  submitting,
  type,
  bgColor,
  textColor
}: Props) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={type || 'button'}
    disabled={submitting || false}
    className={`flexCenter gap-3 px-4 py-3 
        ${textColor || 'text-white'} 
        ${
          submitting ? 'bg-black/50' : bgColor || 'bg-primary-purple'
        } rounded-xl text-sm font-medium max-md:w-full`}
    onClick={handleClick}
  >
    {leftIcon && (
      <Image src={leftIcon} width={14} height={14} alt="left icon" />
    )}
    {toCapitalCase(title)}
    {rightIcon && (
      <Image src={rightIcon} width={14} height={14} alt="right icon" />
    )}
  </button>
);

export default Button;
