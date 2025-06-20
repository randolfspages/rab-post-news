import Main from '@/components/general/Main'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function loadingDashboard() {
  return (
    <Main>
        <Skeleton className='w-full h-[400px]'/>
    </Main>
  )
}
