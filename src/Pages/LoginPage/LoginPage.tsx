import React from 'react'
import classes from './LoginPage.module.scss'
import { useInputHook } from '../../myFn/useInputHook'
import { MyInput } from '../../Components/MyInput/MyInput'
import { MyColorBtn } from '../../Components/MyColorBtn/MyColorBtn'

import { saveToLocalStorage } from '../../myFn/localStorageFn'
import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {

    const [user, setUser] = useInputHook<string>('')
    const [password, setPassword] = useInputHook<string>('')

    const navigate = useNavigate()

    function joinHandler(e: React.FormEvent) {
        e.preventDefault()
        if (user === 'admin' && password === 'admin') {
            saveToLocalStorage('isLoggin', true)
            navigate('/')
        }
    }

    return (
        <div className={classes.mainContainer}>
            <form onSubmit={joinHandler}

                className={classes.wrapper}>

                <MyInput placeholder='admin' value={user} callback={setUser} />
                <MyInput placeholder='admin' value={password} callback={setPassword} />
                <MyColorBtn text='JOIN' color='green' />
            </form>
        </div>
    )
}


