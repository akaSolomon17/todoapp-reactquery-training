import { Todo, TodoRepsonse, TodoUpdate } from '../types/todo.type'
import http from '../utils/http'

export const getTodoList = (page:number | string, limit: number|string) => 
  http.get<TodoRepsonse>('todoList',{
    params:{
        _page: page,
        _per_page: limit
    }
  })

export const getAllTodoList = () => 
  http.get('todoList')

// export const getTodo = (id: number | string) => http.get<Todo>(`todoList/${id}`)

export const addTodo = (todo: Todo) => http.post<Todo>('/todoList', todo)

export const updateTodo = (id: number | string, todo: TodoUpdate) => http.put<TodoUpdate>(`todoList/${id}`, todo)

export const deleteTodo = (id:number|string) => http.delete<Pick<Todo,'id'>>(`todoList/${id}`)