import React from 'react'
import {Badge} from './ui/badge'
import { Button } from './ui/button';

const JobDescription = () => {
    const isApplied=true;
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-xl'>Title</h1>
                <div className='flex items-center gap-2 mt-4'>
                    <Badge className='text-blue-700 font-bold' variant='ghost'>Positions</Badge>
                    <Badge className='text-red-700 font-bold' variant='ghost'>Part-Time</Badge>
                    <Badge className='text-black-700 font-bold' variant='ghost'>24 LPA</Badge>
                </div>
                <Button disabled={isApplied} className={`rounded-lg ${isApplied?'bg-gray-600 cursor-not-allowed':'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>{isApplied? 'Already Applied':'Apply' }</Button>
            </div>

        </div>
    )

}
export default JobDescription;