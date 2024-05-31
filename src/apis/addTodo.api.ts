import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Todo } from "../types/todo.type"
import http from "../utils/http";

export const addTodo = (todo: Todo) => http.post<Todo>('/todoList', todo)

// ADD Todo
export const useAddTodo = () =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: Todo) => {
            return addTodo(body)
        },
        // If success then use invalidateQueries to update todoList
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todoList'] })
        }
    })
}