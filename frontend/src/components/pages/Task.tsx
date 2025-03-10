// import React from "react";
// import { Button } from "../ui/button";
// import { randomFillSync } from "crypto";

// const tasks = [
//   {
//     _id: "1",
//     title: "Complete the project report",
//     description:
//       "Finalize the project report and submit it by EOD. Finalize the project report and submit it by EOD. Finalize the project report and submit it by EOD.",
//     completed: false,
//   },
//   {
//     _id: "2",
//     title: "Review pull requests",
//     description: "Go through the pending PRs and provide feedback.",
//     completed: true,
//   },
//   {
//     _id: "3",
//     title: "Update documentation",
//     description: "Add missing sections and update outdated information.",
//     completed: false,
//   },
//   {
//     _id: "4",
//     title: "Fix UI bugs in dashboard",
//     description:
//       "Resolve alignment and responsiveness issues in the dashboard.",
//     completed: true,
//   },
//   {
//     _id: "5",
//     title: "Schedule team meeting",
//     description:
//       "Set up a meeting with the team to discuss upcoming milestones.Set up a meeting with the team to discuss upcoming milestones.Set up a meeting with the team to discuss upcoming milestones.",
//     completed: false,
//   },
//   {
//     _id: "5",
//     title: "Schedule team meeting",
//     description:
//       "Set up a meeting with the team to discuss upcoming milestones.",
//     completed: false,
//   },
//   {
//     _id: "5",
//     title: "Schedule team meeting",
//     description:
//       "Set up a meeting with the team to discuss upcoming milestones.",
//     completed: false,
//   },
//   {
//     _id: "5",
//     title: "Schedule team meeting",
//     description:
//       "Set up a meeting with the team to discuss upcoming milestones.",
//     completed: false,
//   },
//   {
//     _id: "1",
//     title: "Complete the project report",
//     description: "Finalize the project report and submit it by EOD.",
//     completed: false,
//   },
//   {
//     _id: "2",
//     title: "Review pull requests",
//     description: "Go through the pending PRs and provide feedback.",
//     completed: true,
//   },
//   {
//     _id: "3",
//     title: "Update documentation",
//     description: "Add missing sections and update outdated information.",
//     completed: false,
//   },
//   {
//     _id: "4",
//     title: "Fix UI bugs in dashboard",
//     description:
//       "Resolve alignment and responsiveness issues in the dashboard.",
//     completed: true,
//   },
//   {
//     _id: "5",
//     title: "Schedule team meeting",
//     description:
//       "Set up a meeting with the team to discuss upcoming milestones.",
//     completed: false,
//   },
//   {
//     _id: "5",
//     title: "Schedule team meeting",
//     description:
//       "Set up a meeting with the team to discuss upcoming milestones.",
//     completed: false,
//   },
//   {
//     _id: "5",
//     title: "Schedule team meeting",
//     description:
//       "Set up a meeting with the team to discuss upcoming milestones.",
//     completed: false,
//   },
//   {
//     _id: "5",
//     title: "Schedule team meeting",
//     description:
//       "Set up a meeting with the team to discuss upcoming milestones.",
//     completed: false,
//   },
// ];

import { useSelector } from "react-redux";
// const notesColors = {
//   stickyYellow: "#FFF9C4",
//   stickyGreen: "#C8E6C9",
//   stickyBlue: "#BBDEFB",
//   stickyPeach: "#FFCCBC",
//   stickyLavender: "#E1BEE7",
//   stickyPink: "#F8BBD0",
//   stickyCoral: "#FFD3B6",
//   stickyMintBlue: "#B2EBF2",
//   stickyLime: "#E6EE9C",
//   stickyBeige: "#F5E1DA",
//   stickyTeal: "#A7D8DE",
//   stickyLilac: "#D7BDE2",
//   stickyButtercream: "#FFF4D1",
//   stickyRose: "#F2C6DE",
// };

// const colorKeys = Object.keys(notesColors);
// console.log(colorKeys);

// const Task = () => {
//   return (
//     <div className="w-full  py-10 ">
//       <div className="  w-4/5  flex items-center mx-auto justify-center ">
//         <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-2 w-full ">
//           {tasks.map((task) => {
//             const randomColorKey =
//               colorKeys[Math.floor(Math.random() * colorKeys.length)];
//             const bgColor = notesColors[randomColorKey];
//             return (
//               <li
//                 style={{ backgroundColor: bgColor }}
//                 className={`flex flex-col px-3 py-3 h-auto gap-1  justify-start ${bgColor} text-black`}
//               >
//                 <div className="flex flex-col gap-3">
//                   <p className=""> title: {task.title}</p>
//                   <p>Descripton: {task.description}</p>
//                 </div>
//                 <Button className="mt-auto">Delete</Button>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Task;

import { Button } from "../ui/button";
import useFetchAllTask from "@/trpc-hooks/useFetchAllTask";
import useDeleteTask from "@/trpc-hooks/useDeleteTask";

const notesColors = [
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

const deleteButtonColors = [
  "#E57373", // Deep Rose - Soft but noticeable red
  "#D65A50", // Muted Brick - Earthy red with warm tones
  "#C74C43", // Warm Cranberry - Gentle but serious red
  "#B9473E", // Dusty Coral - Dark coral, warm and balanced
  "#A53D36", // Burnt Sunset - Muted deep red-orange
  "#913531", // Smoky Clay - Dark clay red, not too strong
];

const randomDeleteButton =
  deleteButtonColors[Math.floor(Math.random() * deleteButtonColors.length)];

const shuffleArray = (array: string[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};
const shuffleArrayforDeleteButton = (array: string[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

// console.log("This is random number", Math.random() - 0.5);

const Task = () => {
  //For Shuffle colors
  const shuffledColors = shuffleArray(Object.values(notesColors));
  const shuffledDeleteButtonColors = shuffleArrayforDeleteButton(
    Object.values(deleteButtonColors)
  );
  const { error, isLoading } = useFetchAllTask();

  const tasks = useSelector((state) => state.tasks.tasks);
  const deleteTaskMutation = useDeleteTask()

  if (isLoading)
    return <p className="flex justify-center items-center">Loading....</p>;
  if (error)
    return (
      <p className="flex justify-center items-center">
        Oops! Error in the Loading Tasks..
      </p>
    );

  return (
    <div className="w-full py-10 ">
      <div className="w-4/5 flex items-center mx-auto justify-center">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full">
          {tasks.map((task, index) => {
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
                  <p className="">Title: {task.title}</p>
                  <p>Description: {task.description}</p>
                </div>
                <Button className="mt-auto  bg-green-500">Completed</Button>
                <Button
                  style={{ backgroundColor: deleteButtonBg }}
                  className="  bg-red-500"
                  onClick={() => deleteTaskMutation.mutate({_id: task._id})}
                  
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
