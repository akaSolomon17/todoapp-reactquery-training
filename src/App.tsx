import React, { useState } from "react"
import { useRoutes } from "react-router-dom"
import Layout from "./components/layouts/Layout"
import "./App.css"
import TodoList from "./pages/TodoList/TodoList"
import AdsPopup from "./pages/AdsPopup/AdsPopup"
function App() {
  const [showAdsPopup, setShowAdsPopup] = useState<boolean>(false);

  const elements = useRoutes([
    {
      path: '/todo',
      element: <TodoList />
    },
    // {
    //   path: '/todo/add',
    //   element: <EditTodo />
    // }
  ])

  return (
    <>
      <div className="z-0 container-md flex items-center justify-center mx-auto h-[100vh] bg-gradient-to-tr from-[#fffd80] to-[#9189fc] ">
        <React.Suspense fallback="Loading...">
          <Layout showAdsPopup={showAdsPopup} setShowAdsPopup={setShowAdsPopup}>{elements}</Layout>
          {showAdsPopup && <AdsPopup setShowAdsPopup={setShowAdsPopup} />}
        </React.Suspense>
      </div>
    </>
  )
}

export default App
