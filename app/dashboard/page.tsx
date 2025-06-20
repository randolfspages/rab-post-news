import Main from '@/components/general/Main';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
// Update the import path below to the correct relative or alias path for your project setup
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
// import { redirect } from 'next/navigation';
import { PrismaClient } from '@/lib/generated/prisma'; // Adjust the import path as needed
import BlogPostCard from '@/components/general/BlogPostCard';
//import prisma from "../utils/db";


const prisma = new PrismaClient()

async function getData(userId: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = await prisma.blogPost.findMany({
    where: {
      authorId:userId,
    },
    orderBy: {
      createdAt: 'desc',
    }
  })
  return data
}

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  interface BlogPost {
    id: string;
    title: string;
    content: string;
    authorId: string;
    authorName:string;
    authorImage:string;
    imageUrl:string;
    createdAt: Date;
    updatedAt: Date;
    // Add other fields as needed
  }


  let data: BlogPost[] = [];
  if (user?.id) {
    data = await getData(user.id);
  }

  // if(!user) {
  //   return redirect('/api/auth/register')
  // }

  return (

  <Main>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='font-bold tracking-tight mb-4'>Your Blog Articles</h2>
        <Link className={buttonVariants()} href='/dashboard/create'>Create Post</Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {data.map((item) => (
              <BlogPostCard data={item} key={item.id}/>               
            ))}
      </div>
  </Main>
  )
}
