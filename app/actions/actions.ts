'use server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { PrismaClient } from '@/lib/generated/prisma';
//import { prisma } from '@/app/utils/db'
import { redirect } from 'next/navigation';

const prisma = new PrismaClient()

export default async function HandleSubmission(formData: FormData) {
 
const { getUser } = getKindeServerSession();
const user = await getUser();

const title = formData.get('title');
const content = formData.get('content');
const url = formData.get('url');

if (!user?.id) {
  return redirect('/api/auth/register')
}

await prisma.blogPost.create({
  data: {
    title: title as string,
    content: content as string,
    imageUrl: url as string,
    authorId: user.id,
    authorImage: user?.picture as string,
    authorName: user?.given_name as string
  }
})

  return redirect('/dashboard') 
    

}
