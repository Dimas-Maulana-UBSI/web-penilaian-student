import type React from "react";
import { GitBranch, Users, TrendingUp, BarChart3 } from 'lucide-react';

type SidebarProps = {
    link: {
        path: string;
        label: string;
        icon?: React.ReactNode;
    }[]
}

const Sidebar: React.FC<SidebarProps> = ({ link }) => {
    return (
        <div className="sidebar w-64 bg-slate-900 text-white shadow-xl min-h-screen">
            {/* Header */}
            <div className="header p-6 border-b border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-1">Dashboard</h2>
                <p className="text-slate-400 text-sm">Mentor Portal</p>
            </div>

            {/* Navigation Links */}
            <nav className="p-4">
                {link.map((l, index) => (
                    <a 
                        key={index}
                        href={l.path}  
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 mb-2 group"
                    >
                        {l.icon && (
                            <span className="group-hover:scale-110 transition-transform">
                                {l.icon}
                            </span>
                        )}
                        <span className="font-medium">{l.label}</span>
                    </a>
                ))}
            </nav>
        </div>
    )
}

export default Sidebar;