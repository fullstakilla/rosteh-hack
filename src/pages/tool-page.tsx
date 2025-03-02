import { Download, Loader2 } from "lucide-react";
import { ParametersCard } from "@/components/parameters-card";
import { ToolData } from "@/lib/types";
import { useSSE } from "@/lib/hooks/use-sse";
import { useEffect, useState } from "react";
import { AnomaliesCard } from "@/components/anomalies-card";

export default function ToolPage() {
    const [toolData, setToolData] = useState<ToolData>();
    const { connected, error } = useSSE<ToolData>({
        url: "http://localhost:8080/events",
        onMessage: (receivedData) => {
            setToolData(receivedData);
        },
        onError: (err) => {
            console.error("SSE connection error:", err);
        },
        onOpen: () => {
            console.log("SSE connection opened to localhost:8080");
        },
    });

    // cтатус подключения
    useEffect(() => {
        if (connected) {
            console.log("Connected to SSE server");
        } else {
            console.log("Disconnected from SSE server");
        }
    }, [connected]);

    // ошибки
    useEffect(() => {
        if (error) {
            console.error("SSE error:", error);
        }
    }, [error]);

    if (!toolData)
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );

    return (
        <div className="w-full h-full p-6 mx-auto px-20 pt-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold font-mono">
                    Токарный станок
                </h1>
                <div className="flex items-center gap-2 cursor-pointer">
                    <Download className="h-8 w-8" />
                </div>
            </div>

            <div className="mb-8">
                <p className="text-lg font-mono">
                    Текущая загруженность: 73%
                    <span className="ml-3 text-sm">
                        <span className="text-green-500">● Онлайн</span>
                    </span>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ParametersCard toolData={toolData} />
                <AnomaliesCard toolData={toolData} />
            </div>
        </div>
    );
}
