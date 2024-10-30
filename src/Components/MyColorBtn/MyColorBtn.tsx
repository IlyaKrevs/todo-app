import React from 'react'
import classes from './MyColorBtn.module.scss'

interface IProps {
    text: string,
    callback?: () => void,
    color: ColoursStyle
}

type ColoursStyle = 'red' | 'green' | 'blue'

const coloursObj: { [key in ColoursStyle]: string } = {
    red: classes.redColor,
    green: classes.greenColor,
    blue: classes.blueColor,
}

export const MyColorBtn: React.FC<IProps> = ({ text, callback, color }) => {

    const stylesArr = [classes.container]

    stylesArr.push(coloursObj[color])

    return (
        <button className={stylesArr.join(' ')} onClick={callback}>
            {text}
        </button>
    )
}



