"use client"
import { deleteSpecificBookmark } from '@/actions/bookmark'
import {   SquareArrowOutUpRightIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { toast } from 'react-toastify'


const BookmarkListItem = ({bookmarks,parentId}) => {

  const handleDelete=async(id)=>{
    deleteSpecificBookmark({id,parentId}).then(res=>{
      if(res?.msg){
        toast.success(res.msg);
      }
    })
  }

  return (
    <div className='flex flex-col space-y-4'>
      {bookmarks?.map((item)=>(
        <div key={item?._id} className='flex items-center justify-between bg-gray-50 py-3 px-4 rounded-lg shadow-sm hover:shadow-md transition'>
          <h3 className='text-black font-medium'>{item?.label}</h3>
          <div className='flex items-center gap-4'>
          <button className='text-black' onClick={()=>handleDelete(item?._id)}>
            <Trash2Icon className='w-4 h-4 text-red-500' />
          </button>
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
            <SquareArrowOutUpRightIcon className='w-4 h-4 text-blue-500' />
          </a>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BookmarkListItem