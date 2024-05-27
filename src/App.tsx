import React from "react"
import { useRoutes } from "react-router-dom"
import Header from "./components/Header/Header"
import "./App.css"
import TodoList from "./pages/TodoList"
import AdsPopup from "./pages/AdsPopup"
import { AppProvider } from "./Context/AppProvider"

/* Nợ:
* Thêm reducer => đổi qua zustand bỏ reducer và context, sửa isClose-setIsClose hạn chế để tên phủ định ✅
* Tìm hiểu lại isFetching, isLoading...
* Query api một cách có điều kiện => hạn chế re-fetching api ✅
* getValues & watch khác gì
* Validate user profile ✅
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
          <AppProvider>
            <Header>
              {elements}
            </Header>
            <AdsPopup />
          </AppProvider>
        </React.Suspense>
      </div>
    </>
  )
}

export default App
