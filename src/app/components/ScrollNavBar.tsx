'use client'
import React, { useEffect, useState } from 'react'
import PrimarySearchAppBar from './AppBar';
import type { Session } from 'next-auth';

const ScrollNavBar = ({session}:{session:Session | null}) => {
    const [showNav, setShowNav] = useState<boolean>(false);

    const handleScroll =()=>{
        if(window.scrollY > 500 ){
             setShowNav(true)
         }else{ 
            setShowNav(false)
         }
    }

    useEffect(()=>{
        window.addEventListener('scroll', handleScroll)

        return ()=>{
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
  return ( showNav &&
    <div className=' scrollNavbar left-0 transition-all duration-500 sticky z-50 top-0'>
         <PrimarySearchAppBar session={session}/>
    </div>
  )
}

export default ScrollNavBar