import React from 'react'
import classes from './AddFormContainer.module.scss'
import { MyInput } from '../../Components/MyInput/MyInput'
import { MyColorBtn } from '../../Components/MyColorBtn/MyColorBtn'
import { useInputHook } from '../../myFn/useInputHook'

import { useAppDispatch, useAppSelector } from '../../store/reduxHooks'
import { todoActions } from '../../store/slices/todoSlice'
interface IProps {

}

export const AddFormContainer: React.FC<IProps> = ({ }) => {

    const [textNewTodo, handler, resetFn] = useInputHook('')

    const dispatch = useAppDispatch()


    function onAddHandler() {
        if (textNewTodo.length === 0) {
            return
        }

        dispatch(todoActions.addTodo(textNewTodo))
        resetFn()
    }

    function onRemoveAllList() {
        dispatch(todoActions.removeAllTodos())
    }


    return (
        <div className={classes.mainContainer}>
            <MyInput value={textNewTodo} callback={handler} placeholder='Write here...' />
            <MyColorBtn text='Add todo' color='green' callback={onAddHandler} />
            <MyColorBtn text='Remove all list' color='red' callback={onRemoveAllList} />
        </div>
    )
}


