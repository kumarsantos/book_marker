"use client"
import { createTodo } from '@/actions/todo';
import React from 'react'
import { toast } from 'react-toastify';


const Heading = () => {
    const [open, setOpen] = React.useState(false);
    const [input, setInput] = React.useState('');

    const handleCreate = async() => {
      createTodo(input).then(res=>{
        if(res?.msg){
          toast.success(res.msg);
        }
        setOpen(false);
      })
    }


  return (
    <>
    <h1 className="text-4xl px-6 font-bold uppercase mt-12 sm:mt-0 flex items-center gap-4">
    <span>All Todos</span><button onClick={()=>setOpen(true)} className=' bg-white text-green-700 shadow-lg cursor-pointer p-2 rounded-full text-md h-12 w-12 flex items-center justify-center'>+</button>
  </h1>  
  {
    open && <div className='h-full w-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] z-50 flex flex-col justify-center items-center'>
      <div className='bg-white px-8 py-8 rounded-md'>
      <h1 className="text-2xl font-bold text-black flex items-center justify-between mb-4">
        <span>Add Todo</span><span onClick={()=>setOpen(false)} className='border text-md h-10 w-10 shadow-lg bg-red-100 rounded-full flex items-center justify-center cursor-pointer'>X</span>
      </h1>
      <input value={input} onChange={e=>setInput(e.target.value)} type="text" className="w-full p-2 border-2 rounded-md border-gray-300 mt-4 text-black" placeholder="Enter here..." />
      <button disabled={!input} onClick={handleCreate} className="bg-blue-500 text-white p-2 rounded-md mt-4 w-[100px] disabled:bg-gray-300">Add</button>
      </div>
    </div>
  }
    </>
  )
}

export default Heading