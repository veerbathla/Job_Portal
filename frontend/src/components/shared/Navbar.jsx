
import React from 'react'
import { Link } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '@base-ui/react'
import { Avatar, AvatarImage } from '../ui/avatar'

export const Navbar = () => {
  return (
    <div className='bg-white '>
        <div className='flex items-center justify-between mx-auto max-w-7xl  h-16'>
       <div>
         <h1 className='text-2xl font-bold'>Job<span className='text-[#f83002]'>Portal</span></h1>
         </div>
         <div className='flex items-center gap-12'>
            <ul className='flex font-medium items-center gap-5'>
                <li>Home</li>
                <li>Jobs</li>
                <li>Browse</li>
            </ul>
            <Popover>
                <PopoverTrigger asChild>
                    <Avatar  className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" alt="veer"/>
                    </Avatar>
                </PopoverTrigger>
               <PopoverContent className="w-80">
               <div className='flex items-center gap-4 '>
                  <Avatar  className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" alt="veer"/>
                    </Avatar>
                    <div>
                        <h4 className='font-medium '>Veer Bathla</h4>
                        <p className='text-sm text-muted-foreground'>Hi lol</p>
                    </div>
               </div>
               <div className='flex flex-col'>
                <Button variant="outline">View Profile</Button>
                <Button variant="destructive">Logout</Button>
               </div>
                </PopoverContent> 
            </Popover>
         </div>
        </div>

    </div>
  )
}
