import { MdEdit, MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useQueryString } from "../../utils/utils";
import { useState } from "react";
import { getTodoList, updateTodo, deleteTodo } from "../../apis/getTodoList.api";
import { Todo, TodoUpdate } from "../../types/todo.type";

const LIMIT = 7;

const TodoList = () => {
    const [todoIdEditing, setTodoIdEditing] = useState<string | number | null>(null);
    const [newTodo, setNewTodo] = useState<TodoUpdate>({ description: "", done_flag: false });
    const queryClient = useQueryClient();

    // Get value from search params
    const queryString: { page?: string } = useQueryString();
    const page = Number(queryString.page) || 1;

    // GET TODO LIST AND PAGINATION
    const { data, isLoading } = useQuery({
        queryKey: ["todoList", page],
        queryFn: () => getTodoList(page, LIMIT)
    });
    // Get all key in data.data
    const { prev, next, items: totalRecords, pages: totalPages, data: todosData } = data?.data || {};

    // UPDATE TODO
    const updateTodoMutate = useMutation({
        mutationFn: ({ id, todo }: { id: string | number, todo: TodoUpdate }) => updateTodo(id, todo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todoList'] });
            setTodoIdEditing(null);
        }
    });

    // DELELE TODO
    const deleteTodoMutate = useMutation({
        mutationFn: (id: number | string) => deleteTodo(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todoList'] });
        }
    })

    const handleEditingTodo = (todo: Todo) => {
        setTodoIdEditing(todo.id);
        setNewTodo({
            description: todo.description,
            done_flag: todo.done_flag
        });
    };

    const handleEditSubmit = (e: React.FormEvent, id: string | number) => {
        e.preventDefault();

        // Get current todo value
        const currentTodoValue = todosData?.find((todo: Todo) => todo.id === id);

        // Compare current value with newValue to avoid call API
        currentTodoValue &&
            currentTodoValue?.description !== newTodo.description ||
            currentTodoValue?.done_flag !== newTodo.done_flag
            ?
            (
                updateTodoMutate.mutate({ id, todo: newTodo })
            ) : (
                setTodoIdEditing(null) // Set id to null not to call API
            )

    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, todo: Todo) => {
        const updatedTodo = { ...todo, done_flag: e.target.checked };
        updateTodoMutate.mutate({ id: todo.id, todo: updatedTodo });
    };

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string | number) => {
        e.preventDefault();
        deleteTodoMutate.mutate(id);
    }

    return (
        <>
            <table className='flex flex-col w-[98.5%] mt-[18px]'>
                <tbody>
                    {isLoading && (<tr><th>Loading...</th></tr>)}
                    {!isLoading && todosData?.map((todo: Todo) =>
                        <tr key={todo.id} className="flex mt-2 items-center">
                            <th className='flex space-x-3 w-full cursor-pointer'>
                                {todoIdEditing === todo.id ? (
                                    <>
                                        <input type="checkbox" className="cursor-pointer" checked={todo.done_flag} onChange={(e) => { handleCheckboxChange(e, todo) }} readOnly />
                                        <input
                                            type="text"
                                            name="todo-edit"
                                            placeholder='Update your Todo'
                                            className="w-11/12 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                            value={newTodo.description}
                                            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <input type="checkbox" className="cursor-pointer" checked={todo.done_flag} onChange={(e) => { handleCheckboxChange(e, todo) }} readOnly />
                                        {todo.done_flag == true ? (<p className="line-through font-medium ">{todo.description}</p>) : (<p className="font-medium">{todo.description}</p>)}
                                    </>
                                )}
                            </th>
                            <th className="flex btn-wrapper">
                                {todoIdEditing === todo.id ? (
                                    <button
                                        className="flex edit-btn rounded-[3px] size-6 justify-center items-center bg-[#45e92f] me-2 hover:bg-[#8dff89]"
                                        onClick={(e) => handleEditSubmit(e, todo.id)}
                                    >
                                        <FaCheck />
                                    </button>
                                ) : (
                                    <button
                                        className="flex edit-btn rounded-[3px] size-6 justify-center items-center bg-[#ff984c] me-2 hover:bg-[#ffb179]"
                                        onClick={() => handleEditingTodo(todo)}
                                    >
                                        <MdEdit />
                                    </button>
                                )}
                                <button
                                    className="flex delete-btn rounded-[3px] size-6 justify-center items-center bg-[#ff4c4c] hover:bg-[#ff8181]"
                                    onClick={(e) => handleDelete(e, todo.id)}
                                >
                                    <MdDelete />
                                </button>
                            </th>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="flex w-[99%] text-[12px] items-center place-content-between mt-3">
                <div className="basis-1/2">You have {totalRecords || 0} pending tasks!</div>
                <button className="flex w-[3.5rem] h-[1.5rem] text-white size-15 bg-[#0EA5E9] hover:bg-[#7ad5ff] rounded-sm justify-center items-center">Clear all</button>
            </div>
            <div className="pagination-wrapper flex justify-center mt-3">
                <nav aria-label='Page navigation example'>
                    <ul className='inline-flex -space-x-px'>
                        {prev === null ? (
                            <li>
                                <span
                                    className='rounded-l-lg border cursor-pointer select-none border-gray-300 bg-white px-1 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 text-sm'
                                >
                                    ⇐
                                </span>
                            </li>
                        ) : (
                            <li>
                                <Link
                                    className='rounded-l-lg border border-gray-300 bg-white px-1 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 text-sm'
                                    to={`/todo?page=${prev}`}
                                >
                                    ⇐
                                </Link>
                            </li>
                        )}
                        {Array(totalPages).fill(0).map((_, index) => {
                            const pageNumber = index + 1;
                            return (
                                <li key={pageNumber}>
                                    <Link
                                        className='border border-gray-300 px-2 leading-tight hover:bg-gray-100 hover:text-gray-700 active:text-gray-700 text-sm'
                                        to={`/todo?page=${pageNumber}`}
                                    >
                                        {pageNumber}
                                    </Link>
                                </li>
                            );
                        })}
                        {next === null ? (
                            <li>
                                <span
                                    className='rounded-r-lg border cursor-pointer border-gray-300 bg-white px-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 text-sm'
                                >
                                    ⇒
                                </span>
                            </li>
                        ) : (
                            <li>
                                <Link
                                    className='rounded-r-lg border border-gray-300 bg-white px-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 text-sm'
                                    to={`/todo?page=${next}`}
                                >
                                    ⇒
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default TodoList;
