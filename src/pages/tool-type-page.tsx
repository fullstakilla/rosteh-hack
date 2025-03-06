import { translateToolType } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Activity, AlertTriangle, CheckCircle } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState, useMemo } from "react";

const toolsData = [
    {
        id: 1,
        name: "Токарный станок HAAS ST-20",
        status: "В работе",
        failuresToday: 1,
        efficiency: "97%",
        lastMaintenance: "15.05.2024",
        nextMaintenance: "15.06.2025",
        workshop: "Цех 1",
    },
    {
        id: 2,
        name: "Токарный станок ТС-1000",
        status: "В работе",
        failuresToday: 0,
        efficiency: "92%",
        lastMaintenance: "10.05.2024",
        nextMaintenance: "10.06.2025",
        workshop: "Цех 2",
    },
    {
        id: 3,
        name: "Токарный станок ТС-2000",
        status: "Техобслуживание",
        failuresToday: 0,
        efficiency: "78%",
        lastMaintenance: "05.04.2024",
        nextMaintenance: "05.05.2025",
        workshop: "Цех 1",
    },
    {
        id: 4,
        name: "Токарный станок ТС-3000",
        status: "В работе",
        failuresToday: 0,
        efficiency: "85%",
        lastMaintenance: "20.04.2024",
        nextMaintenance: "20.05.2025",
        workshop: "Цех 2",
    },
    {
        id: 5,
        name: "Токарный станок ТС-4000",
        status: "Техобслуживание",
        failuresToday: 0,
        efficiency: "0%",
        lastMaintenance: "Сегодня",
        nextMaintenance: "15.06.2025",
        workshop: "Цех 1",
    },
    {
        id: 6,
        name: "Токарный станок ТС-5000",
        status: "В работе",
        failuresToday: 0,
        efficiency: "95%",
        lastMaintenance: "01.05.2024",
        nextMaintenance: "01.06.2025",
        workshop: "Цех 2",
    },
];

export default function ToolTypePage() {
    const { toolType } = useParams<{ toolType: string }>();
    const [selectedWorkshop, setSelectedWorkshop] = useState<string>("all");
    const filteredToolsData = useMemo(() => {
        if (selectedWorkshop === "all") return toolsData;
        return toolsData.filter((tool) => tool.workshop === selectedWorkshop);
    }, [selectedWorkshop]);

    if (!toolType) return null;

    // Фильтруем данные по цеху

    // Рассчитываем статистику для карточек на основе отфильтрованных данных
    const totalEquipment = filteredToolsData.length;
    const workingEquipment = filteredToolsData.filter(
        (tool) => tool.status === "В работе"
    ).length;
    const maintenanceEquipment = filteredToolsData.filter(
        (tool) => tool.status === "Техобслуживание"
    ).length;
    const failureEquipment = filteredToolsData.filter(
        (tool) => tool.status === "Простой"
    ).length;

    const totalFailures = filteredToolsData.reduce(
        (sum, tool) => sum + tool.failuresToday,
        0
    );

    const avgEfficiency =
        filteredToolsData
            .filter((tool) => tool.status === "В работе")
            .reduce((sum, tool) => sum + parseInt(tool.efficiency), 0) /
            workingEquipment || 0;

    return (
        <div className="pb-8 px-4 w-full h-full flex flex-col items-center">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-4xl font-bold text-center">
                    {translateToolType(toolType)} Оборудование
                </h1>
            </div>

            <div className="w-full max-w-[1200px] mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5 text-primary" />
                            Статус оборудования
                        </CardTitle>
                        <CardDescription>
                            Текущее состояние станков
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <span>Всего станков:</span>
                                <span className="font-bold">
                                    {totalEquipment}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    В работе:
                                </span>
                                <span className="font-bold text-green-600">
                                    {workingEquipment}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    На ТО:
                                </span>
                                <span className="font-bold text-yellow-600">
                                    {maintenanceEquipment}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    Простой:
                                </span>
                                <span className="font-bold text-red-600">
                                    {failureEquipment}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            Сбои за сегодня
                        </CardTitle>
                        <CardDescription>
                            Количество зарегистрированных сбоев
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center h-24">
                            <div className="text-5xl font-bold text-red-500">
                                {totalFailures}
                            </div>
                            <div className="text-sm text-muted-foreground mt-2">
                                {totalFailures === 0
                                    ? "Отличная работа! Сбоев не зафиксировано"
                                    : totalFailures === 1
                                    ? "Зафиксирован 1 сбой"
                                    : `Зафиксировано ${totalFailures} сбоя`}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            Средняя эффективность
                        </CardTitle>
                        <CardDescription>
                            Эффективность работающего оборудования
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center h-24">
                            <div className="text-5xl font-bold text-green-600">
                                {avgEfficiency.toFixed(0)}%
                            </div>
                            <div className="text-sm text-muted-foreground mt-2">
                                {avgEfficiency >= 90
                                    ? "Отличный показатель!"
                                    : avgEfficiency >= 75
                                    ? "Хороший показатель"
                                    : "Требуется улучшение"}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Select
                value={selectedWorkshop}
                onValueChange={setSelectedWorkshop}
            >
                <SelectTrigger className="w-[180px] mt-6 ">
                    <SelectValue placeholder="Выберите цех" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Все цеха</SelectItem>
                    <SelectItem value="Цех 1">Цех 1</SelectItem>
                    <SelectItem value="Цех 2">Цех 2</SelectItem>
                </SelectContent>
            </Select>

            <div className="w-full max-w-[1200px] mx-auto mt-6">
                <Table>
                    <TableCaption>
                        Список доступного оборудования типа "
                        {translateToolType(toolType)}"
                        {selectedWorkshop !== "all" && ` в ${selectedWorkshop}`}
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Название</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead>Цех</TableHead>
                            <TableHead className="text-center">
                                Сбои за день
                            </TableHead>
                            <TableHead className="text-center">
                                Эффективность
                            </TableHead>
                            <TableHead>Последнее ТО</TableHead>
                            <TableHead>Следующее ТО</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredToolsData.map((tool, index) => (
                            <TableRow key={tool.id}>
                                <TableCell className="font-medium">
                                    {index === 0 ? (
                                        <Link
                                            to={`/${toolType}/${tool.id}`}
                                            className="hover:underline text-primary"
                                        >
                                            {tool.name}
                                        </Link>
                                    ) : (
                                        <span className="cursor-not-allowed">
                                            {tool.name}
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            tool.status === "В работе"
                                                ? "bg-green-100 text-green-800"
                                                : tool.status === "Простой"
                                                ? "bg-red-100 text-red-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {tool.status}
                                    </span>
                                </TableCell>
                                <TableCell>{tool.workshop}</TableCell>
                                <TableCell className="text-center">
                                    <span
                                        className={`font-medium ${
                                            tool.failuresToday > 0
                                                ? "text-red-600"
                                                : "text-green-600"
                                        }`}
                                    >
                                        {tool.failuresToday}
                                    </span>
                                </TableCell>
                                <TableCell className="text-center">
                                    {tool.efficiency}
                                </TableCell>
                                <TableCell>{tool.lastMaintenance}</TableCell>
                                <TableCell>{tool.nextMaintenance}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
