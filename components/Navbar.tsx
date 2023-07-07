import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AuthProviders from "./AuthProviders";

const Navbar = () => {
  const session = {};

  return (
    <nav className=" flex-between navbar">
      <div className="flex-1 flex-start gap-10">
        <Link href={"/"}>
          <Image src={"/logo.svg"} width={115} height={45} alt="logo" />
        </Link>
        <ul className="xl:flex hidden text-small gap-7 mt-4">
          {NavLinks.map((link) => (
            <Link key={link.key} href={link.href}>
              {link.text}
            </Link>
          ))}
        </ul>

        <div className="flexCenter gap-4">
          {session ? (
            <>
              UserPhoto
              <Link href={"/create-project"}>Create Project</Link>
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
