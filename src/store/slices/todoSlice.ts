import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from "../../myFn/localStorageFn";

export interface ITodo {
    id: number,
    text: string,
    completed: boolean,
    isDeleted: boolean,
}

interface ITodoState {
    todos: ITodo[],
}

const example: ITodo[] = [
    { id: 1, text: 'qq', completed: false, isDeleted: false },
    { id: 2, text: 'privet', completed: true, isDeleted: false },
    { id: 3, text: 'zdorova', completed: true, isDeleted: true },
]

const initialState: ITodoState = {
    todos: getFromLocalStorage('TODOS') || example
}

const forSaveTodos = (todos: ITodo[]): ITodo[] => {
    return todos.filter(item => !item.isDeleted)
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo: ITodo = {
                id: Date.now(),
                text: action.payload,
                completed: false,
                isDeleted: false
            }
            state.todos.push(newTodo)

            const forSave = forSaveTodos(state.todos)
            saveToLocalStorage('TODOS', state.todos)
        },
        removeTodo: (state, action: PayloadAction<number>) => {
            const newState = state.todos.map(item => {
                if (item.id === action.payload) {
                    return { ...item, isDeleted: !item.isDeleted }
                }
                return item
            })
            state.todos = newState
            const forSave = forSaveTodos(state.todos)
            saveToLocalStorage('TODOS', forSave)
        },
        removeAllTodos: (state) => {
            const newState = state.todos.map(item => ({ ...item, isDeleted: true }))
            state.todos = newState
            removeFromLocalStorage('TODOS')
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
            let item = state.todos.find(item => item.id === action.payload)
            if (item) {
                item.completed = !item.completed
                const forSave = forSaveTodos(state.todos)
                saveToLocalStorage('TODOS', forSave)
            }
        }
    }
})

const todoActions = todoSlice.actions

export { todoActions }
export default todoSlice.reducer

