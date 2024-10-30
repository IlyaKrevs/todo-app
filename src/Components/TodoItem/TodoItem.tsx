import React, { memo } from 'react'
import classes from './TodoItem.module.scss'

import type { ITodo } from '../../store/slices/todoSlice'
import { MyColorBtn } from '../MyColorBtn/MyColorBtn'

interface IProps {
    todo: ITodo,
    onToggle: (id: number) => void,
    onDelete: (id: number) => void
}

export const TodoItem: React.FC<IProps> = memo(({ todo, onToggle, onDelete }) => {


    return (
        <li className={[classes.conatiner, todo.isDeleted && classes.isDeleted, todo.completed && classes.completeStyle].join(' ')}>
            <p className={[classes.innerText].join(' ')}>
                {todo.text}
            </p>
            <div className={classes.btnsContainer}>
                <MyColorBtn text='toggle' color='blue' callback={() => onToggle(todo.id)} />
                <MyColorBtn text='delete' color='red' callback={() => onDelete(todo.id)} />
            </div>
        </li>
    )
})


