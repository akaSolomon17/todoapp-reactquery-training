import { useQuery } from "@tanstack/react-query"
import http from "../utils/http"

export const getAllTodo = () => http.get('todoList') // get all record to calc totalPage for pagination
     
     // Get the final ID of TODO
export const useGetAllTodo = ()=>{
    const {data: todoAll, ...options} = useQuery({
        queryKey: ["todoList"],
        queryFn: () => getAllTodo(),
    })
    return {todoAll,...options}
}