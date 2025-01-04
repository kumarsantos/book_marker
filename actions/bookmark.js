"use server";
import BookMark from "@/models/bookmark";
import db from "@/utils/db";
import { revalidatePath } from "next/cache";

db();
export async function getBookmarks(req, res) {
    try {
        let bookmarks = await BookMark.find({});
        bookmarks=JSON.parse(JSON.stringify(bookmarks));
        return {
            data: bookmarks,
            status: 200,
        };
    } catch (error) {
        return {
            msg: "Failed to fetch bookmarks",
            status: 500,
            error,
        }
    }
}

export async function createBookMark(req) {
   try {
       const newObj=await req;
        await BookMark.create({
            title: newObj.title,
            children: newObj.children,
        });
        revalidatePath("/book_mark");
        return{
            msg: "Bookmark created successfully",
            status: 200,
        }
   } catch (error) {
    return {
        msg: "Failed to create bookmark",
        status: 500,
        error:null
    }
   }
}
export async function deleteBookmark(formData) {
   try {
    const id=formData.get("id");
    await BookMark.deleteOne({_id:id});
        revalidatePath("/book_mark");
        return{
            msg: "Bookmark deleted successfully",
            status: 200,
        }
   } catch (error) {
    return {
        msg: "Failed to delete bookmark",
        status: 500,
        error
    }
   }
}
export async function deleteSpecificBookmark(req) {
   try {
    const id=await req.id;
    const parentId=await req.parentId;

        await BookMark.updateOne(
            { _id: parentId }, // Match the parent document
            { $pull: { children: { _id: id } } } // Remove the child with matching _id
        );   
        revalidatePath("/book_mark");
        return{
            msg: "Bookmark deleted successfully",
            status: 200,
        }
   } catch (error) {
    return {
        msg: "Failed to delete bookmark",
        status: 500,
        error
    }
   }
}

export async function updateBookmark(req) {
    try {
        const newObj=await req;
        const filter = { _id: newObj?._id }; // Find document with the parentId
        const update = {
          $set: {
            title: newObj.title,
            children: newObj.children,
          }
        };
    
      await BookMark.updateOne(filter, update);
         revalidatePath("/bookmark");
         return{
             msg: "Bookmark updated successfully",
             status: 200,
         }
    } catch (error) {
     return {
         msg: "Failed to update bookmark",
         status: 500,
         error
     }
    }
 }
