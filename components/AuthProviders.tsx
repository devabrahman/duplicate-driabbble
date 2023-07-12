'use client';

import { getProviders, signIn } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

type Provider = {
  id: string;
  name: string;
  type: string;
  signInUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

const AuthProviders = (): JSX.Element => {
  const [providers, setProviders] = useState<Providers | null>(null);
  console.log(
    '🔐 -> file: AuthProviders.tsx:19 -> AuthProviders -> providers:',
    providers
  );

  useEffect(() => {
    const fetchProviders = async () => {
      const res: any = await getProviders();

      console.log(
        '🔐 -> file: AuthProviders.tsx:24 -> fetchProviders -> res:',
        res
      );
      setProviders(res);
    };
    fetchProviders();
  }, []);

  if (providers) {
    return (
      <div className="">
        {Object.values(providers).map((provider: Provider) => (
          <button
            key={provider.id}
            type="button"
            onClick={() => signIn(provider?.id)}
          >
            {provider.id}
          </button>
        ))}
      </div>
    );
  }

  return <div className="" />;
};

export default AuthProviders;
