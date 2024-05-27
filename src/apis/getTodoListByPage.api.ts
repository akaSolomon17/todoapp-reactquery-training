import { useQuery } from '@tanstack/react-query';
import { TodoRepsonse } from '../types/todo.type'
import http from '../utils/http'
import { useQueryString } from '../utils/utils';

const LIMIT = 7;

export const getTodoListByPage = (page:number | string, limit: number|string) => 
  http.get<TodoRepsonse>('todoList',{
    params:{
      _page: page,
      _per_page: limit
    }
  })

// GET TODO LIST BY PAGE
export const useGetTodoListByPage = () => {
  // Get TodoList from search params
  const queryString: { page?: string } = useQueryString();
  const page = Number(queryString.page) || 1;

  const {data: todoByPage,...options} = useQuery({
    queryKey: ["todoList", page],
    queryFn: () => getTodoListByPage(page, LIMIT),
  });
  
  return {todoByPage , ...options}
}

  



