import { Download, Loader2 } from "lucide-react";
import { ParametersCard } from "@/components/parameters-card";
import { ToolData } from "@/lib/types";
import { useSSE } from "@/hooks/use-sse";
import { useEffect, useState } from "react";
import { readings } from "@/constants/indications";
import { WorkingTimeCard } from "@/components/working-time-card";
import { useScreenshot } from "@/hooks/use-screenshot";

export default function ToolPage() {
    const { targetRef, takeScreenshot } = useScreenshot({
        filename: "tool-status.pdf",
        format: "a4",
        orientation: "portrait",
    });

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

    console.log(readings);

    // Статус подключения
    useEffect(() => {
        if (connected) {
            console.log("Connected to SSE server");
        } else {
            console.log("Disconnected from SSE server");
        }
    }, [connected]);

    // Ошибки
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
        <div className="w-full h-full p-6 mx-auto px-20 pt-10" ref={targetRef}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold font-mono">
                    Токарный станок
                </h1>
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={takeScreenshot}
                >
                    <Download className="h-8 w-8" />
                </div>
            </div>

            <div className="mb-8">
                <p className="text-lg font-mono">
                    Текущая загруженность: 73%
                    <span className="ml-3 text-sm">
                        {connected ? (
                            <span className="text-green-500">● Онлайн</span>
                        ) : (
                            <span className="text-red-500">● Офлайн</span>
                        )}
                    </span>
                </p>
            </div>

            <div className="flex flex-col gap-10 w-full">
                <ParametersCard toolData={toolData} />
                {/* <AnomaliesCard toolData={toolData} /> */}
                <WorkingTimeCard />
            </div>
        </div>
    );
}
