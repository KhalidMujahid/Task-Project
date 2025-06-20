import { NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import Task from "@/models/Task";

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    await connectDB();

    const update = await req.json();
    const { id } = context.params;

    const task = await Task.findByIdAndUpdate(id, update, { new: true });

    if (!task) {
      return new NextResponse(JSON.stringify({ error: "Task not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return NextResponse.json(task);
  } catch (e) {
    return new NextResponse(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = context.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return new NextResponse(JSON.stringify({ error: "Task not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return NextResponse.json({ message: "Deleted" });
  } catch (e) {
    return new NextResponse(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
