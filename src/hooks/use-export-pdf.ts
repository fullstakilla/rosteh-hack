import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useCallback, useRef } from "react";

interface ExportPDFOptions {
    filename?: string;
    format?: "a4" | "a3" | "letter";
    orientation?: "portrait" | "landscape";
}

export function useExportPDF(options: ExportPDFOptions = {}) {
    const {
        filename = "document.pdf",
        format = "a4",
        orientation = "portrait",
    } = options;

    // Ref для хранения элемента, который нужно экспортировать
    const targetRef = useRef<HTMLDivElement>(null);

    // Функция экспорта в PDF
    const exportToPDF = useCallback(async () => {
        if (!targetRef.current) return;

        try {
            // Сохраняем оригинальные стили
            const originalStyles = document.documentElement.style.cssText;

            // Создаем canvas из элемента
            const canvas = await html2canvas(targetRef.current, {
                scale: 2, // Увеличиваем качество
                useCORS: true, // Разрешаем загрузку внешних ресурсов
                logging: false, // Отключаем логи
                backgroundColor: "#ffffff", // Устанавливаем белый фон
            });

            // Получаем размеры страницы
            const pageWidth =
                format === "a4" ? 210 : format === "a3" ? 297 : 216; // в мм

            // Создаем PDF документ
            const pdf = new jsPDF({
                format: format,
                orientation: orientation,
                unit: "mm",
            });

            // Получаем пропорции изображения
            const imgWidth = pageWidth - 20; // отступы по 10мм с каждой стороны
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Добавляем изображение в PDF
            const imgData = canvas.toDataURL("image/png");
            pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

            // Сохраняем PDF
            pdf.save(filename);

            // Возвращаем оригинальные стили
            document.documentElement.style.cssText = originalStyles;
        } catch (error) {
            console.error("Error exporting PDF:", error);
        }
    }, [filename, format, orientation]);

    return { targetRef, exportToPDF };
}
