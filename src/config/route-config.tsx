import { RouteObject } from "react-router-dom";
import HomePage from "@/pages/home-page";
import ToolTypePage from "@/pages/tool-type-page";
import ToolPage from "@/pages/tool-page";

export enum routePaths {
    HOME = "/",
    TOOL_TYPE_PAGE = "/:toolType",
    TOOL_PAGE = "/:toolType/:toolId",
}

export const routeConfig: RouteObject[] = [
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
];
