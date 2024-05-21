import { CiSquarePlus } from "react-icons/ci";
import TodoList from "../../pages/TodoList/TodoList";

// validate input add
// create new Todo 

const Layout = () => {
    return (
        <>
            <div className='z-10 flex-col w-1/3 h-4/6 rounded-lg bg-white/70 backdrop-blur-[1px] p-9'>
                <div className="title text-3xl font-bold ">Todo App</div>
                <div className="flex flex-col mt-[18px]">
                    <div className="flex items-center">
                        <input type="text" name="add-todo" placeholder='Add your new Todo' className="w-11/12  rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-grey-600 sm:text-sm sm:leading-6" />
                        <button>
                            <CiSquarePlus className='size-12 text-sky-500 hover:text-sky-300 ' />
                        </button>
                    </div>
                    <TodoList />
                </div>
            </div>
        </>
    )
}

export default Layout
