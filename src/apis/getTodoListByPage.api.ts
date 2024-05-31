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

// GET Todo list by page
export const useGetTodoListByPage = () => {
  // Get TodoList from search params
  const queryString: { page?: string } = useQueryString();
  const page = Number(queryString.page) || 1;

  return useQuery({
    queryKey: ["todoList", page],
    queryFn: () => getTodoListByPage(page, LIMIT),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}





