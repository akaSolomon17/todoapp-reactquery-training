import React from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/layouts/Layout"
import "./App.css"
function App() {

  return (
    <>
      <div className="z-0 container-md flex items-center justify-center mx-auto h-[100vh] bg-gradient-to-tr from-[#fffd80] to-[#9189fc] ">
        <React.Suspense fallback="Loading...">
          <Routes>
            <Route path="/todo" element={<Layout />} />
          </Routes>
        </React.Suspense>
      </div>
    </>
  )
}

export default App
