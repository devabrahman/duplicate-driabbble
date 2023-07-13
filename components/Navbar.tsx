import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { NavLinks } from '@/constants';
import AuthProviders from './AuthProviders';
import { getCurrentUser } from '@/lib/session';
import ProfileMenu from './ProfileMenu';

const Navbar = async () => {
  const session = await getCurrentUser();
  return (
    <nav className=" flex-between navbar">
      <div className="flex-1 flex-start gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={115} height={45} alt="logo" />
        </Link>
        <ul className="xl:flex hidden text-small gap-7 mt-4">
          {NavLinks.map(link => (
            <Link key={link.key} href={link.href}>
              {link.text}
            </Link>
          ))}
        </ul>
        <div className="flexCenter gap-4">
          {session ? (
            <>
              <ProfileMenu session={session} />
              {/* {session?.user?.image && (
                <Link href={`/profile/${session?.user?.id}`}>
                  <Image
                    src={session?.user?.image}
                    alt="User Photo"
                    width={40}
                    height={40}
                    style={{ borderRadius: '100%' }}
                  />
                </Link>
              )}
              <Link href="/create-project">Create Project</Link>
              <button type="button" className="text-sm" onClick={signOut()}>
                Sign Out
              </button> */}

              <Link href="/create-project">
                {/* <Button title="Share work" /> */}
                share work
              </Link>
            </>
          ) : (
            <AuthProviders />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
