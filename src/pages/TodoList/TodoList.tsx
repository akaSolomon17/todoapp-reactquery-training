// import { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

import { getTodoList } from "../../apis/todoList.api";
import { useQueryString } from "../../utils/utils";

const LIMIT = 7

const TodoList = () => {

    const queryString: { page?: string } = useQueryString()
    const page = Number(queryString.page) || 1

    const { data, isLoading } = useQuery({
        queryKey: ["todoList", page], // được sử dụng deep comparison(truy cập sâu để so sánh key tương ứng) example: page
        queryFn: () => getTodoList(page, LIMIT)
    })

    // const totalTodosCount = Number(data?.data?.length || 0) //sai
    const totalPage = Math.ceil(14 / LIMIT)

    return (
        <>
            <table className='flex flex-col w-[98.5%] mt-[18px]'>
                <tbody>
                    {isLoading && (<tr><th>Loading...</th></tr>)}
                    {!isLoading && data?.data.map((todo) =>
                        <tr key={todo.id} className="flex mt-2">
                            <th className='flex space-x-3 w-full items-center cursor-pointer'>
                                <input type="checkbox" className="cursor-pointer" />
                                <p className="font-medium">{todo.description}</p>
                            </th>
                            <th className="flex btn-wrapper">
                                <button className="flex edit-btn rounded-[3px] size-6 justify-center items-center bg-[#ff984c] me-2 hover:bg-[#ffb179] "><MdEdit /></button>
                                <button className="flex delete-btn rounded-[3px] size-6 justify-center items-center bg-[#ff4c4c] hover:bg-[#ff8181]"><MdDelete /></button>
                            </th>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="flex w-[99%] text-[12px] items-center place-content-between mt-3">
                <div className="basis-1/2">You have {data?.data.length} pending tasks!</div>
                <button className="flex w-[3.5rem] h-[1.5rem] text-white size-15 bg-[#0EA5E9] hover:bg-[#7ad5ff]  rounded-sm justify-center items-center">Clear all</button>
            </div>
            <div className="pagination-wrapper flex justify-center mt-3">
                <nav aria-label='Page navigation example'>
                    <ul className='inline-flex -space-x-px'>
                        {
                            page === 1 ? (
                                <li>
                                    <span
                                        className='rounded-l-lg border border-gray-300 bg-white px-1 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 text-sm'
                                    >
                                        ⇐
                                    </span>
                                </li>
                            ) : (
                                <li>
                                    <Link
                                        className='rounded-l-lg border border-gray-300 bg-white px-1 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 text-sm'
                                        to={`/todo?page=${page - 1}`}
                                    >
                                        ⇐
                                    </Link>
                                </li>
                            )
                        }
                        {Array(totalPage)
                            .fill(0)
                            .map((_, index) => {
                                const pageNumber = index + 1;
                                return (
                                    <li key={pageNumber}>
                                        <Link
                                            className=
                                            'border border-gray-300 px-2 leading-tight hover:bg-gray-100 hover:text-gray-700 text-sm'
                                            to={`/todo?page=${pageNumber}`}
                                        >
                                            {pageNumber}
                                        </Link>
                                    </li>
                                )
                            })
                        }

                        {
                            page === totalPage ? (
                                <li>
                                    <span
                                        className='rounded-r-lg border border-gray-300 bg-white px-1  text-gray-500 hover:bg-gray-100 hover:text-gray-700 text-sm'
                                    >
                                        ⇒
                                    </span>
                                </li>
                            ) : (
                                <li>
                                    <Link
                                        className='rounded-r-lg border border-gray-300 bg-white px-1  text-gray-500 hover:bg-gray-100 hover:text-gray-700 text-sm'
                                        to={`/todo?page=${page + 1}`}
                                    >
                                        ⇒
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </nav>
            </div >
        </>
    )
}

export default TodoList