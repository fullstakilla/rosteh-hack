import { AlertOctagon, AlertTriangle, Bell } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

interface Notification {
    id: string;
    type: "warning" | "critical";
    title: string;
    device: string;
    time: string;
    description: string;
    isRead: boolean;
}

export default function NotificationsPage() {
    const navigate = useNavigate();
    const notifications: Notification[] = [
        {
            id: "1",
            type: "warning",
            title: "Нетипичный простой станка",
            device: "Токарный станок HAAS ST-20",
            time: "Сегодня,12:10 - 12:40",
            description:
                "Зафиксирован простой оборудования в рабочее время без запланированного технического обслуживания. Рекомендуется проверить журнал событий и опросить операторов.",
            isRead: false,
        },
        {
            id: "2",
            type: "critical",
            title: "Ненормально высокий уровень шума",
            device: "Токарный станок HAAS ST-20",
            time: "Сегодня, 14:32",
            description:
                "Зафиксировано превышение допустимого уровня шума на 15дБ выше нормы. Возможные причины: износ подшипников, ослабление креплений, повреждение зубчатых передач. Требуется немедленная диагностика.",
            isRead: false,
        },
        {
            id: "3",
            type: "warning",
            title: "Повышенная вибрация",
            device: "Фрезерный станок DMG MORI",
            time: "Вчера, 15:45",
            description:
                "Обнаружена повышенная вибрация в шпинделе. Рекомендуется проверить состояние подшипников и провести балансировку инструмента.",
            isRead: true,
        },
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
                <Bell className="h-6 w-6" />
                <h1 className="text-2xl font-bold font-mono">Уведомления</h1>
            </div>

            <div className="bg-card rounded-lg border shadow-sm">
                {notifications.map((notification, index) => (
                    <div key={notification.id}>
                        <div
                            className={`p-4 ${
                                notification.isRead ? "opacity-70" : ""
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className="mt-1">
                                    {notification.type === "critical" ? (
                                        <AlertOctagon className="h-5 w-5 text-destructive" />
                                    ) : (
                                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold font-mono">
                                            {notification.title}
                                        </h3>
                                        <span className="text-sm text-muted-foreground">
                                            {notification.time}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {notification.device}
                                    </p>
                                    <p className="mt-2 text-sm">
                                        {notification.description}
                                    </p>
                                    <div className="flex justify-end mt-3 gap-10">
                                        <button
                                            className="text-sm font-medium text-primary hover:underline"
                                            onClick={() =>
                                                navigate("/tokarnoe/1")
                                            }
                                        >
                                            Перейти к устройству
                                        </button>
                                        {!notification.isRead && (
                                            <button className="text-sm font-medium text-blue-500 hover:underline">
                                                Отметить как прочитанное
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {index < notifications.length - 1 && <Separator />}
                    </div>
                ))}
            </div>
        </div>
    );
}
