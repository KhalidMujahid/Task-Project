import { NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import Task from "@/models/Task";

export async function PUT(req: Request, context: { params: Record<string, string> }) {
  try {
    await connectDB();

    const update = await req.json();
    const task = await Task.findByIdAndUpdate(context.params.id, update, { new: true });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}


export async function DELETE(req: Request, context: { params: Record<string, string> }) {
  try {
    await connectDB();

    const deletedTask = await Task.findByIdAndDelete(context.params.id);

    if (!deletedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted" });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
