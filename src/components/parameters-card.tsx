import { ToolData } from "@/lib/types";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion";
import {
    AlertTriangle,
    AlertOctagon,
    CheckCircle,
    Wifi,
    Volume2,
    Activity,
    Zap,
    Thermometer,
    Gauge,
} from "lucide-react";

interface ParametersCardProps {
    toolData: ToolData;
}

const sensorMockData = {
    Температура: {
        nominal: "45°C",
        max: "85°C",
        unit: "°C",
    },
    Мощность: {
        nominal: "10 кВт",
        max: "18 кВт",
        unit: "кВт",
    },
    Вибрация: {
        nominal: "1.5 g",
        max: "3.0 g",
        unit: "Гц",
    },
    Шум: {
        nominal: "75 дБ",
        max: "95 дБ",
        unit: "дБ",
    },
};

export function ParametersCard({ toolData }: ParametersCardProps) {
    const sensors = toolData.sensors;

    return (
        <div className="border-2 rounded-lg overflow-hidden border-gray-200">
            <div className={`p-3 font-bold font-mono text-lg bg-gray-700}`}>
                Параметры оборудования
            </div>

            <Accordion type="single" collapsible className="w-full">
                {sensors.map((param, index) => {
                    const mockData =
                        sensorMockData[
                            param.sensor_name as keyof typeof sensorMockData
                        ];

                    return (
                        <AccordionItem
                            key={index}
                            value={`param-${index}`}
                            className={`border-b ${
                                param.status_message === "warning"
                                    ? "bg-amber-50"
                                    : param.status_message === "critical"
                                    ? "bg-red-50"
                                    : "bg-green-50"
                            }`}
                        >
                            <AccordionTrigger className="px-4 py-3 hover:no-underline flex items-center justify-between">
                                <div className="flex items-center w-full">
                                    <div className="w-8 mr-2">
                                        {param.sensor_name === "Температура" ? (
                                            <Thermometer className="h-5 w-5" />
                                        ) : param.sensor_name === "Мощность" ? (
                                            <Zap className="h-5 w-5" />
                                        ) : param.sensor_name === "Вибрация" ? (
                                            <Activity className="h-5 w-5" />
                                        ) : param.sensor_name === "Шум" ? (
                                            <Volume2 className="h-5 w-5" />
                                        ) : (
                                            <Gauge className="h-5 w-5" />
                                        )}
                                    </div>
                                    <div className="font-mono">
                                        {param.sensor_name}
                                    </div>
                                    <div className="font-mono font-bol ml-auto  mr-30 flex items-center gap-5">
                                        <span className="font-bold">
                                            {param.value.toFixed(2)}
                                        </span>
                                        <span className="font-bold">
                                            {mockData.unit}
                                        </span>
                                    </div>
                                    <div
                                        className={`font-mono mr-4 font-semibold ${
                                            param.status_message === "warning"
                                                ? "text-amber-500"
                                                : param.status_message ===
                                                  "critical"
                                                ? "text-red-500"
                                                : "text-green-500"
                                        }`}
                                    >
                                        {param.status_message === "warning" ? (
                                            <AlertTriangle className="h-5 w-5" />
                                        ) : param.status_message ===
                                          "critical" ? (
                                            <AlertOctagon className="h-5 w-5" />
                                        ) : (
                                            <CheckCircle className="h-5 w-5" />
                                        )}
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 py-4 bg-white">
                                <div className="space-y-3 pl-10">
                                    <div className="flex justify-between border-b border-gray-100 py-2">
                                        <div className="font-mono text-gray-600 flex items-center">
                                            Состояние:
                                        </div>
                                        <div className="font-mono font-medium flex items-center">
                                            <Wifi className="h-5 w-5 mr-2 text-green-500" />
                                            <span className="text-green-600">
                                                В сети
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between border-b border-gray-100 py-2">
                                        <div className="font-mono text-gray-600">
                                            Номинальное значение:
                                        </div>
                                        <div className="font-mono font-medium">
                                            {mockData.nominal}
                                        </div>
                                    </div>

                                    <div className="flex justify-between border-b border-gray-100 py-2">
                                        <div className="font-mono text-gray-600">
                                            Максимальное значение:
                                        </div>
                                        <div className="font-mono font-medium">
                                            {mockData.max}
                                        </div>
                                    </div>

                                    <div className="flex justify-between border-b border-gray-100 py-2">
                                        <div className="font-mono text-gray-600">
                                            Фактическое значение:
                                        </div>
                                        <div className="font-mono font-medium">
                                            {param.value.toFixed(2)}
                                            {mockData.unit}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                                            <div
                                                className={`h-2.5 rounded-full ${
                                                    param.status_message ===
                                                    "critical"
                                                        ? "bg-red-600"
                                                        : param.status_message ===
                                                          "warning"
                                                        ? "bg-amber-500"
                                                        : "bg-green-600"
                                                }`}
                                                style={{
                                                    width: `${Math.min(
                                                        (parseFloat(
                                                            `${param.value}`
                                                        ) /
                                                            parseFloat(
                                                                mockData.max
                                                            )) *
                                                            100,
                                                        100
                                                    )}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span>0{mockData.unit}</span>
                                            <span>{mockData.max}</span>
                                        </div>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </div>
    );
}
