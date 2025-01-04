"use server";
import Todo from "@/models/todo";
import db from "@/utils/db";
import { revalidatePath } from "next/cache";

db();
export async function getTodos(req, res) {
    try {
        let todos = await Todo.find({});
        todos=JSON.parse(JSON.stringify(todos));
        return {
            data: todos,
            status: 200,
        };
    } catch (error) {
        return {
            msg: "Failed to fetch todos",
            status: 500,
            error,
        }
    }
}

export async function createTodo(req, res) {
   try {
    await Todo.create({
        title: req,
    });
    revalidatePath("/todo");
    return{
        msg: "Todo created successfully",
        status: 200,
    }
   } catch (error) {
    return {
        msg: "Failed to create todo",
        status: 500,
        error
    }
   }
}

export async function updateTodo(req, res) {
    try {
        await Todo.updateOne(
            { _id: req._id },
            { $set: { title: req.title, completed: req.completed } }
        );
        revalidatePath("/todo");
        return {
            msg: "Todo updated successfully",
            status: 200,
        };
    } catch (error) {
        return {
            msg: "Failed to update todo",
            status: 500,
            error,
        };
    }
}
export async function deleteTodo(req) {
    try {
        await Todo.findOneAndDelete({ _id: req._id });
        revalidatePath("/todo");
        return {
            msg: "Todo deleted successfully",
            status: 200,
        };
    } catch (error) {
        return {
            msg: "Failed to delete todo",
            status: 500,
            error: error.message,
        };
    }
}