import { DialogTitle } from '@radix-ui/react-dialog';
import { Dialog, DialogFooter,DialogContent, DialogHeader } from './ui/dialog'
import {React,useState}from 'react'
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import {Label} from './ui/label'
import { useSelector } from 'react-redux';

const UpdateProfileDisplay = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false)
    const {user}=useSelector(store=>store.auth)
    const [input,setInput]=useState({
        fullname:user?.fullname,
        email:user?.email,
        phoneNumber:user?.phoneNumber,
        bio:user?.profile?.bio,
        skills:user?.profile?.skills?.map(skill=>skill),
        file:user?.profile?.resume
    })

    const changeEventHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }

    const fileChangeHandler=(e)=>{
        const file=e.target.files?.[0];
        setInput({...input,file})

    }

    const submitHandler= async (e)=>{
        
        e.preventDefault();
        const formData=new FormData();
        formData.append("fullname",input.fullname);
        formData.append("email",input.email);
        formData.append("phoneNumber",input.phoneNumber);
        formData.append("bio",input.bio);
        formData.append("skills",input.skills);
        if(input.file){
            formData.append("file",input.file)
        }
        try{

            const res=await axios.put()
        }
        catch(error){

        }


    }
    return (
        <div>
            <Dialog open={open}>
                <DialogContent className='sm:max-w-[425px]' onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>
                            Update Profile
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}> 
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='name' className='text-right '>Name</Label>
                                <input id='name' className='col-span-3 border' name='name' type='text' value={input.fullname} onchange={changeEventHandler}/>

                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='email' className='text-right '>Email</Label>
                                <input id='email' className='col-span-3 border' name='email' type='email' value={input.email} onchange={changeEventHandler} />

                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='number' className='text-right '>Phone Number</Label>
                                <input id='number' className='col-span-3 border' name='number' value={input.phoneNumber} onchange={changeEventHandler}/>

                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='bio' className='text-right '>Bio</Label>
                                <input id='bio' className='col-span-3 border' name='bio' value={input.bio} onchange={changeEventHandler} />

                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='skills' className='text-right '>Skills</Label>
                                <input id='skills' className='col-span-3 border' name='skills' onchange={changeEventHandler} />

                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='file' className='text-right '>Resume</Label>
                                <input id='file' className='col-span-3 ' name='file' type='file' accept='application/pdf' onChange={fileChangeHandler} />

                            </div>

                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className='w-full my-4 '><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button> : <Button type='submit' className='w-full my-4'>Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>

            </Dialog>

        </div>
    )
}

export default UpdateProfileDisplay;