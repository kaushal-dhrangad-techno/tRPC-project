import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAddTask from "@/trpc-hooks/useAddTask";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTaskMutation = useAddTask();

  const handleAddTask = () => {
    if (!title.trim()) return;
    console.log("Task submitted successfully", title);

    addTaskMutation.mutate({ title: title, description: description, completed: false });
    setTitle("");
  };

  return (
    <div className="w-full  sm:w-3/4 md:w-1/2 mx-auto  flex justify-center items-center">
      <Dialog>
        <DialogTrigger asChild>
          {/* <Button variant="outline">Edit Profile</Button> */}
          <div className="bg-slate-200 mt-20 text-black w-3/4 px-5 py-2 my-5 rounded-lg flex items-center  justify-center cursor-text text-[12px] sm:text-[14px] md:text-base">
            Add New Task
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a New Task</DialogTitle>
            <DialogDescription>
              Create your task here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="name"
                placeholder="Enter task title.."
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Description" className="text-right">
                Description
              </Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="username"
                className="col-span-3"
                placeholder="Enter task description..."
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleAddTask} type="submit">
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTask;
