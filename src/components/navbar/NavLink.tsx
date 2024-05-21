'use client';

import { NavbarItem } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();

  return (
    <NavbarItem isActive={pathname == href} as={Link} href={href}>
      {children}
    </NavbarItem>
  );
};

export default NavLink;
