import { Download, Loader2 } from "lucide-react";
import { ParametersCard } from "@/components/parameters-card";
import { ToolData } from "@/lib/types";
import { useSSE } from "@/hooks/use-sse";
import { useState } from "react";
import { WorkingTimeCard } from "@/components/working-time-card";
import { usePDF } from "react-to-pdf";

export default function ToolPage() {
    const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

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
        <div className="w-full h-full p-6 mx-auto px-20 pt-10" ref={targetRef}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold font-mono">
                    Токарный станок
                </h1>
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
                <ParametersCard toolData={toolData} />
                {/* <AnomaliesCard toolData={toolData} /> */}
                <WorkingTimeCard />
            </div>
        </div>
    );
}
