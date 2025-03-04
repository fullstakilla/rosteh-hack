import { AlertOctagon, AlertTriangle } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion";

interface Anomaly {
    type: "warning" | "critical";
    text: string;
    time: string;
    description: string;
}

export function AnomaliesCard() {
    const anomalies: Anomaly[] = [
        {
            type: "warning",
            text: "Нетипичный простой станка",
            time: "12:10 - 12:40",
            description:
                "Зафиксирован простой оборудования в рабочее время без запланированного технического обслуживания. Рекомендуется проверить журнал событий и опросить операторов.",
        },
        {
            type: "critical",
            text: "Ненормально высокий уровень шума",
            time: "14:32",
            description:
                "Зафиксировано превышение допустимого уровня шума на 15дБ выше нормы. Возможные причины: износ подшипников, ослабление креплений, повреждение зубчатых передач. Требуется немедленная диагностика.",
        },
    ];

    const hasCritical = anomalies.some(
        (anomaly) => anomaly.type === "critical"
    );
    const cardBgColor = hasCritical
        ? "bg-[#fef2f2] border-[#f04438]"
        : "bg-[#fffbeb] border-[#f79009]";

    return (
        <div className={`rounded-lg border p-4 ${cardBgColor} w-1/2`}>
            <h2 className="text-xl font-bold font-mono">
                Обнаруженные аномалии
            </h2>

            {anomalies.length === 0 ? (
                <div className="text-center py-6 text-[#6a7282]">
                    Аномалий не обнаружено
                </div>
            ) : (
                <Accordion
                    type="single"
                    collapsible
                    className="w-full mt-4"
                    defaultValue="item-0"
                >
                    {anomalies.map((anomaly, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className={`mb-2 border rounded-lg ${
                                anomaly.type === "critical"
                                    ? "border-[#f04438] bg-[#fef2f2]"
                                    : "border-[#f79009] bg-[#fffbeb]"
                            }`}
                        >
                            <AccordionTrigger className="px-4 py-3 hover:no-underline">
                                <div className="flex items-center w-full">
                                    <div className="mr-2">
                                        {anomaly.type === "critical" ? (
                                            <AlertOctagon className="h-5 w-5 text-[#f04438]" />
                                        ) : (
                                            <AlertTriangle className="h-5 w-5 text-[#f79009]" />
                                        )}
                                    </div>
                                    <div className="font-mono font-medium">
                                        {anomaly.text}
                                    </div>
                                    <div className="ml-auto font-mono text-sm text-[#6a7282]">
                                        {anomaly.time}
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 py-3 bg-[#ffffff] rounded-b-lg border-t">
                                <div className="font-mono text-sm">
                                    {anomaly.description}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            )}
        </div>
    );
}
