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

type ShowObject = {
    showItems: ITodo[],
    count: {
        all: number,
        done: number,
        inProgress: number,
        deleted: number
    }
}

let myOptions: IOption[] = [
    { labelText: 'ShowAll', value: 'all' },
    { labelText: 'Completed', value: 'done' },
    { labelText: 'In progress', value: 'inProgress' },
    { labelText: 'Trash', value: 'deleted' },
]

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



    let showObj = todoItems.reduce<ShowObject>((acc, next) => {
        let done = next.completed && !next.isDeleted
        let inProgress = !next.completed && !next.isDeleted
        let isDeleted = next.isDeleted

        acc.count.all += 1

        filterBy === 'all' && acc.showItems.push(next)
        if (done) {
            acc.count.done += 1
            filterBy === 'done' && acc.showItems.push(next)
        } else if (inProgress) {
            acc.count.inProgress += 1
            filterBy === 'inProgress' && acc.showItems.push(next)
        } else if (isDeleted) {
            acc.count.deleted += 1
            filterBy === 'deleted' && acc.showItems.push(next)
        }

        return acc
    }, {
        showItems: [],
        count: {
            all: 0,
            done: 0,
            inProgress: 0,
            deleted: 0
        }
    })



    return (
        <ul className={classes.container}>
            <RadioGroup
                options={myOptions}
                name='tabs'
                value={filterBy}
                callback={setFilterBy}
                counter={showObj.count}
            />

            {showObj.showItems.map((item, i) => {
                return <TodoItem
                    key={i}
                    todo={item}
                    onToggle={onToggleHandler}
                    onDelete={onDeleteHandler} />
            })}
        </ul>
    )
}
