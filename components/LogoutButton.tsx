'use client'
import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

const LogoutButton = () => {
    const handleClick = async ()=> {
        await signOut({callbackUrl: '/login'});
    };
  return (
    <div><Button onClick={handleClick}>Logout</Button></div>
  )
}

export default LogoutButton