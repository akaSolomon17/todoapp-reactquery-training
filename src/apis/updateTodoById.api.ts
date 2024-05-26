import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoUpdate } from "../types/todo.type";
import http from "../utils/http";


export const updateTodoById = (id: number | string, todo: TodoUpdate) => http.put<TodoUpdate>(`todoList/${id}`, todo)

export const useUpdateTodoById = () =>{
    const queryClient = useQueryClient();

    // UPDATE TODO
    const {data: todoUpdated, ...options} = useMutation({
        mutationFn: ({ id, todo }: { id: string | number, todo: TodoUpdate }) => updateTodoById(id, todo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todoList'] });
        }
    });
    return {todoUpdated, ...options}
}