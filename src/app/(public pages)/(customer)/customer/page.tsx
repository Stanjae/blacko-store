import CardList from '@/app/components/customer/CardList'
import UserProfile from '@/app/components/customer/UserProfile'
import CustomLoader from '@/app/components/CustomLoader'
import CardsListSkeleton from '@/app/components/skeletons/CardsListSkeleton'
import { auth } from '@/auth'
import { Person } from '@mui/icons-material'
import { Button, Card, Grid2, IconButton, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'


const page = async() => {
  const session = await auth()
  return (
    <section className=' space-y-6'>
      <Stack gap={2} direction={'row'}>
        <IconButton size='medium'  disabled disableRipple className=' bg-gray-100 rounded-lg text-primary'><Person/></IconButton>
        <Typography variant='h2' className=' font-semibold capitalize text-[25px] leading-[37.5px]'>My profile</Typography>
        <Button size='large' LinkComponent={Link} href='/customer/edit-profile' disableElevation className=' px-6 rounded-lg bg-primary/20 ml-auto'>Edit Profile</Button>
      </Stack>

      <Grid2 alignItems={'center'} spacing={3} container>
        <Grid2 size="grow">
            <Card elevation={0} className=' rounded-xl py-5 px-6'>
              <Stack direction={'row'} alignItems={'center'} gap={2}>
                <Image className=' rounded-full' src={session?.user?.image as string} width={65} height={65} alt="user-avatar"/>
                <div>
                  <Typography variant='h5' className=' font-semibold'>{session?.user?.name}</Typography>
                  <Typography color='textDisabled' component={'div'} className=' text-sm'>UID: <Typography component={'span'} color='primary'>{session?.user?.id?.slice(0,13)}</Typography></Typography>
                </div>
                <Typography color={'textDisabled'} className=' text-sm tracking-widest uppercase leading-5 ml-auto'>Silver User</Typography>
              </Stack>
            </Card>
        </Grid2>

        <Grid2 size={{md:6, xs:12}}>
          <Suspense fallback={<CardsListSkeleton amount={4}/>}>
            <CardList id={session?.user?.id}/>
          </Suspense>  
        </Grid2>
        
      </Grid2>

      <Suspense fallback={<CustomLoader/>}> 
        <UserProfile id={session?.user?.id}/>
      </Suspense>
     
      
    </section>
  )
}

export default page