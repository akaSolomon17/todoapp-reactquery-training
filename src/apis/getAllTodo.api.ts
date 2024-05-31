import { useQuery } from "@tanstack/react-query"
import http from "../utils/http"

export const getAllTodo = () => http.get('todoList') // get all record to calc totalPage for pagination
     
// Get all Todo
export const useGetAllTodo = ()=>{
    return useQuery({
        queryKey: ["todoList"],
        queryFn: () => getAllTodo(),
    })
}