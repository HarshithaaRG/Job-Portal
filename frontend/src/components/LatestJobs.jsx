import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import Analyser from './Analyser';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const LatestJobs = () => {
    const navigate=useNavigate();
    const {allJobs}=useSelector(store=>store.job);
    const analyse=()=>{
        navigate('/analyser')
    }
    return (
        <div className='max-w-6xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top  </span>Job Openings</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    allJobs.length<=0 ? <span>No jobs found</span>: allJobs.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job} />)
                }

            </div>

            <div className='mx-auto my-20'>
                <h1 className='text-4xl font-bold my-5'>Analyse your resume with our AI-Powered Resume analyser</h1>
                <Button onClick={analyse}>Click here to Analyse your Resume now</Button>
            </div>


        </div>
    )
}

export default LatestJobs