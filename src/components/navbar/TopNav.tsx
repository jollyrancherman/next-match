import { Button, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import { GiMatchTip } from 'react-icons/gi';
import NavLink from './NavLink';
import { auth } from '@/auth';
import UserMenu from './UserMenu';

const TopNav = async () => {
  const session = await auth();

  return (
    <Navbar
      maxWidth='xl'
      className='bg-gradient-to-tr from-sky-400 to-sky-600'
      classNames={{
        item: [
          'text-xl',
          'text-white',
          'uppercase',
          'data-[active=true]:text-yellow-200',
        ],
      }}
    >
      <NavbarBrand as={Link} href='/'>
        <GiMatchTip size={40} className='text-gray-200' />
        <div className='font-bold text-3xl flex'>
          <span className='text-gray-900'>Next</span>
          <span className='text-gray-200'>Match</span>
        </div>
      </NavbarBrand>
      <NavbarContent justify='center'>
        <NavLink href='/members'>Matches</NavLink>
        <NavLink href='/lists'>Lists</NavLink>
        <NavLink href='/messages'>Message</NavLink>
      </NavbarContent>
      <NavbarContent justify='end'>
        {session ? (
          <UserMenu user={session.user} />
        ) : (
          <>
            <Button
              as={Link}
              href='/login'
              variant='bordered'
              className='text-white'
            >
              Login
            </Button>
            <Button
              as={Link}
              href='/register'
              variant='bordered'
              className='text-white'
            >
              Register
            </Button>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default TopNav;
