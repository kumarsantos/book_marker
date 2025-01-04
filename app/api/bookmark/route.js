import BookMark from "@/models/bookmark";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const newObj = await req.json();
    await BookMark.create({
      title: newObj.title,
      children: newObj.children,
    });
    return NextResponse.json({ msg: "Bookmark created successfully",success:true },{status:200});
  } catch (error) {
    return NextResponse.json({ error: "Failed to create bookmark",success:false,error:error.message },{status:500});
  }
}
