import { Download, Gauge, Thermometer, Volume2, Waves } from "lucide-react";
import { ParametersCard } from "@/components/parameters-card";
import { AnomaliesCard } from "@/components/anomalies-card";
import { ToolData } from "@/lib/types";

export default function ToolPage() {
    const toolData: ToolData = {
        name: "Токарный станок HAAS ST-20",
        load: 76,
        parameters: [
            {
                name: "Температура шпинделя",
                value: "63°C",
                status: "warning",
                icon: Thermometer,
                statusText: "Высокая",
            },
            {
                name: "Ток/мощность",
                value: "15.2 кВт",
                status: "normal",
                icon: Gauge,
                statusText: "Норма",
            },
            {
                name: "Вибрация",
                value: "2.1 g",
                status: "warning",
                icon: Waves,
                statusText: "Повышенная",
            },
            {
                name: "Шум",
                value: "87 дБ",
                status: "normal",
                icon: Volume2,
                statusText: "Норма",
            },
        ],
        anomalies: [
            {
                type: "critical",
                text: "**Скачок напряжения**",
                time: "(18:32)",
            },
            {
                type: "warning",
                text: "**Нетипичный простой**",
                time: "(12:10 - 12:40)",
            },
        ],
    };

    return (
        <div className="w-full h-full p-6 mx-auto px-20 pt-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold font-mono">
                    {toolData.name}
                </h1>
                <div className="flex items-center gap-2 cursor-pointer">
                    <Download className="h-8 w-8" />
                </div>
            </div>

            <div className="mb-8">
                <p className="text-lg font-mono">
                    Текущая загрузка: {toolData.load}%
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ParametersCard parameters={toolData.parameters} />

                <AnomaliesCard anomalies={toolData.anomalies} />
            </div>
        </div>
    );
}
