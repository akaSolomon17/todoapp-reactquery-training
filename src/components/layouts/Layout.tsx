import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CiSquarePlus } from "react-icons/ci";
import { addTodo, getAllTodoList } from "../../apis/getTodoList.api";
import { Todo } from "../../types/todo.type";
import { useEffect, useState } from "react";

interface IChildren {
    children?: React.ReactNode
    showAdsPopup: boolean;
    setShowAdsPopup: (showAdsPopup: boolean) => void;
}

const Layout = ({ children, setShowAdsPopup }: IChildren) => {
    const [description, setDescription] = useState<string>("")
    const [todoCount, setTodoCount] = useState<number>(0); // Biến state để đếm số lượng todo đã tạo
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: (body: Todo) => {
            return addTodo(body)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todoList'] })
            setDescription("")
            setTodoCount((count) => count + 1)
        }
    })
    // Get the final ID of TODO
    const { data: todoList } = useQuery({
        queryKey: ["todoList"],
        queryFn: () => getAllTodoList(),
    })

    const handleSubmitAddTodo = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (description.trim() === "") return;

        const lastTodoId = todoList?.data.length > 0 ? todoList?.data[todoList.data.length - 1].id : 0;

        const newTodo: Todo = {
            id: (Number(lastTodoId) + 1).toString(),
            description,
            done_flag: false,
        }
        mutate(newTodo)
    }

    useEffect(() => {
        if (todoCount > 0 && todoCount % 3 === 0) {
            setShowAdsPopup(true)
        }
    }, [todoCount, setShowAdsPopup]);

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
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                        />
                        <button onClick={handleSubmitAddTodo}>
                            <CiSquarePlus className='size-12 text-sky-500 hover:text-sky-300 ' />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout
