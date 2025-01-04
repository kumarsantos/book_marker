import { getTodos } from '@/actions/todo';
import Heading from '@/components/Heading';
import TodoListItem from '@/components/TodoListItem';
import React from 'react'

const Todo = async() => {
  const {data=[]}=await getTodos();
  return (
    <div className='max-h-screen w-full'>
      <div className='py-20'>
       <Heading />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 px-4 sm:px-8 max-h-[360px] sm:max-h-[600px] overflow-auto'>
          {
            data?.map((item,idx) => {
              return (
                <TodoListItem key={item?._id} idx={idx} item={item} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Todo