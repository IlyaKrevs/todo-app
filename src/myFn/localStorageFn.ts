import type { ITodo } from "../store/slices/todoSlice"


interface LocalStorageTypes {
    TODOS: ITodo[],
    isLoggin: boolean
}

type LocalStorageKeys = keyof LocalStorageTypes

function saveToLocalStorage<T extends LocalStorageKeys, K extends LocalStorageTypes[T]>(key: T, value: K): void {
    localStorage.setItem(key, JSON.stringify(value))
}

function getFromLocalStorage<T extends LocalStorageKeys, K extends LocalStorageTypes[T]>(key: T): K | null {
    const item = localStorage.getItem(key);
    if (item !== null) {
        return JSON.parse(item)
    } else {
        return null
    }

}

function removeFromLocalStorage<T extends LocalStorageKeys>(key: T): void {
    localStorage.removeItem(key)
}



export { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage }