import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from '../ui/button'
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'


export default async function Navbar() {
    const { getUser } = getKindeServerSession()
    const user = await getUser();
  return (
    <nav className='flex items-center justify-between py-5'>
        <div className='flex items-center gap-6'>
            <div className='mr-60'>
                <Link href='/' className='text-1xl font-normal'>&Gamma;&Delta;&Beta;</Link>
            </div>

            <div className='hidden sm:flex items-center ml-60 gap-6'>
                <Link href='/' className='hover:text-stone-400 transition-colors'>Home</Link>
                <Link href='/dashboard' className='hover:text-stone-400 transition-colors'>Dashboard</Link>
            </div>
        </div>
        <div>
            { user ? (
            <div className='flex items-center gap-2'>
                <p className='text-xs'>Akwaaba! {user.given_name}</p>
                <LogoutLink className={buttonVariants({variant:'secondary'})}>Logout</LogoutLink>
            </div>
        ): (
            <div className='flex items-center gap-4'>
                <LoginLink className={buttonVariants()}>Login</LoginLink>
                <RegisterLink className={buttonVariants({variant:'secondary'})}>Signup</RegisterLink>
            </div>
        )}
        </div>
    </nav>
  )
}
