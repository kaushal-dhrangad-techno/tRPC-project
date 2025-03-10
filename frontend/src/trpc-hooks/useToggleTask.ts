import { toggleTask } from "@/store/taskSlice";
import { trpc } from "@/utils/trpc";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { resolve } from "path";
import { useDispatch } from "react-redux";

const useToggleTask = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const mutation = trpc.todo.toggleTask.useMutation({
    onSuccess: (response) => {
      if (response.success && response.updatedTask) {
        dispatch(toggleTask(response.updatedTask));

        queryClient.invalidateQueries(["todo.getAllTasks"]);
      }
    },
  });

  return mutation;
};

export default useToggleTask;
