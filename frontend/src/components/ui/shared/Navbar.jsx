import React from 'react'
import { Link } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Navbar = () => {
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-6xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className='flex gap-12'>
                    <ul className='flex font-medium gap-5'>
                        <li>Home</li>
                        <li>Jobs</li>
                        <li>Browse</li>
                    </ul>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className='cursor-pointer'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                
                            </Avatar>

                        </PopoverTrigger>
                        <PopoverContent className='w-80'>
                            <Avatar className='cursor-pointer'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                            </Avatar>
                            <h4 className='font-medium'>Harshithaa</h4>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

        </div>
    )
}

export default Navbar;