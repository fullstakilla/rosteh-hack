import { Navigate, RouteObject } from "react-router-dom";
import HomePage from "@/pages/home-page";
import ToolTypePage from "@/pages/tool-type-page";
import ToolPage from "@/pages/tool-page";
import AuthPage from "@/pages/auth-page";
import NotificationsPage from "@/pages/notifications-page";

export enum routePaths {
    AUTH = "/",
    HOME = "/home",
    TOOL_TYPE_PAGE = "/:toolType",
    TOOL_PAGE = "/:toolType/:toolId",
    NOTIFICATIONS = "/notifications",
}

export const routeConfig: RouteObject[] = [
    {
        path: routePaths.AUTH,
        element: <AuthPage />,
    },
    {
        path: routePaths.HOME,
        element: <HomePage />,
    },
    {
        path: routePaths.TOOL_TYPE_PAGE,
        element: <ToolTypePage />,
    },
    {
        path: routePaths.TOOL_PAGE,
        element: <ToolPage />,
    },
    {
        path: routePaths.NOTIFICATIONS,
        element: <NotificationsPage />,
    },
    {
        path: "*",
        element: <Navigate to={routePaths.HOME} replace />,
    },
];
