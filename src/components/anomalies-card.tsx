import { ToolData } from "@/lib/types";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertTriangle, AlertCircle } from "lucide-react";

interface AnomaliesCardProps {
    toolData: ToolData;
}

export function AnomaliesCard({ toolData }: AnomaliesCardProps) {
    // const hasCritical = anomalies
    //     .slice(1)
    //     .some((anomaly) => anomaly.type === "critical");
    // const hasWarnings = anomalies
    //     .slice(1)
    //     .some((anomaly) => anomaly.type === "warning");

    // return (
    //     <div
    //         className={`rounded-lg p-4 min-h-16  ${
    //             hasCritical
    //                 ? "bg-red-50 border-red-200 border"
    //                 : hasWarnings
    //                 ? "bg-amber-50 border-amber-200 border"
    //                 : "bg-green-50 border-green-200 border"
    //         }`}
    //     >
    //         <h3 className="text-lg font-bold mb-4 font-mono">
    //             Аномалии за последние 24 часа
    //         </h3>

    //         <Accordion type="single" collapsible defaultValue="anomalies">
    //             <AccordionItem value="anomalies" className="border-none">
    //                 <AccordionTrigger className="py-2 font-mono">
    //                     Обнаруженные события
    //                     {hasCritical && (
    //                         <span className="ml-2 text-red-500 font-bold flex items-center">
    //                             <AlertCircle className="h-4 w-4 mr-1" />
    //                             Критические события
    //                         </span>
    //                     )}
    //                     {!hasCritical && hasWarnings && (
    //                         <span className="ml-2 text-amber-500 font-bold flex items-center">
    //                             <AlertTriangle className="h-4 w-4 mr-1" />
    //                             Требует внимания
    //                         </span>
    //                     )}
    //                 </AccordionTrigger>
    //                 <AccordionContent>
    //                     <div className="space-y-3 mt-2">
    //                         {anomalies.map((anomaly, index) => (
    //                             <div
    //                                 key={index}
    //                                 className={`flex items-center p-3 rounded-md ${
    //                                     anomaly.type === "critical"
    //                                         ? "bg-red-100"
    //                                         : anomaly.type === "warning"
    //                                         ? "bg-amber-100"
    //                                         : "bg-green-100"
    //                                 }`}
    //                             >
    //                                 {anomaly.type === "critical" && (
    //                                     <div className="w-6 h-6 rounded-full bg-red-500 mr-3 mt-0.5 flex-shrink-0"></div>
    //                                 )}
    //                                 {anomaly.type === "warning" && (
    //                                     <div className="w-6 h-6 rounded-full bg-amber-500 mr-3 mt-0.5 flex-shrink-0"></div>
    //                                 )}
    //                                 {anomaly.type === "normal" && (
    //                                     <div className="w-6 h-6 rounded-full bg-green-500 mr-3 mt-0.5 flex-shrink-0"></div>
    //                                 )}
    //                                 <div className="font-mono">
    //                                     {anomaly.text.replace(/\*\*/g, "")}{" "}
    //                                     {anomaly.time && (
    //                                         <span className="text-muted-foreground">
    //                                             {anomaly.time}
    //                                         </span>
    //                                     )}
    //                                 </div>
    //                             </div>
    //                         ))}
    //                     </div>
    //                 </AccordionContent>
    //             </AccordionItem>
    //         </Accordion>
    //     </div>
    // );
    return null;
}
