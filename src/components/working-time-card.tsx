import React, { useState, useEffect, useCallback } from "react";
import { readings } from "@/constants/indications";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Input } from "@/components/ui/input"; // Adjust the import based on your ShadCN setup
import { Clock } from "lucide-react"; // Импортируем иконку часов

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function WorkingTimeCard() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [workingTimeByDay, setWorkingTimeByDay] = useState({});
    const [totalWorkingTime, setTotalWorkingTime] = useState(0);

    const calculateWorkingTime = useCallback(() => {
        const workingThreshold = 10;
        let workingTime = 0;
        const timeByDay = {};

        readings.forEach((reading) => {
            const readingDate = new Date(reading.timestamp);
            if (
                (!startDate || readingDate >= new Date(startDate)) &&
                (!endDate || readingDate <= new Date(endDate))
            ) {
                const powerSensor = reading.sensors.find(
                    (sensor) => sensor.sensor_name === "Мощность"
                );
                if (powerSensor && powerSensor.value > workingThreshold) {
                    workingTime += 1;
                    const dateKey = readingDate.toISOString().split("T")[0];
                    timeByDay[dateKey] = (timeByDay[dateKey] || 0) + 1;
                }
            }
        });

        setWorkingTimeByDay(timeByDay);
        setTotalWorkingTime(workingTime);
    }, [startDate, endDate]);

    useEffect(() => {
        calculateWorkingTime();
    }, [startDate, endDate, calculateWorkingTime]);

    // Calculate percentage of working time relative to 8 hours
    const calculatePercentage = (hours) => {
        return (hours / 8) * 100;
    };

    const data = {
        labels: Object.keys(workingTimeByDay),
        datasets: [
            {
                label: "% загруженности",
                data: Object.values(workingTimeByDay).map(calculatePercentage),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Загруженность за день (%)",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: "Процент загруженности",
                },
            },
        },
    };

    return (
        <div className="border-2 rounded-lg overflow-hidden border-[#e5e7eb] w-full">
            {/* Заголовок карточки */}
            <div className="p-3 font-bold font-mono text-lg bg-[#f3f4f6]">
                Дополнительная информация
            </div>

            {/* Основное содержимое карточки */}
            <div className="p-4 space-y-4">
                {/* Верхняя часть: выбор дат */}
                <div className="flex flex-col md:flex-row gap-4">
                    <label className="flex-1">
                        <span className="block text-[#364153] mb-1">
                            Начальная дата:
                        </span>
                        <Input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        />
                    </label>
                    <label className="flex-1">
                        <span className="block text-[#364153] mb-1">
                            Конечная дата:
                        </span>
                        <Input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        />
                    </label>
                </div>

                {/* Нижняя часть: время работы и график */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Левая часть: общее время работы */}
                    <div className="flex-1 p-6 bg-[#f3f4f6] rounded-lg flex flex-col items-center justify-center gap-4">
                        {/* Иконка часов */}
                        <div className="p-4 bg-[#e5e7eb] rounded-full">
                            <Clock className="h-12 w-12 text-[#364153]" />{" "}
                            {/* Увеличил размер иконки */}
                        </div>
                        {/* Текст */}
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-2">
                                Общее время работы
                            </h3>{" "}
                            {/* Увеличил размер текста */}
                            <p className="text-4xl font-bold text-[#364153]">
                                {totalWorkingTime} часов
                            </p>
                            <p className="text-sm text-[#364153] mt-2">
                                За выбранный период
                            </p>
                        </div>
                    </div>

                    {/* Правая часть: график */}
                    <div className="flex-1 p-4 bg-[#f3f4f6] rounded-lg">
                        <div className="h-64">
                            <Bar data={data} options={options} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
