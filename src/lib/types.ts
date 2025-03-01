import { type LucideIcon } from "lucide-react";

type ParameterStatus = "normal" | "warning" | "critical";
type AnomalyType = "normal" | "warning" | "critical";

export interface ToolParameter {
    name: string;
    value: string;
    status: ParameterStatus;
    icon: LucideIcon;
    statusText: string;
}

export interface ToolAnomaly {
    type: AnomalyType;
    text: string;
    time?: string;
}

export interface ToolData {
    name: string;
    load: number;
    parameters: ToolParameter[];
    anomalies: ToolAnomaly[];
}
