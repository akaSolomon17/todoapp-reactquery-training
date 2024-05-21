import { CiSquarePlus } from "react-icons/ci";
import { MdEdit, MdDelete } from "react-icons/md";
const Layout = () => {
    return (
        <>
            <div className='z-10 flex-col w-1/3 h-4/6 rounded-lg bg-white/70 backdrop-blur-[1px] p-9'>
                <div className="title text-3xl font-bold ">Todo App</div>
                <div className="flex flex-col mt-[18px]">
                    <div className="flex items-center">
                        <input type="text" name="add-todo" placeholder='Add your new Todo' className="w-11/12  rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-grey-600 sm:text-sm sm:leading-6" />
                        <button>
                            <CiSquarePlus className='size-12 text-sky-500' />
                        </button>
                    </div>
                    <table className='flex flex-col w-[98.5%] mt-[18px]'>
                        <tr className="flex">
                            <th className='flex space-x-3 justify-end items-center'>
                                <input type="checkbox" />
                                <div className="font-medium line-through text-opacity-50">Todo1</div>
                            </th>
                            <div className="flex btn-wrapper w-full justify-end items-center">
                                <button className="flex edit-btn rounded-[3px] size-6 justify-center items-center bg-[#ff984c] me-2"><MdEdit /></button>
                                <button className="flex delete-btn rounded-[3px] size-6 justify-center items-center bg-[#ff4c4c]"><MdDelete /></button>
                            </div>
                        </tr>
                        <tr className="flex mt-3">
                            <th className='flex space-x-3 justify-end items-center'>
                                <input type="checkbox" />
                                <div className="font-medium">Todo2</div>
                            </th>
                            <div className="flex btn-wrapper w-full justify-end items-center">
                                <button className="flex edit-btn rounded-[3px] size-6 justify-center items-center bg-[#ff984c] me-2"><MdEdit /></button>
                                <button className="flex delete-btn rounded-[3px] size-6 justify-center items-center bg-[#ff4c4c]"><MdDelete /></button>
                            </div>
                        </tr>
                    </table>
                    <div className="flex w-[99%] text-[12px] items-center place-content-between mt-3">
                        <div className="basis-1/2">You have 2 pending tasks</div>
                        <button className="flex w-[3.5rem] h-[1.5rem] text-white size-15 bg-[#0EA5E9] rounded-sm justify-center items-center">Clear all</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout
