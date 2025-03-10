import { addTask } from "@/store/taskSlice";
import { trpc } from "@/utils/trpc";
import { useDispatch } from "react-redux";

const useAddTask = () => {
  const dispatch = useDispatch();
  const mutation = trpc.todo.addTask.useMutation({
    onSuccess: (response) => {
      if (response.success && response.saveTask._id) {
        dispatch(addTask(response.saveTask));
      }
    },
  });
  return mutation;
};

export default useAddTask;
