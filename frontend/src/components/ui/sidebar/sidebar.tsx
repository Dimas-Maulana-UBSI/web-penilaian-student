import type React from "react";
type sidebarProps = {
    link : {
        path : string;
        label : string;
    }[]

}
const Sidebar:React.FC<sidebarProps> = ({link}) => {
    return (
        <>  
            <div className="w-[200px] bg-gray-800">
                {link.map(l => (
                    <a href={l.path}  className="block p-2 rounded hover:bg-gray-700 text-white flex justify-center">{l.label}</a>
                ))}
            </div>
        </>
    )
}

export default Sidebar;