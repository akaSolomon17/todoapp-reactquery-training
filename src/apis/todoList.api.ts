import { Todos } from '../types/todo.type'
import http from '../utils/http'

export const getTodoList = (page:number | string, limit: number | string) => 
  http.get<Todos>('todoList',{
    params:{
        _page: page,
        _limit: limit
    }
  })