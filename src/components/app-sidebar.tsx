import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import mireaLogo from "@/assets/mirea-logo.jpg";

const items = [
    {
        title: "Токарное",
        url: "/tokarnoe",
        icon: Home,
    },
    {
        title: "Фрезерное",
        url: "/frezernoe",
        icon: Inbox,
    },
    {
        title: "Литьевые машины (ЛПД)",
        url: "/litevye-mashiny",
        icon: Calendar,
    },
    {
        title: "Кузнечно-прессовое",
        url: "/kuznechno-pressovoe",
        icon: Search,
    },
    {
        title: "Электроэрозионное (ЭЭО)",
        url: "/elektroerozionnoe",
        icon: Settings,
    },
    {
        title: "Лазерной и гидроабразивной резки",
        url: "/lazernoi-i-gidroabrazivnoi-rezki",
        icon: Home,
    },
    {
        title: "Пескоструйные камеры",
        url: "/peskostruinye-kamery",
        icon: Inbox,
    },
    {
        title: "Шлифовальное",
        url: "/shlifovalnoe",
        icon: Calendar,
    },
];

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="flex justify-center items-center">
                <Link to="/home">
                    <img src={mireaLogo} alt="logo" className="w-20 h-20" />
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="justify-left p-0 mb-2">
                        Доступные типы оборудования
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item, i) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        className={`${
                                            i === 0 ? "" : "cursor-not-allowed"
                                        }`}
                                        disabled={i === 0 ? false : true}
                                    >
                                        {i === 0 ? (
                                            <Link to={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        ) : (
                                            <div className="p-0!">
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </div>
                                        )}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
