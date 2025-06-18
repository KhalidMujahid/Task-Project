import { connectDB } from "@/configs/db";
import Task from "@/models/Task";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const update = await req.json();
    const task = await Task.findByIdAndUpdate(params.id, update, { new: true });
    return Response.json(task);
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    await Task.findByIdAndDelete(params.id);
    return Response.json({ message: "Deleted" });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
