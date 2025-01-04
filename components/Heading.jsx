"use client"
import { createBookMark } from '@/actions/bookmark';
import { createTodo } from '@/actions/todo';
import React, { useState } from 'react'
import { toast } from 'react-toastify';


const Heading = ({from="todo",heading="All Todos"}) => {
    const [open, setOpen] = React.useState(false);
    const [input, setInput] = React.useState('');

    const [title, setTitle] = React.useState('');
    const [data,setData]=useState([
      {
        label:"",
        link:""
      }
    ]);
    const [count,setCount]=React.useState(1);

    const handleCreate = async() => {
      if(from==="bookmark"){
        const newObj={
          title,
          children:data
        }
        createBookMark(newObj).then(res=>{
          if(res?.msg){
            toast.success(res.msg);
          }
          if(res?.error){
            toast.error(res.error);
          }
          setOpen(false);
        });
      }else{
        createTodo(input).then(res=>{
          if(res?.msg){
            toast.success(res.msg);
          }
          setOpen(false);
        })
      }
    }

    const handleChange = (e,idx) => {
      const { name, value } = e.target;
      const newData=[...data];
      newData[idx] = {...newData[idx], [name]: value };
      setData(newData);
    };


  return (
    <div>
    <h1 className="text-4xl px-6 font-bold uppercase mt-12 sm:mt-0 flex items-center gap-4">
    <span className='text-[1.5rem] lg:text-4xl'>{heading}</span><button onClick={()=>setOpen(true)} className=' bg-white text-green-700 shadow-lg cursor-pointer p-2 rounded-full text-md h-12 w-12 flex items-center justify-center'>+</button>
  </h1>  
  {
    open && <div className='h-full w-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] z-50 flex flex-col justify-center items-center'>
      <div className='bg-white px-8 py-8 rounded-md'>
      <h1 className="text-2xl font-bold text-black flex items-center justify-between mb-4">
        <span>Add {from}</span><span onClick={()=>setOpen(false)} className='border text-md h-10 w-10 shadow-lg bg-red-100 rounded-full flex items-center justify-center cursor-pointer'>X</span>
      </h1>
      {
        from==="bookmark" ? (
          <div>
            <input value={title} onChange={e=>setTitle(e.target.value)} type="text" className="w-full p-2 border-2 rounded-md border-gray-300 mt-4 text-black" placeholder="Enter title..." />
            <div className='mt-4'>
                <div className='flex items-center gap-4 text-black'>
                  <button onClick={()=>{
                    setCount(prev=>prev+1);
                    const updatedObj=[...data];
                    updatedObj.push({
                      label:"",
                      link:""
                    })
                    setData(updatedObj);
                    }} className='h-6 w-6 shadow-md border-yellow-500 border rounded-full flex items-center justify-center'>+</button>
                  <button onClick={()=>{
                    if(count===1){
                      return;
                    }
                    const updateData=[...data];
                    updateData.pop();
                    setData(updateData);
                    setCount(prev=>prev-1);
                  }}
                   className='h-6 w-6 shadow-md border-yellow-500 border rounded-full flex items-center justify-center'>-</button>
                  </div>
           {Array(count).fill(false).map((item,idx)=>(
             <div className='text-black' key={`${idx+1}`}>
             <input value={data[idx].label} onChange={(e)=>handleChange(e,idx)} name="label" type="text" className="w-full p-2 border-2 rounded-md border-gray-300 mt-4 text-black" placeholder="Enter label..." />
             <input value={data[idx].link} onChange={(e)=>handleChange(e,idx)} name="link" type="text" className="w-full p-2 border-2 rounded-md border-gray-300 mt-4 text-black" placeholder="Enter link value..." />
             </div>
           ))}
           </div>

          </div>
        ): (
          <input value={input} onChange={e=>setInput(e.target.value)} type="text" className="w-full p-2 border-2 rounded-md border-gray-300 mt-4 text-black" placeholder="Enter todo..." />
        )
      }
      {
        from==="bookmark" ? (
          <button  onClick={handleCreate} className="bg-blue-500 text-white p-2 rounded-md mt-4 w-[100px] disabled:bg-gray-300">Add</button>
        )
     :(
          <button disabled={!input} onClick={handleCreate} className="bg-blue-500 text-white p-2 rounded-md mt-4 w-[100px] disabled:bg-gray-300">Add</button>
        )
      }
      </div>
    </div>
  }
    </div>
  )
}

export default Heading