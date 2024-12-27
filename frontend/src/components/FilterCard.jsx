import React from 'react'
import { RadioGroup,RadioGroupItem} from './ui/radio-group'
import { Label } from './ui/label'


const filterData=[
    {
        filterType:'Location',
        array:['Chennai','Bangalore','Mumbai','Hyderabad','Pune']
    },
    {
        filterType:'Role',
        array:['Frontend Developer','Backend Developer','Automation Tester','Fullstack Developer','Python Developer','Java Developer']
    },
    {
        filterType:'Salary',
        array:['0-40k','40k-1L','1L-5L']
    }
]

const FilterCard=()=>{
    return (
        <div className='w-full bg-white p-2 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3'/>    
            <RadioGroup>
                {
                    filterData.map((data,index)=>(
                        <div>
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item,index)=>{
                                    return(
                                        <div className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item}/>
                                            <Label>{item}</Label>
                                        </div>
                                    )

                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>        

        </div>
    )
}

export default FilterCard;