import type React from "react";

type informationCardProps = {
    information : string;
    jumlah : number;
    logo : React.ReactNode;
    className:string;
}

const InformationCard : React.FC<informationCardProps> = ({information,jumlah,logo,className})=>{
    return (
        <>
            <div className={className}>
                <div className="informasi flex flex-col">
                    <p>{information}</p>
                    <p className="text-5xl font-semibold text-yellow-300">{jumlah}</p>
                </div>
                <div className="logo">
                    {logo}
                </div>
            </div>
        </>
    )
}

export default InformationCard;