import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart2, Settings, Wrench } from "lucide-react";

export default function HomePage() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center pt-20 px-4">
            <div className="max-w-4xl mx-auto text-center space-y-10">
                <div className="space-y-6 flex flex-col gap-12">
                    <h1 className="text-5xl font-bold">
                        Система мониторинга оборудования
                    </h1>
                    <p className="text-xl text-muted-foreground mt-20">
                        Добро пожаловать в систему мониторинга и управления
                        промышленным оборудованием. Отслеживайте состояние
                        станков, анализируйте эффективность и предотвращайте
                        сбои.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-center gap-2">
                                <Wrench className="h-5 w-5 text-primary" />
                                Мониторинг
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-center">
                                Отслеживайте состояние оборудования в реальном
                                времени
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-center gap-2">
                                <BarChart2 className="h-5 w-5 text-primary" />
                                Аналитика
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-center">
                                Анализируйте эффективность работы и выявляйте
                                проблемы
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-center gap-2">
                                <Settings className="h-5 w-5 text-primary" />
                                Управление
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-center">
                                Планируйте техническое обслуживание и ремонт
                                оборудования
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="bg-muted p-6 rounded-xl flex flex-col gap-4">
                    <h2 className="text-2xl font-bold mb-4">
                        Начните работу прямо сейчас
                    </h2>
                    <p className="mb-6">
                        Выберите тип оборудования в боковом меню или нажмите
                        кнопку ниже, чтобы перейти к токарному оборудованию
                    </p>
                    <Button asChild className="w-full">
                        <Link
                            to="/tokarnoe"
                            className="flex items-center gap-2"
                        >
                            Перейти к токарному оборудованию
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                <div className="text-sm text-muted-foreground border-t">
                    <p>© 2025 Система мониторинга оборудования</p>
                    <p>Разработано для хакатона Ростех</p>
                </div>
            </div>
        </div>
    );
}
