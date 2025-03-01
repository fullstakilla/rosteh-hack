import { ToolParameter } from "@/lib/types";
import { AlertTriangle } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface ParametersCardProps {
    parameters: ToolParameter[];
}

// Расширим тип параметра, добавив детальную информацию
interface DetailedParameter {
    name: string;
    value: string;
}

export function ParametersCard({ parameters }: ParametersCardProps) {
    // Дополнительные детали для каждого параметра (в реальном приложении это может приходить с сервера)
    const parameterDetails: Record<string, DetailedParameter[]> = {
        "Температура шпинделя": [
            { name: "Состояние подключения к сети", value: "Подключено" },
            { name: "Номинальная температура", value: "45°C" },
            { name: "Максимально допустимая температура", value: "75°C" },
            {
                name: "Время работы с повышенной температурой",
                value: "1ч 23мин",
            },
        ],
        "Ток/мощность": [
            { name: "Состояние подключения к сети", value: "Подключено" },
            {
                name: "Номинальная потребляемая мощность",
                value: "10.5 кВт (в нерабочем состоянии)",
            },
            {
                name: "Фактическая потребляемая мощность",
                value: "15.2 кВт (во время обработки детали)",
            },
        ],
        Вибрация: [
            { name: "Состояние подключения к сети", value: "Подключено" },
            { name: "Номинальная вибрация", value: "0.8 g" },
            { name: "Максимально допустимая вибрация", value: "2.5 g" },
            { name: "Время работы с повышенной вибрацией", value: "45мин" },
        ],
        Шум: [
            { name: "Состояние подключения к сети", value: "Подключено" },
            { name: "Номинальный уровень шума", value: "80 дБ" },
            { name: "Максимально допустимый уровень шума", value: "95 дБ" },
            { name: "Средний уровень шума за сегодня", value: "85 дБ" },
        ],
    };

    return (
        <div className="border-2 rounded-lg overflow-hidden border-gray-200">
            <div className="p-3 font-bold font-mono text-lg bg-gray-100">
                Параметры оборудования
            </div>

            <Accordion type="single" collapsible className="w-full">
                {parameters.map((param, index) => (
                    <AccordionItem
                        key={index}
                        value={`param-${index}`}
                        className={`border-b ${
                            param.status === "warning"
                                ? "bg-amber-50"
                                : param.status === "critical"
                                ? "bg-red-50"
                                : "bg-green-50"
                        }`}
                    >
                        <AccordionTrigger className="px-4 py-3 hover:no-underline">
                            <div className="flex items-center w-full">
                                <div className="w-8 mr-2">
                                    <param.icon
                                        className={`h-6 w-6 ${
                                            param.status === "warning"
                                                ? "text-amber-500"
                                                : param.status === "critical"
                                                ? "text-red-500"
                                                : "text-green-500"
                                        }`}
                                    />
                                </div>
                                <div className="font-mono flex-grow">
                                    {param.name}
                                </div>
                                <div className="font-mono font-bold mx-4">
                                    {param.value}
                                </div>
                                <div className="w-8 mx-2">
                                    {param.status === "warning" && (
                                        <AlertTriangle className="h-6 w-6 text-amber-500" />
                                    )}
                                    {param.status === "normal" && (
                                        <div className="h-6 w-6 rounded-sm bg-green-500" />
                                    )}
                                </div>
                                <div
                                    className={`font-mono mr-4 ${
                                        param.status === "warning"
                                            ? "text-amber-500 font-semibold"
                                            : param.status === "critical"
                                            ? "text-red-500 font-semibold"
                                            : "text-green-500 font-semibold"
                                    }`}
                                >
                                    {param.statusText}
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-2 bg-white">
                            <div className="space-y-2 pl-10">
                                {parameterDetails[param.name]?.map(
                                    (detail, detailIndex) => (
                                        <div
                                            key={detailIndex}
                                            className="flex justify-between border-b border-gray-100 py-2"
                                        >
                                            <div className="font-mono text-gray-600">
                                                {detail.name}:
                                            </div>
                                            <div className="font-mono font-medium">
                                                {detail.value}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
