import React, { Suspense } from 'react'
import { PrismaClient } from '@/lib/generated/prisma'; /// In question with utils/db.ts
import BlogPostCard from './general/BlogPostCard';
import { Skeleton } from './ui/skeleton';
//import prisma from '@/app/utils/db'

export const revalidate = 60;


const prisma = new PrismaClient();
await new Promise((resolve) => setTimeout(resolve, 2000));

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
}

async function getData() {
  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true,
      authorImage: true,
      id: true,
      createdAt: true,
      authorId: true,
      authorName: true,
      updatedAt: true,
    },
  });
  // Ensure createdAt and updatedAt are Date objects
  return data.map((item: {
    id: string;
    title: string;
    content: string;
    authorId: string;
    authorName: string;
    authorImage: string;
    imageUrl: string;
    createdAt: string | Date;
    updatedAt: string | Date;
  }): BlogPost => ({
    ...item,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }));
}

export default function Blogs() {
  return (
    <div className="py-6">
        <h3 className="font-bold tracking-tight mb-8">Latest Posts</h3>
        
        <Suspense fallback={<BlogPostsGrid />}>
            <BlogPosts />
        </Suspense>
      </div>
  )
}


async function BlogPosts() {
  const data = await getData()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item: BlogPost) => (
            <BlogPostCard data={item} key={item.id}/>
          ))}
        </div>
  );
}


function BlogPostsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm h-[400px] flex flex-col overflow-hidden"
          key={index}
        >
          {/* Image skeleton */}
          <Skeleton className="h-48 w-full rounded-none" />

          <div className="p-4 flex-1 flex flex-col gap-3">
            {/* Title skeleton */}
            <Skeleton className="h-6 w-3/4" />

            {/* Content skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>

            {/* Footer skeleton */}
            <div className="mt-auto flex items-center justify-between pt-4">
              <div className="flex items-center">
                <Skeleton className="h-8 w-8 rounded-full mr-2" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}