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
    Zap,
    Thermometer,
    Gauge,
    UserCheck,
    RotateCw,
} from "lucide-react";

interface ParametersCardProps {
    toolData: ToolData;
}

const sensorMockData = {
    "Температура станка": {
        nominal: "45°C",
        max: "85°C",
        unit: "°C",
    },
    Мощность: {
        nominal: "10 кВт",
        max: "18 кВт",
        unit: "кВт",
    },
    "Датчик присутствия": {
        nominal: "Оператор присутствует",
        max: "Нет",
        unit: "",
    },
    "Скорость вращения": {
        nominal: "2000 об/мин",
        max: "3500 об/мин",
        unit: "об/мин",
    },
};

export function ParametersCard({ toolData }: ParametersCardProps) {
    const sensors = toolData.sensors;

    return (
        <div className="border-2 rounded-lg overflow-hidden border-[#e5e7eb] w-1/2">
            <div className={`p-3 font-bold font-mono text-lg`}>
                Доступные датчики
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
                                    ? "bg-[#fffbeb]"
                                    : param.status_message === "critical"
                                    ? "bg-[#fef2f2]"
                                    : "bg-[#f0fdf4]"
                            }`}
                        >
                            <AccordionTrigger className="px-4 py-3 hover:no-underline flex items-center justify-between">
                                <div className="flex items-center w-full">
                                    <div className="w-8 mr-2">
                                        {param.sensor_name ===
                                        "Температура станка" ? (
                                            <Thermometer className="h-5 w-5" />
                                        ) : param.sensor_name === "Мощность" ? (
                                            <Zap className="h-5 w-5" />
                                        ) : param.sensor_name ===
                                          "Датчик присутствия" ? (
                                            <UserCheck className="h-5 w-5" />
                                        ) : param.sensor_name ===
                                          "Скорость вращения" ? (
                                            <RotateCw className="h-5 w-5" />
                                        ) : (
                                            <Gauge className="h-5 w-5" />
                                        )}
                                    </div>
                                    <div className="font-mono">
                                        {param.sensor_name}
                                    </div>
                                    <div className="font-mono font-bol ml-auto mr-30 flex items-center gap-5 w-8">
                                        <span className="font-bold">
                                            {param.sensor_name ===
                                            "Датчик присутствия"
                                                ? "Присутствует"
                                                : param.value.toFixed(2)}
                                        </span>
                                        <span className="font-bold">
                                            {mockData.unit}
                                        </span>
                                    </div>
                                    <div
                                        className={`font-mono mr-4 font-semibold ${
                                            param.status_message === "warning"
                                                ? "text-[#fb923c]"
                                                : param.status_message ===
                                                  "critical"
                                                ? "text-[#dc2626]"
                                                : "text-[#00c951]"
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
                            <AccordionContent className="px-4 py-4 bg-[#ffffff]">
                                <div className="space-y-3 pl-10">
                                    <div className="flex justify-between border-b border-[#f3f4f6] py-2">
                                        <div className="font-mono text-[#4a5565] flex items-center">
                                            Состояние:
                                        </div>
                                        <div className="font-mono font-medium flex items-center">
                                            <Wifi className="h-5 w-5 mr-2 text-[#00c951]" />
                                            <span className="text-[#00c951]">
                                                В сети
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between border-b border-[#f3f4f6] py-2">
                                        <div className="font-mono text-[#4a5565]">
                                            Номинальное значение:
                                        </div>
                                        <div className="font-mono font-medium">
                                            {mockData.nominal}
                                        </div>
                                    </div>

                                    <div className="flex justify-between border-b border-[#f3f4f6] py-2">
                                        <div className="font-mono text-[#4a5565]">
                                            Максимальное значение:
                                        </div>
                                        <div className="font-mono font-medium">
                                            {mockData.max}
                                        </div>
                                    </div>

                                    <div className="flex justify-between border-b border-[#f3f4f6] py-2">
                                        <div className="font-mono text-[#4a5565]">
                                            Фактическое значение:
                                        </div>
                                        <div className="font-mono font-medium">
                                            {param.sensor_name ===
                                            "Датчик присутствия"
                                                ? "Присутствует"
                                                : param.value.toFixed(2)}
                                            {mockData.unit}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="w-full bg-[#e5e7eb] rounded-full h-2.5 mb-1">
                                            <div
                                                className={`h-2.5 rounded-full ${
                                                    param.status_message ===
                                                    "critical"
                                                        ? "bg-[#dc2626]"
                                                        : param.status_message ===
                                                          "warning"
                                                        ? "bg-[#fb923c]"
                                                        : "bg-[#00c951]"
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
