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
            text: "Несоответствие времени работы станка и времени работы оператора",
            time: "12:10 - 12:40",
            description:
                "Обнаружено несоответствие между показаниями датчика присутствия оператора и датчика мощности станка. Станок продолжал работать в штатном режиме (потребление мощности 8-10 кВт) при отсутствии сигнала от датчика присутствия оператора. Возможные причины: неисправность датчика присутствия, нарушение техники безопасности. Требуется проверка.",
        },
        {
            type: "critical",
            text: "Сбой в системе станка",
            time: "14:32",
            description:
                "Обнаружен сбой в системе станка. Произошло отключение питания станка. Возможные причины: перегрузка сети, неисправность электропитания. Требуется проверка и ремонт.",
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
