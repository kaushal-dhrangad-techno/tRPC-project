import { removeTask } from "@/store/taskSlice";
import { trpc } from "@/utils/trpc";
import { useDispatch } from "react-redux";

const useDeleteTask = () => {
  const dispatch = useDispatch();

  const mutation = trpc.todo.deleteTask.useMutation({
    onMutate: async (variables) => {
      console.log("Deleting Task ID:", variables._id); // 🔍 Debugging log
    },
    onSuccess: (_, variables) => {
      if (variables._id) {
        dispatch(removeTask(variables._id));
      }
    },
  });
  return mutation;
};

export default useDeleteTask;
