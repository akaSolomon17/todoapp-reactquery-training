import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "../utils/http";
import { TodoDelete } from "../types/todo.type";

export const deleteTodo = (id:number|string) => http.delete<TodoDelete>(`todoList/${id}`)

// DELELE Todo
export const useDeleteTodoById = () =>{
    const queryClient = useQueryClient();

    const {data: todoDeleted, ...options} = useMutation({
        mutationFn: (id: number | string) => deleteTodo(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todoList'] });
        }
    })
    return {todoDeleted, ...options}
}

