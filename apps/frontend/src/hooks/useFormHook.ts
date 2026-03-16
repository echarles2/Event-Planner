import { useState } from "react";

export function useFormInput(){
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    function onChange(e: any){
        setValue(e.target.value);
        setError("");
    }

    function validate(validation: (value: string) => string | null): boolean{
        const message = validation(value);
        if (message){
            setError(message);
            return false;
        }
        return true;
    }
    return {
        value,
        onChange, 
        validate, 
        setValue,
        setError,
        error
    }
}