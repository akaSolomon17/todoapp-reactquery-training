export interface Todo {
    id: number | string,
    description: string,
    done_flag?: boolean,
}

export interface TodoRepsonse{
  first: number,
  prev: number | null,
  next: number | null,
  last: number,
  pages: number,
  items: number,
  data: Todo[]
}

export type TodoUpdate = Pick<Todo,'description' | 'done_flag'>

export type Todos = Pick<Todo,'id'|'description'>[]
