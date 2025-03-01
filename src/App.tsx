import { BrowserRouter } from "react-router-dom";
import { routeConfig } from "./config/route-config";
import { useRoutes } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Suspense } from "react";

export default function App() {
    return (
        <BrowserRouter>
            <SidebarProvider>
                <AppSidebar />
                <SidebarTrigger />
                <main className="w-full h-full">
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <AppRoutes />
                    </Suspense>
                </main>
            </SidebarProvider>
        </BrowserRouter>
    );
}

function AppRoutes() {
    const elements = useRoutes(routeConfig);
    return elements;
}
