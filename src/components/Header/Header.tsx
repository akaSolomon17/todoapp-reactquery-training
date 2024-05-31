import { CiSquarePlus } from "react-icons/ci";
import { Todo } from "../../types/todo.type";
import { useState } from "react";
import { useGetAllTodo } from "../../apis/getAllTodo.api";
import { useAddTodo } from "../../apis/addTodo.api";
import { useGlobalActions, useTodoCount } from "../../zustand/store";

interface IChildren {
    children?: React.ReactNode
}

const Header = ({ children }: IChildren) => {

    // Define react-query APIs {data || ...options}
    const { data: todoAll } = useGetAllTodo()
    const todoAllData = todoAll?.data || []
    const { mutate: addTodoMutate } = useAddTodo()

    // Define Zustand global actions
    const actions = useGlobalActions()
    const todoCount = useTodoCount()

    // Define useState
    const [description, setDescription] = useState<string>("")

    // Handle submit
    const handleSubmitAddTodo = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (description.trim() === "") return;

        const lastTodoId = todoAllData?.length > 0 ? todoAllData[todoAllData.length - 1]?.id : 0;

        const newTodo: Todo = {
            id: (Number(lastTodoId) + 1).toString(),
            description,
            done_flag: false,
        }

        addTodoMutate(newTodo, {
            onSuccess: () => {
                setDescription("")
                actions.setTodoCount(todoCount + 1)
            }
        })
    }

    return (
        <>
            <div className='z-10 flex-col w-1/3 h-fit rounded-lg bg-white/70 backdrop-blur-[1px] p-9'>
                <div className="title text-3xl font-bold ">Todo App</div>
                <div className="flex flex-col mt-[18px]">
                    <div className="flex items-center">
                        <input
                            type="text"
                            name="add-todo"
                            placeholder='Add your new Todo'
                            className="w-11/12 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-grey-600 sm:text-sm sm:leading-6"
                            data-testid="header-input"
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                        />
                        <button onClick={handleSubmitAddTodo} >
                            <CiSquarePlus className='size-12 text-sky-500 hover:text-sky-300 ' />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Header
