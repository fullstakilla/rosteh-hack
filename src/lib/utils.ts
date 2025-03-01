import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ToolTypes } from "./types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function translateToolType(toolType: ToolTypes) {
    switch (toolType) {
        case "tokarnoe":
            return "Токарное";
        case "frezernoe":
            return "Фрезерное";
        case "litevye-mashiny":
            return "Литьевые машины (ЛПД)";
        case "kuznechno-pressovoe":
            return "Кузнечно-прессовое";
        case "elektroerozionnoe":
            return "Электроэрозионное (ЭЭО)";
        case "lazernoi-i-gidroabrazivnoi-rezki":
            return "Лазерной и гидроабразивной резки";
        case "peskostruinye-kamery":
            return "Пескоструйные камеры";
        case "shlifovalnoe":
            return "Шлифовальное";
    }
}
