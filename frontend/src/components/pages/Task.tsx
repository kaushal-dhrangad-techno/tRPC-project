import { useSelector } from "react-redux";

import { Button } from "../ui/button";
import useFetchAllTask from "@/trpc-hooks/useFetchAllTask";
import useDeleteTask from "@/trpc-hooks/useDeleteTask";
import useToggleTask from "@/trpc-hooks/useToggleTask";
import { TaskProps } from "@/store/taskSlice";
import { RootState } from "./ActiveTasks";

export const notesColors = [
  "#FFF9C4", // Yellow
  "#C8E6C9", // Green
  "#BBDEFB", // Blue
  "#FFCCBC", // Peach
  "#E1BEE7", // Lavender
  "#F8BBD0", // Pink
  "#FFD3B6", // Coral
  "#B2EBF2", // Mint Blue
  "#E6EE9C", // Lime
  "#F5E1DA", // Beige
  "#A7D8DE", // Teal
  "#D7BDE2", // Lilac
  "#FFF4D1", // Buttercream
  "#F2C6DE", // Rose
];

export const deleteButtonColors = [
  "#E57373", // Deep Rose - Soft but noticeable red
  "#D65A50", // Muted Brick - Earthy red with warm tones
  "#C74C43", // Warm Cranberry - Gentle but serious red
  "#B9473E", // Dusty Coral - Dark coral, warm and balanced
  "#A53D36", // Burnt Sunset - Muted deep red-orange
  "#913531", // Smoky Clay - Dark clay red, not too strong
];

export const randomDeleteButton =
  deleteButtonColors[Math.floor(Math.random() * deleteButtonColors.length)];

export const shuffleArray = (array: string[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};
export const shuffleArrayforDeleteButton = (array: string[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Task = () => {
  //For Shuffle colors
  const shuffledColors = shuffleArray(Object.values(notesColors));
  const shuffledDeleteButtonColors = shuffleArrayforDeleteButton(
    Object.values(deleteButtonColors)
  );
  const { error, isLoading } = useFetchAllTask();

  const tasks = useSelector((state: RootState) => {
    return state.tasks.tasks;
  });
  const deleteTaskMutation = useDeleteTask();
  const toggleTaskMutation = useToggleTask();

  const handleToggle = (task: { _id: string; completed: boolean }) => {
    toggleTaskMutation.mutate({ _id: task._id, completed: !task.completed });
  };

  if (isLoading)
    return <p className="flex justify-center items-center">Loading....</p>;
  if (error)
    return (
      <p className="flex justify-center items-center">
        Oops! Error in the Loading Tasks..
      </p>
    );

  return (
    <div className="w-full py-4 ">
      <div className="mb-8">
        <h1 className="text-xl flex justify-center font-semibold ">
          All Tasks
        </h1>
        <div className="mt-4 text-sm text-gray-500 flex items-center justify-center">
          Total tasks: {tasks.length}
        </div>
      </div>
      <div className="w-4/5 flex items-center mx-auto justify-center">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full">
          {tasks.map((task: TaskProps, index: number) => {
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
                    className={` font-Comic font-bold text-slate-900 ${
                      task.completed ? "line-through text-gray-600" : ""
                    }`}
                  >
                    Title: {task.title}
                  </p>
                  <p
                    className={` font-Comic  font-semibold text-slate-900  ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    Description: {task.description}
                  </p>
                </div>
                <Button
                  onClick={() => handleToggle(task)}
                  className="mt-auto bg-green-500"
                >
                  {task.completed ? "Pending" : "Completed"}
                </Button>
                <Button
                  style={{ backgroundColor: deleteButtonBg }}
                  className="  bg-red-500 hover:bg-red-800"
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

export default Task;
