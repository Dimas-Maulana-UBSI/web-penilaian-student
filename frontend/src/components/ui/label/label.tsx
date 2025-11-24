import React from "react";

interface labelProps extends React.HtmlHTMLAttributes<HTMLLabelElement>{
    text? : string;
    id? : string;
    
}

const Label:React.FC<labelProps> = ({text,id,className,...props})=>{
    return (
        <div>
            <label htmlFor={id} className={className} {...props}>{text}</label>
        </div>
    )
}

export default Label;