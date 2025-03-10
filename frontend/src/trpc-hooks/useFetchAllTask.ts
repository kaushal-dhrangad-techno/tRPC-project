import { getAllTask } from "@/store/taskSlice";
import { trpc } from "@/utils/trpc";
import { useDispatch } from "react-redux";

const useFetchAllTask = () => {
  const dispatch = useDispatch();

  const { data, isLoading, error } = trpc.todo.allTask.useQuery(undefined, {
    onSuccess: (tasks) => {
      dispatch(getAllTask(tasks));
    },
  });

  return {tasks: data || [], isLoading, error}
};

export default useFetchAllTask;
