'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useRef, useCallback } from 'react';

const Model = ({ children }: { children: ReactNode }) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.push('/');
  }, [router]);

  const handelClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlay.current && onDismiss) {
        onDismiss();
      }
    },
    [onDismiss]
  );
  return (
    // eslint-disable-next-line
    <div ref={overlay} className="modal" onClick={handelClick}>
      <button
        type="button"
        onClick={onDismiss}
        className="absolute top-4 right-8"
      >
        <Image src="/close.svg" height={17} width={17} alt="close" />
      </button>
      <div ref={wrapper} className="modal_wrapper">
        {children}
      </div>
    </div>
  );
};

export default Model;
