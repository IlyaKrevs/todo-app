import React from 'react'
import classes from './RadioGroup.module.scss'

interface IProps {
    value: string,
    callback: (e: React.ChangeEvent<HTMLInputElement>) => void,
    options: IOption[],
    name: string
}

export interface IOption {
    labelText: string,
    value: 'all' | 'inProgress' | 'done' | 'deleted',
}



export const RadioGroup: React.FC<IProps> = ({ value, callback, name, options }) => {
    return (
        <div className={classes.container}>
            {options.map((item) => {

                let isChecked = value === item.value

                return (
                    <label
                        className={[classes.labelStyle, isChecked && classes.checkedStyle].join(' ')}
                        key={'labelKey' + item.labelText}
                    >
                        <input
                            style={{ display: 'none' }}
                            type="radio"
                            name={name}
                            value={item.value}
                            checked={isChecked}
                            onChange={callback}
                        />
                        {item.labelText}
                    </label>
                )
            })}
        </div>
    )
}


