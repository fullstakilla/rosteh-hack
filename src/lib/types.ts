export interface ToolData {
    timestamp: string;
    sensors: {
        sensor_name: string;
        value: number;
        status_message: statusMessage;
    }[];
}

type statusMessage = "normal" | "warning" | "critical";
