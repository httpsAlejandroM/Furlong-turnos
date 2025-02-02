import { useState } from "react"


function useForm<T>(initialForm: T ) {

    const [formState, setFormState] = useState(initialForm)

    const onInputChange = ({ target }:  React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target
        setFormState({
            ...formState,
            [name]: value
        })        
    }

    return {
        ...formState,
        onInputChange
    }
}
export default useForm