import React from 'react'
import classes from './MyInput.module.scss'

interface IProps {
    placeholder: string,
    value: string,
    callback: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const MyInput: React.FC<IProps> = ({ placeholder, value, callback }) => {
    return (
        <input
            className={classes.container}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={callback}
        />
    )
}


