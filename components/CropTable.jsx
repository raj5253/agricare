import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "./ui/table" //"@/components/ui/table"
import { useRouter } from 'next/navigation'
import { format } from "date-fns"
import { Button } from './ui/button'


const CropTable = ({ crops }) => {
    const router = useRouter();
    return (
        <Table>
            <TableCaption>List of your crops</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">S.No.</TableHead>
                    <TableHead>Crop Id</TableHead>
                    <TableHead>Crop Name</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead >Last Update</TableHead>
                    <TableHead className="text-right">Details</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody >
                {crops && crops.map((crop, idx) =>
                    <TableRow key={crop._id} >
                        <TableCell className="font-medium">{idx + 1}</TableCell>
                        <TableCell>{crop.cropId}</TableCell>
                        <TableCell>{crop.crop}</TableCell>
                        <TableCell>{format(new Date(crop.startDate), "PPP")}</TableCell>
                        <TableCell>{format(new Date(crop.lastUpdate), "PPP")}</TableCell>
                        <TableCell className="text-right">{
                            <Button variant="linkb" size="small" onClick={(e) => { e.preventDefault(); router.push(`/dashboard/monitor/${crop._id}`) }}>click</Button>
                        }</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default CropTable