"use client"
import { updateBookmark } from '@/actions/bookmark';
import { EditIcon } from 'lucide-react'
import React,{useState} from 'react'
import { toast } from 'react-toastify';


const Edit  = ({bookmark}) => {

    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState(bookmark?.title);
    const [data,setData]=useState(bookmark?.children);
    const [count,setCount]=React.useState(bookmark?.children?.length);
    

    const handleUpdate=async()=>{
        const newObj={
            ...bookmark,
            title,
            children:data
        }
        updateBookmark(newObj).then(res=>{
            if(res?.msg){
                toast.success(res.msg);
            }
            if(res?.error){
                toast.error(res.error);
            }
            setOpen(false);
        });
    }
    const handleEdit=async()=>{
        setOpen(true);
    }

    const handleChange = (e,idx) => {
        const { name, value } = e.target;
        const newData=[...data];
        newData[idx] = {...newData[idx], [name]: value };
        setData(newData);
      };

  return (
    <div>   
        <button className='text-black h-6 w-6' onClick={handleEdit}>
            <EditIcon className=' text-yellow-400 mt-[-2px]' />
        </button> 

        {
    open && <div className='h-full w-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] z-50 flex flex-col justify-center items-center'>
      <div className='bg-white px-8 py-8 rounded-md'>
      <h1 className="text-2xl font-bold text-black flex items-center justify-between mb-4">
        <span>Edit Book Mark</span><span onClick={()=>setOpen(false)} className='border text-md h-10 w-10 shadow-lg bg-red-100 rounded-full flex items-center justify-center cursor-pointer'>X</span>
      </h1>
          <div>
            <input value={title} onChange={e=>setTitle(e.target.value)} type="text" className="w-full p-2 border-2 rounded-md border-gray-300 mt-4 text-black" placeholder="Enter title..." />
            <div className='mt-4'>
                <div className='flex items-center gap-4 text-black'>
                  <button onClick={()=>setCount(prev=>prev+1)} className='h-6 w-6 shadow-md border-yellow-500 border rounded-full flex items-center justify-center'>+</button>
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
                        <input value={data?.[idx]?.label} onChange={(e)=>handleChange(e,idx)} name="label" type="text" className="w-full p-2 border-2 rounded-md border-gray-300 mt-4 text-black" placeholder="Enter label..." />
                        <input value={data?.[idx]?.link} onChange={(e)=>handleChange(e,idx)} name="link" type="text" className="w-full p-2 border-2 rounded-md border-gray-300 mt-4 text-black" placeholder="Enter link value..." />
                        </div>
                    ))}
            </div>
          </div>
          <button  onClick={handleUpdate} className="bg-blue-500 text-white p-2 rounded-md mt-4 w-[100px] disabled:bg-gray-300">Update</button>
        
      </div>
    </div>
  }
    </div>
           )
}

export default Edit 