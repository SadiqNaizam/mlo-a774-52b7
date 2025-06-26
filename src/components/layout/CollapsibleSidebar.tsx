import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { LayoutDashboard, Briefcase, BarChart3, Users, PanelLeftClose, PanelLeftOpen, Layers } from 'lucide-react';

const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/r-f-p-management', label: 'Active RFPs', icon: Briefcase },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/client-management', label: 'Clients', icon: Users },
];

const CollapsibleSidebar: React.FC = () => {
    console.log('CollapsibleSidebar loaded');
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            { "bg-muted text-primary": isActive },
            { "justify-center": isCollapsed }
        );

    return (
        <aside className={cn(
            "hidden border-r bg-muted/40 md:flex flex-col transition-all duration-300 ease-in-out",
            isCollapsed ? "w-20" : "w-64"
        )}>
            <div className="flex h-16 items-center px-4 lg:px-6 border-b">
                 <Link to="/" className="flex items-center gap-2 font-semibold">
                    <Layers className="h-6 w-6" />
                    {!isCollapsed && <span className="transition-opacity duration-300">RFP Dashboard Elite</span>}
                </Link>
            </div>
            <TooltipProvider delayDuration={0}>
                <nav className="flex-1 flex flex-col gap-2 p-2">
                    {navItems.map((item) =>
                        isCollapsed ? (
                            <Tooltip key={item.href}>
                                <TooltipTrigger asChild>
                                    <NavLink to={item.href} className={navLinkClasses}>
                                        <item.icon className="h-5 w-5" />
                                        <span className="sr-only">{item.label}</span>
                                    </NavLink>
                                </TooltipTrigger>
                                <TooltipContent side="right" sideOffset={5}>
                                    {item.label}
                                </TooltipContent>
                            </Tooltip>
                        ) : (
                            <NavLink key={item.href} to={item.href} className={navLinkClasses}>
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </NavLink>
                        )
                    )}
                </nav>
            </TooltipProvider>
            <div className="mt-auto p-2 border-t">
                 <Button onClick={toggleSidebar} variant="ghost" className="w-full justify-center">
                    {isCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
                    <span className="sr-only">{isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}</span>
                 </Button>
            </div>
        </aside>
    );
};

export default CollapsibleSidebar;