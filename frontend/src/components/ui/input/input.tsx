import React from "react";

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    type? : string;
    name? : string;
    id? : string;
}

const Input : React.FC<inputProps> = ({type,name,id,className,...props}) => {
    return (
        <div>
            <input type={type} name={name} id={id} className={className} {...props}/>
        </div>
    )
}

export default Input;