"use client"
import { deleteTodo, updateTodo } from '@/actions/todo';
import { EditIcon, Trash2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const TodoListItem = ({item:{title,completed,_id},idx}) => {
const [completedState, setCompletedState] = React.useState(completed);

   const [open, setOpen] = React.useState(false);
   const [input, setInput] = React.useState(title);

const handleUpdate = async(e) => {
    setCompletedState(!completedState);
    updateTodo({_id,title:input,completed:e.target.checked}).then(res=>{
        if(res?.msg){
          toast.success(res.msg);
        }
        if(res?.error){
          toast.error(res.error);
        }
        setOpen(false);
    })
}

const handleDelete=async()=>{
    deleteTodo({_id}).then(res=>{
        if(res?.msg){
          toast.success(res.msg);
        }
        if(res?.error){
          toast.error(res.error);
        }
    })
}

if(!title){
    return null;
}

  return (
    <div>
        <div className="border text-black w-full sm:max-w-[50vw]  p-4 rounded-md bg-[rgba(255,255,255,0.9)] hover:bg-white hover:text-black transition">
            <h3 className="text-sm font-bold flex flex-wrap"> {idx+1}.&nbsp;{title?.slice(0,50)}</h3>
            <div className='flex items-center justify-between mt-4'>
            <button className="text-sm font-semibold">
                {completedState ? <span className='border px-2 py-[4px] rounded-full border-green-500 shadow-md bg-green-300 text-xs flex items-center justify-center'>Completed</span> : <span className='border px-2 py-[4px] rounded-full border-red-300 shadow-md bg-red-100 text-xs flex items-center justify-center '>Incomplete</span>}
            </button>
            <div className='flex items-center gap-4'>
            <button onClick={handleDelete}><Trash2 className='h-4 w-4 text-red-500' /></button>
            <button onClick={()=>{setOpen(true)}}><EditIcon className='h-4 w-4 text-blue-500' /></button>
            <input type="checkbox" onChange={handleUpdate} className="h-4 w-4 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" checked={completedState}  />
            </div>
            </div>
        </div>
        {
    open && <div className='h-full w-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] z-50 flex flex-col justify-center items-center'>
      <div className='bg-white px-8 py-8 rounded-md'>
      <h1 className="text-2xl font-bold text-black flex items-center justify-between mb-4">
        <span>Edit Todo</span><span onClick={()=>setOpen(false)} className='border text-md h-10 w-10 shadow-lg bg-red-100 rounded-full flex items-center justify-center cursor-pointer'>X</span>
      </h1>
          <input value={input} onChange={e=>setInput(e.target.value)} type="text" className="w-full p-2 border-2 rounded-md border-gray-300 mt-4 text-black" placeholder="Enter todo..." />
          <button disabled={!input} onClick={handleUpdate} className="bg-blue-500 text-white p-2 rounded-md mt-4 w-[100px] disabled:bg-gray-300">Update</button>
      </div>
    </div>
  }
    </div>
  )
}
export default TodoListItem