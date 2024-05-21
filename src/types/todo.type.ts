export interface Todo {
    "id": number,
    "description": string,
    "done_flag": boolean,
    "delete_flag": boolean
}

export type Todos = Pick<Todo,'id'|'description'>[]