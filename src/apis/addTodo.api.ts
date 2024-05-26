import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Todo } from "../types/todo.type"
import http from "../utils/http";

export const addTodo = (todo: Todo) => http.post<Todo>('/todoList', todo)


export const useAddTodo = () =>{
    const queryClient = useQueryClient();

    const { data:todoAdded, ...options } = useMutation({
        mutationFn: (body: Todo) => {
            return addTodo(body)
        },
        // If success then use invalidateQueries to update todoList
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todoList'] })
        }
    })
    return {todoAdded, ...options}
}