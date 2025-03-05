import { Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

export function AppHeader() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <header className="border-b bg-background px-6 py-4 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-xl font-bold font-mono">
                    Система мониторинга
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <div
                    className="relative cursor-pointer"
                    onClick={() => navigate("/notifications")}
                >
                    <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-[10px] flex items-center justify-center text-white">
                        2
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-medium">
                            Администратор
                        </span>
                        <span className="text-xs text-muted-foreground">
                            Онлайн
                        </span>
                    </div>
                    <div className="h-9 w-9 bg-muted rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                        Выйти
                    </Button>
                </div>
            </div>
        </header>
    );
}
