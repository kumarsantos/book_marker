"use client"
import { updateTodo } from '@/actions/todo';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const TodoListItem = ({item:{title,completed,_id},idx}) => {
const [completedState, setCompletedState] = React.useState(completed);

const handleUpdate = async(e) => {
    setCompletedState(!completedState);
    updateTodo({_id,title,completed:e.target.checked}).then(res=>{
        if(res?.msg){
          toast.success(res.msg);
        }
    })
}

if(!title){
    return null;
}

  return (
    <div>
        <div className="border text-black w-full sm:max-w-[50vw]  p-4 rounded-md bg-[rgba(255,255,255,0.9)] hover:bg-white hover:text-black transition">
            <h3 className="text-lg font-bold flex flex-wrap"> {idx+1}.&nbsp;{title}</h3>
            <div className='flex items-center justify-between mt-4'>
            <button className="text-sm font-semibold">
                {completedState ? <span className='border px-2 py-[4px] rounded-full border-green-500 shadow-md bg-green-300 text-xs flex items-center justify-center'>Completed</span> : <span className='border px-2 py-[4px] rounded-full border-red-300 shadow-md bg-red-100 text-xs flex items-center justify-center '>Incomplete</span>}
            </button>
            <input type="checkbox" onChange={handleUpdate} className="h-4 w-4 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" checked={completedState}  />
            </div>
        </div>
    </div>
  )
}
export default TodoListItem