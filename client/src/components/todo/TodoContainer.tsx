import { useState } from "react";
import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";
import { useGetTodosQuery } from "@/redux/api/api";

type Titem = {
  _id: string;
  task: string;
  description: string;
  priority: string;
  isCompleted: boolean;
};

const TodoContainer = () => {
  const [filter, setFilter] = useState("");

  const { data, isError, isLoading } = useGetTodosQuery(filter);
  //RTK query

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (isError) {
    return <p>{isError}</p>;
  }

  return (
    <div>
      <div className="flex justify-between mb-5 ">
        <AddTodoModal />
        <TodoFilter filter={filter} setFilter={setFilter} />
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl  p-[5px]">
        <>
          {data?.data.length ? (
            <div className="bg-white p-5 w-full h-full rounded-lg space-y-3">
              {data?.data.map((item: Titem) => (
                <TodoCard {...item} />
              ))}
            </div>
          ) : (
            <div className="bg-white text-2xl font-bold p-5 flex justify-center items-center rounded-md">
              <p>There is no task pending</p>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default TodoContainer;
