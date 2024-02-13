import { useUpdateTodoMutation } from "@/redux/api/api";
import DeleteAlert from "./DeleteAlert";
import TodoUpdateModal from "./TodoUpdateModal";

type TTodoCardProps = {
  _id: string;
  task: string;
  description: string;
  priority: string;
  isCompleted?: boolean;
};

const TodoCard = ({
  task,
  description,
  _id,
  isCompleted,
  priority,
}: TTodoCardProps) => {
  const [updateTodo] = useUpdateTodoMutation();

  const toggleState = () => {
    const options = {
      _id,
      data: {
        task,
        description,
        isCompleted: !isCompleted,
        priority,
      },
    };

    updateTodo(options);
  };

  return (
    <div className="bg-white rounded-md flex justify-between items-center p-3 border">
      <input
        onChange={toggleState}
        type="checkbox"
        name="complete"
        id="complete"
        className="mr-3"
        defaultChecked={isCompleted}
      />
      <p className="font-semibold flex-1">{task}</p>
      <div className="flex-1 flex items-center gap-3">
        <div
          className={`size-3 rounded-full 
          ${priority === "high" ? "bg-red-500 " : ""}
          ${priority === "medium" ? "bg-yellow-500" : ""}
          ${priority === "low" ? "bg-green-500" : ""}
          `}
        ></div>
        <p>{priority || "high"}</p>
      </div>
      <div className="flex-1">
        {isCompleted ? (
          <p className="text-green-500">Done</p>
        ) : (
          <p className="text-red-500">Pending</p>
        )}
      </div>
      <p className="flex-[2]">{description}</p>
      <div className="space-x-5">
        <DeleteAlert _id={_id}></DeleteAlert>
        <TodoUpdateModal _id={_id}></TodoUpdateModal>
      </div>
    </div>
  );
};

export default TodoCard;
