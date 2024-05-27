import React from "react"
import { useRoutes } from "react-router-dom"
import Header from "./components/Header/Header"
import "./App.css"
import TodoList from "./pages/TodoList"
import AdsPopup from "./pages/AdsPopup"

/* Nợ:
* getValues & watch khác gì
* Tìm hiểu lại isFetching, isLoading...
* Thêm reducer => đổi qua zustand bỏ reducer và context ✅ 
* Sửa isClose-setIsClose hạn chế để tên phủ định ✅
* Query api một cách có điều kiện => hạn chế re-fetching api ✅
* Validate user profile ✅
* refactor apis name: vì json-server không cấu trúc theo BE bình thường nên không thể refactor. ✅
*/

function App() {
  const elements = useRoutes([
    {
      path: '/todo',
      element: <TodoList />
    }
  ])

  return (
    <>
      <div className="z-0 container-md flex items-center justify-center mx-auto h-[100vh] bg-gradient-to-tr from-[#fffd80] to-[#9189fc] ">
        <React.Suspense fallback="Loading...">
          <Header>
            {elements}
          </Header>
          <AdsPopup />
        </React.Suspense>
      </div>
    </>
  )
}

export default App
