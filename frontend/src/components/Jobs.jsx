import React from 'react'
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job'

const JobArray = [1, 2, 3, 4, 5, 6, 7, 8]

const Jobs = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <div className='flex gap-5'>
                    <div>
                        <FilterCard/>
                    </div>
                    
                    {
                        JobArray.length<=0 ? <span>Job not found</span>:(
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        JobArray.map((card,index)=>(
                                            <div>
                                                <Job/>
                                            </div>    
                                        ))
                                    }

                                </div>

                            </div>    

                        )
                        

                        
                    }

                    
                    
                </div>

            </div>


        </div>
    )
}

export default Jobs;