import React, { useCallback, useState } from "react";


type event = React.ChangeEvent<HTMLInputElement>
type handler = (e: event) => void
type resetFn = () => void

type returnValue<K> = [K, handler, resetFn]


export const useInputHook = <T extends string>(baseValue: T): returnValue<T> => {

    const [value, setValue] = useState<T>(baseValue)


    const handlerOnchange = useCallback((e: event) => {
        setValue(e.target.value as T)
    }, [])

    const reset = useCallback(() => {
        setValue('' as T)
    }, [])

    return [value, handlerOnchange, reset]
}

