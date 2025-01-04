import { getBookmarks,deleteBookmark } from "@/actions/bookmark";
import BookmarkListItem from "@/components/BookmarkListItem";
import Edit from "@/components/Edit ";
import Heading from "@/components/Heading";
import {  Trash2 } from "lucide-react";
import React from "react";


const BookmarkUI = async() => {
  const {data=[]}=await getBookmarks();

  return (
    <div className="min-h-screen  w-full">
      <div className="py-20">
        <Heading heading="All Book Marks" from="bookmark" />
        <ul className="mt-8 px-2 md:px-6 gap-4  max-h-[450px] sm:max-h-[600px] overflow-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
          {data?.map((bookmark) => {
            return (
              <div >
                <div className="flex items-center gap-4">
                  <form action={deleteBookmark} className="flex items-center gap-4">
                    <input type="hidden" name="id" value={bookmark?._id} />
                    <div className="mb-4 flex items-center gap-4" >
                        <span className="text-2xl font-bold flex items-center">{bookmark?.title}</span><button type="submit" className="mt-[4px]"><Trash2 fill="red" className=' border-white h-6 w-6' /></button>
                    </div>
                  </form>
                  <Edit bookmark={bookmark} />
                </div>
                <BookmarkListItem key={bookmark?._id} bookmarks={bookmark?.children} parentId={bookmark?._id} />
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default BookmarkUI;
