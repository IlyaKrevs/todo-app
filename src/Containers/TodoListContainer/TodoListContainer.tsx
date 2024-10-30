import React, { useCallback } from 'react'
import classes from './TodoListContainer.module.scss'
import { TodoItem } from '../../Components/TodoItem/TodoItem'
import { useAppDispatch, useAppSelector } from '../../store/reduxHooks'
import { ITodo, todoActions } from '../../store/slices/todoSlice'
import { useInputHook } from '../../myFn/useInputHook'
import { RadioGroup } from '../../Components/RadioGroup/RadioGroup'

import type { IOption } from '../../Components/RadioGroup/RadioGroup'

interface IProps {

}

type filterBy = 'all' | 'inProgress' | 'done' | 'deleted'



export const TodoListContainer: React.FC<IProps> = ({ }) => {

    const [filterBy, setFilterBy] = useInputHook<filterBy>('all')

    const dispatch = useAppDispatch()
    const todoItems = useAppSelector(state => state.todoReduser.todos)

    const onToggleHandler = useCallback((id: number) => {
        dispatch(todoActions.toggleTodo(id))
    }, [])

    const onDeleteHandler = useCallback((id: number) => {
        dispatch(todoActions.removeTodo(id))
    }, [])

    const allItems = todoItems
    const doneItems = todoItems.filter(item => item.completed && !item.isDeleted)
    const inProgress = todoItems.filter(item => !item.completed && !item.isDeleted)
    const deletedItems = todoItems.filter(item => item.isDeleted)

    let myOptions: IOption[] = [
        { labelText: 'ShowAll', value: 'all' },
        { labelText: 'Completed', value: 'done' },
        { labelText: 'In progress', value: 'inProgress' },
        { labelText: 'Trash', value: 'deleted' },
    ]


    let showItems: ITodo[] = []
    if (filterBy === 'all') {
        showItems = allItems
    } else if (filterBy === 'done') {
        showItems = doneItems
    } else if (filterBy === 'inProgress') {
        showItems = inProgress
    } else if (filterBy === 'deleted') {
        showItems = deletedItems
    }

    myOptions = myOptions.map(item => {
        if (item.value === 'all') {
            return { ...item, labelText: item.labelText + ` (${allItems.length})` }
        } else if (item.value === 'done') {
            return { ...item, labelText: item.labelText + ` (${doneItems.length})` }
        } else if (item.value === 'inProgress') {
            return { ...item, labelText: item.labelText + ` (${inProgress.length})` }
        } else if (item.value === 'deleted') {
            return { ...item, labelText: item.labelText + ` (${deletedItems.length})` }
        }
        return item
    })

    return (
        <ul className={classes.container}>
            <RadioGroup options={myOptions} name='tabs' value={filterBy} callback={setFilterBy} />
            {showItems.map((item, i) => {
                return <TodoItem
                    key={i}
                    todo={item}
                    onToggle={onToggleHandler}
                    onDelete={onDeleteHandler} />
            })}
        </ul>
    )
}




