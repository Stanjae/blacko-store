'use client'
import { Button, Stack } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const stepperLinks = ['cart', 'checkout', 'payment']
const CustomStepper = () => {
    const pathname = usePathname()
    const navigate = useRouter()

    const [rules, setRules] = useState<number | null>(null)

    const [tyrion, setTyrion] = useState(0)

    const handleChangeStepper = (link:string, index:number)=>{
        navigate.push(`/${link}`);
        setRules(index)
        setTyrion(index);
    }

    useEffect(()=>{
        if(pathname.includes('cart')){
            setTyrion(0)
            setRules(0)
        } else if(pathname.includes('checkout')){
            setTyrion(1)
            setRules(1)
        } else if(pathname.includes('payment')){
            setTyrion(2)
            setRules(2)
        } else {
            setTyrion(0)
        }
    },[pathname])
  return (
    <div>
        <Stack direction={'row'} justifyContent={'center'}>
            {stepperLinks.map((link, index) => (
                <div className=' flex gap-0 items-center' key={index}>
                    <Button disableElevation className={`${index <= tyrion ? "bg-[#E3364E]":"bg-[#E3364E]/20 text-[#E3364E]"} rounded-2xl`} onClick={()=> handleChangeStepper(link, index)} variant={'contained'} >{index + 1}. {link}</Button>
                   {link != stepperLinks[2] && <div className={` ${index < ( rules as number) ? "bg-[#E3364E]":"bg-[#E3364E]/20"} h-1 w-10`}/>}

                </div>
                
            ))}
        </Stack>
    </div>
  )
}

export default CustomStepper