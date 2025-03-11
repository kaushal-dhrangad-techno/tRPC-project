import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTask, TaskProps } from "@/store/taskSlice";
import { trpc } from "@/utils/trpc";
import {
  deleteButtonColors,
  notesColors,
  shuffleArray,
  shuffleArrayforDeleteButton,
} from "./Task";
import { Button } from "../ui/button";
import useDeleteTask from "@/trpc-hooks/useDeleteTask";
import { RootState } from "./ActiveTasks";

const CompletedTasks = () => {
  const tasks = useSelector((state: RootState) => state.tasks?.tasks || []);
  const dispatch = useDispatch();
  const deleteTaskMutation = useDeleteTask();

  const shuffledColors = shuffleArray(Object.values(notesColors));
  const shuffledDeleteButtonColors = shuffleArrayforDeleteButton(
    Object.values(deleteButtonColors)
  );

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
    <div className="w-full py-4 ">
      <div className="mb-8">
        <h1 className="text-xl flex justify-center font-semibold ">
          Completed Tasks
        </h1>
        <div className="mt-4 text-sm text-gray-500 flex items-center justify-center">
          Total completed tasks: {completedTasks.length}
        </div>
      </div>
      <div className="w-4/5 flex items-center mx-auto justify-center">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full">
          {completedTasks.map((task: TaskProps, index: number) => {
            const bgColor = shuffledColors[index % shuffledColors.length];
            const deleteButtonBg =
              shuffledDeleteButtonColors[
                index % shuffledDeleteButtonColors.length
              ];
            return (
              <li
                key={task._id}
                style={{ backgroundColor: bgColor }}
                className="flex flex-col px-3 py-3 h-auto gap-1 justify-start text-black rounded-md"
              >
                <div className="flex flex-col gap-3">
                  <p
                    className={
                      task.completed ? "line-through text-gray-500" : ""
                    }
                  >
                    Title: {task.title}
                  </p>
                  <p className={
                      task.completed ? "line-through text-gray-500" : ""
                    }>Description: {task.description}</p>
                </div>
                <Button
                  style={{ backgroundColor: deleteButtonBg }}
                  className="  bg-red-500"
                  onClick={() => deleteTaskMutation.mutate({ _id: task._id })}
                >
                  Delete
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CompletedTasks;
