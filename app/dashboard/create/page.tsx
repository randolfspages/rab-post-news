import HandleSubmission from '@/app/actions/actions'
import Main from '@/components/general/Main'
import SubmitButton from '@/components/general/SubmitButton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'

import React from 'react'




export default function CreateBlogRoute() {

  return (
    <Main>
        <Card className='max-w-lg mx-auto'>
          <CardHeader>
            <CardTitle>Create Post</CardTitle>
            <CardDescription>Create a new Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <form className='flex flex-col gap-4' action={HandleSubmission}>
              <div className='flex flex-col gap-2'>
                <Label>Title</Label>
                <Input name='title' required placeholder='title'/>
              </div>
              <div className='flex flex-col gap-2'>
                <Label>Content</Label>
                <Textarea name='content' required placeholder='content' />
              </div>
              <div className='flex flex-col gap-2'>
                <Label>Image Url</Label>
                <Input name='url' required placeholder='image url' type='url' />
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
        
    </Main>
  )
};
