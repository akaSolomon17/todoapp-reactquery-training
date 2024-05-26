/*
* 1. Làm todo app, list todo gọi api về
* 2. Create/edit/delete thực hiện bằng api
* 3. Mỗi 3 todo được tạo, gọi api ads ( random ads trả về ) và show lên popup
*/

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient() // Create a new client

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <App />
    </QueryClientProvider>
  </Router>
)
