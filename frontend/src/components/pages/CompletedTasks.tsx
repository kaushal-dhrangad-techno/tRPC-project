import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTask, getAllTask, TaskProps } from "@/store/taskSlice";
import { trpc } from "@/utils/trpc";

const CompletedTasks = () => {
  const tasks = useSelector((state) => state.tasks?.tasks || []);
  const dispatch = useDispatch();

  // Use tRPC to fetch data
  const { data: trpcTasks, isLoading } = trpc.todo.allTask.useQuery(undefined, {
    onError: (error) => {
      console.error("Failed to fetch tasks:", error);
    },
  });

  useEffect(() => {
    if (trpcTasks) {
      dispatch(getAllTask(trpcTasks));
    }
  }, [trpcTasks, dispatch]);

  // Safely filter tasks by ensuring we have an array
  const completedTasks = Array.isArray(tasks)
    ? tasks.filter((task) => task?.completed)
    : [];

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading tasks...</div>;
  }

  if (completedTasks.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        No completed tasks found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Completed Tasks</h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {completedTasks.map((task: TaskProps) => (
            <li
              key={task._id}
              className="p-4 flex items-center hover:bg-gray-50"
            >
              <div className="flex-shrink-0 mr-2">
                <input
                  type="checkbox"
                  checked={true}
                  readOnly
                  className="h-4 w-4 text-green-600"
                />
              </div>
              <div className="line-through text-gray-500">{task.title}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Total completed tasks: {completedTasks.length}
      </div>
    </div>
  );
};

export default CompletedTasks;
