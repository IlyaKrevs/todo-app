import React from 'react'
import classes from './TodosPage.module.scss'
import { AddFormContainer } from '../../Containers/AddFormContainer/AddFormContainer'
import { TodoListContainer } from '../../Containers/TodoListContainer/TodoListContainer'

export const TodosPage = () => {
    return (
        <div className={classes.mainContainer}>
            <AddFormContainer />
            <TodoListContainer />
        </div>
    )
}
