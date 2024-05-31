import React from "react"
import { useRoutes } from "react-router-dom"
import Header from "./components/Header/Header"
import "./App.css"
import TodoList from "./pages/TodoList"
import AdsPopup from "./pages/AdsPopup"

/* Nợ:
* Tìm hiểu lại Set({ isPopup }) - Get
* Fix cancel image
* page todo
* editing trim()
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
