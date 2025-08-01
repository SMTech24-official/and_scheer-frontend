import React from 'react'
import { MapPin, Star, Save, Eye } from 'lucide-react';
import { useGetAllCompaniesQuery } from '@/redux/features/company/companySlice';
import { Job } from '@/types/AllTypes';
import { formatDistanceToNow } from 'date-fns';
import { PiBagSimpleFill } from 'react-icons/pi';
import { LuDot } from 'react-icons/lu';
import Image from 'next/image';
import Link from 'next/link';

export default function JobCard({ job }: { job: Job }) {
    console.log(job)

    const { data: comInfo } = useGetAllCompaniesQuery();
    const company = comInfo?.data?.find(p => p.id == job?.companyId);
    console.log(company, "Here is filtered")

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4 hover:shadow-md transition-shadow w-full md:min-w-[666px]">
            <div className="flex justify-between items-start mb-4">


                <div className='flex items-center gap-3'>
                    <h3 className="font-semibold text-lg md:text-[28px] text-gray-900">{company?.companyName}</h3>
                    <p className="text-gray-500 text-sm">Uploaded {company?.createdAt && formatDistanceToNow(new Date(company?.createdAt), { addSuffix: true })}</p>
                </div>
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    {/* <span className="text-white font-bold text-lg">SJ</span> */}
                    {/* <Image src={company?.logo || ""} alt={company?.companyName.split(" ").slice(0, 2)
                        .map(word => word[0])
                        .join("")
                        .toUpperCase() ||""} height={9} width={9}
                    /> */}
                </div>


            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-2">{job?.title}</h2>

            <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{job?.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <PiBagSimpleFill className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{job?.experience}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{job?.jobType} </span>
                </div>
            </div>

            <div className="text-sm text-gray-600 mb-4 border-b-2 border-t-2  flex items-center gap-3 py-3 border-gray-200">
                <span className="font-medium ">Skill Needed:</span>
                <div className='flex flex-wrap'>
                    {job?.skills.slice(0, 5).map((skill, index, arr) => (
                        <div className='flex items-center' key={index}>
                            {skill}
                            {index < arr.length - 1 && <LuDot className='size-6' />}
                        </div>
                    ))}
                </div>

            </div>

            <div className="flex justify-between items-center">
                <div className="text-lg md:text-2xl font-bold text-gray-900">
                    {job?.salaryRange} <span className="text-sm font-normal text-gray-500">/month</span>
                </div>
                <Link href={`/jobSeeker/job-details/${job.id}`}>
                    <button className="text-primary underline transition-colors cursor-pointer hover:text-green-600">
                        View Details
                    </button>
                </Link>

            </div>
        </div>
    )
}
