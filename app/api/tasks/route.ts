import { connectDB } from "@/configs/db";
import Task from "@/models/Task";

export async function GET() {
  try {
    await connectDB();
    const tasks = await Task.find();
    return Response.json(tasks);
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    if (data.assignees) {
      if (
        !Array.isArray(data.assignees) ||
        !data.assignees.every((a: unknown) => typeof a === "string")
      ) {
        return new Response(
          JSON.stringify({
            error: "Invalid input: 'assignees' must be an array of strings.",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    const task = await Task.create(data);
    return Response.json(task);
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
