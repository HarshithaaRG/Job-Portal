import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button'

const Category=[
    "Frontend Devloper",
    "Backend Developer",
    "Graphic Designer",
    "Full Stack Developer",
    "Python Devloper",
    "Java Developer"

]

const CategoryCarousel=()=>{
    return (
        <div>
            <Carousel className="max-w-xl mx-auto my-20">
                <CarouselContent>
                    {Category.map((cat,item)=>(
                        <CarouselItem className='md:basis-1/2 lg:basis-1/3'>
                            <Button className='rounded-full '>{cat}</Button>

                        </CarouselItem>

                    ))}
                    
                </CarouselContent>
                <CarouselPrevious className='border-black'/>
                <CarouselNext className='border-black'/>


            </Carousel>

        </div>
    )
}

export default CategoryCarousel;