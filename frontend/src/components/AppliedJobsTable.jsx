import { Badge } from './ui/badge'
import { Table, TableCaption, TableHeader, TableRow,TableHead, TableBody,TableCell } from './ui/table'
import React from 'react'

const AppliedJobsTable=()=>{
    return (
        <div>
            <Table>
                <TableCaption>List of your Applied Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className='text-right'>Status</TableHead>
                    </TableRow>

                </TableHeader>
                <TableBody>
                    {
                        [1,2,3,4].map((Item,index)=>(
                            <TableRow key={index}>
                                <TableCell>17-02-2023</TableCell>
                                <TableCell>Frontend Developer</TableCell>
                                <TableCell>Microsoft</TableCell>
                                <TableCell className='text-right'><Badge>Selected</Badge></TableCell>

                            </TableRow>

                        ))
                    }

                </TableBody>
                
            </Table>
        </div>

    )
}
export default AppliedJobsTable;