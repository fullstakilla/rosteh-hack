import { Download, Loader2 } from "lucide-react";
import { ParametersCard } from "@/components/parameters-card";
import { ToolData } from "@/lib/types";
import { useSSE } from "@/hooks/use-sse";
import { useState } from "react";
import { WorkingTimeCard } from "@/components/working-time-card";
import { usePDF } from "react-to-pdf";
import { AnomaliesCard } from "@/components/anomalies-card";

export default function ToolPage() {
    const { toPDF, targetRef } = usePDF({
        filename: `HAAS_ST-20.${new Date().toISOString().split("T")[0]}.pdf`,
    });

    const [toolData, setToolData] = useState<ToolData>();
    const { connected } = useSSE<ToolData>({
        url: "http://localhost:8080/events",
        onMessage: (receivedData) => {
            setToolData(receivedData);
        },
    });

    if (!toolData)
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );

    return (
        <div className="w-full h-full p-6 mx-auto px-20 pt-4" ref={targetRef}>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-4xl font-bold font-mono">
                        Токарный станок HAAS ST-20
                    </h1>
                    <p className="text-muted-foreground mt-1">Цех 1</p>
                </div>
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => toPDF()}
                >
                    <Download className="h-8 w-8" />
                </div>
            </div>

            <div className="mb-8">
                <p className="text-lg font-mono">
                    Текущая загруженность: 73%
                    <span className="ml-3 text-sm">
                        {connected ? (
                            <span className="text-[#00c951]">● Онлайн</span>
                        ) : (
                            <span className="text-[#fb2c36]">● Офлайн</span>
                        )}
                    </span>
                </p>
            </div>

            <div className="flex flex-col gap-10 w-full">
                <div className="flex gap-10 w-full">
                    <ParametersCard toolData={toolData} />
                    <AnomaliesCard />
                </div>
                <WorkingTimeCard />
            </div>
        </div>
    );
}
