import React from 'react'
import { PrismaClient } from '@/lib/generated/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Main from '@/components/general/Main';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';




const prisma = new PrismaClient()

async function getData(id: string) {
    const data = await prisma.blogPost.findUnique({
        where: {
            id:id,
        },
    });

    if(!data) {
        return notFound()
    }
    return data
}

type Params = Promise<{id: string}>

export default async function Idpage({params}: {params:Params}) {
    const {id} = await params
    const data = await getData(id);
  
    return (
    <Main> 
        <Link href='/' className={buttonVariants({variant:'secondary'})}>Back to posts</Link>
        <div className='mb-8 mt-6'>
            <h1 className='font-bold tracking-tight mb-4'>{data.title}</h1>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <div className="relative size-10 overflow-hidden rounded-full">
                        <Image src={data.authorImage} alt='data.authorName' fill className='object-cover'/>
                    </div>
                    <p className='text-sm font-semibold'>{data.authorName}</p>
                </div>
                <p className='text-sm text-gray-600'>
                    {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'numeric'}).format(data.createdAt)}           
                </p>
            </div>
            <div className='relative h-[400px] w-full mb-8 overflow-hidden rounded-lg'>
                <Image src={data.imageUrl} alt={data.imageUrl} fill className='object-cover' priority/>
            </div>
            <Card>
                <CardContent>
                    <p className='text-gray-600'>{data.content}</p>
                </CardContent>
            </Card>
        </div>
    </Main>
  )
}
