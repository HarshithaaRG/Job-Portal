import {React,useState} from 'react'
import Navbar from './shared/Navbar';

import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from './ui/button';
import { Pen, Mail, Contact } from 'lucide-react';
import { Badge } from './ui/badge'
import AppliedJobsTable from './AppliedJobsTable';
import UpdateProfileDisplay from './UpdateProfileDisplay';


const skills = ["Html", "Css", "Javascript", "Node js"]

const Profile = () => {
    const [open,setOpen]=useState(false)
    const isResume = true
    return (
        <div>
            <Navbar />
            <div className='mx-auto max-w-4xl bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className='h-10 w-10'>
                            <AvatarImage src='https://github.com/shadcn.png' alt='profile' />

                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>Full Name</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam veritatis veniam cupiditate praesentium sunt temporibus.</p>
                        </div>
                    </div>
                    <Button onClick={()=> setOpen(true)} className='text-right' variant='outline'><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>harsh@gmail.com</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>7265252297</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            skills.length !== 0 ? skills.map((item, index) => <Badge>{item}</Badge>) : <span>NA</span>
                        }

                    </div>

                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <label className='text-md font-bold'>Resume</label>
                    {
                        isResume ? <a target='blank' href='https://youtube.com' className='text-blue-500 w-full hover:underline cursor-pointer'>Your Resume</a> : <span>NA</span>
                    }
                </div>

            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobsTable />

            </div>
            <UpdateProfileDisplay open={open} setOpen={setOpen}/>
        </div>
    )

}
export default Profile;