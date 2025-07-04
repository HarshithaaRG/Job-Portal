import React, { useEffect } from 'react'
import Navbar from './shared/Navbar';
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import {useNavigate } from 'react-router-dom';


const Browse = () => {
    useGetAllJobs();
    const{user}=useSelector(store=>store.auth);
    const navigate=useNavigate();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(!user){
            navigate('/signup');
        }
    })
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job}/>
                            )
                        })
                    }
                </div>

            </div>

        </div>
    )
}
export default Browse;