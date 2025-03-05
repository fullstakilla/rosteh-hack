import { BrowserRouter, useLocation } from "react-router-dom";
import { routeConfig, routePaths } from "./config/route-config";
import { useRoutes } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { AppHeader } from "./components/app-header";
import { Suspense } from "react";

export default function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

function AppContent() {
    const location = useLocation();
    const isAuthPage = location.pathname === routePaths.AUTH;

    if (isAuthPage) {
        return (
            <main className="w-full h-full">
                <Suspense fallback={<div>Загрузка...</div>}>
                    <AppRoutes />
                </Suspense>
            </main>
        );
    }

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full">
                <AppSidebar />
                <div className="flex h-full flex-col flex-1">
                    <AppHeader />
                    <main className="flex-1 p-6">
                        <Suspense fallback={<div>Загрузка...</div>}>
                            <AppRoutes />
                        </Suspense>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}

function AppRoutes() {
    const elements = useRoutes(routeConfig);
    return elements;
}
