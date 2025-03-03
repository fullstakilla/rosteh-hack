import { useCallback, useRef } from "react";
import jsPDF from "jspdf";

interface UseScreenshotOptions {
    filename?: string;
    format?: "a4" | "a3" | "letter";
    orientation?: "portrait" | "landscape";
}

export function useScreenshot(options: UseScreenshotOptions = {}) {
    const {
        filename = "screenshot.pdf",
        format = "a4",
        orientation = "portrait",
    } = options;

    const targetRef = useRef<HTMLDivElement>(null);

    const takeScreenshot = useCallback(async () => {
        if (!targetRef.current) return;

        try {
            // Запрашиваем доступ к экрану
            const stream = await navigator.mediaDevices.getDisplayMedia({
                preferCurrentTab: true, // Предпочтительно текущая вкладка
                video: {
                    displaySurface: "browser", // Захват браузера
                },
            });

            // Создаем видео элемент для захвата кадра
            const video = document.createElement("video");
            video.srcObject = stream;
            await video.play();

            // Создаем canvas для захвата кадра
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            if (!context) throw new Error("Failed to get canvas context");

            // Устанавливаем размеры canvas
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Захватываем кадр
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Останавливаем стрим
            stream.getTracks().forEach((track) => track.stop());

            // Конвертируем в изображение
            const imgData = canvas.toDataURL("image/png");

            // Создаем PDF с правильными размерами
            const pdf = new jsPDF({
                format,
                orientation,
                unit: "mm",
            });

            // Получаем размеры страницы в мм
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            // Вычисляем размеры изображения с учетом отступов
            const margin = 10; // отступ 10мм
            const imgWidth = pageWidth - margin * 2;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Проверяем, нужно ли разбить на несколько страниц
            const maxHeight = pageHeight - margin * 2;
            if (imgHeight > maxHeight) {
                // Разбиваем на страницы
                let remainingHeight = imgHeight;
                let sourceY = 0;
                let pageIndex = 0;

                while (remainingHeight > 0) {
                    // Вычисляем высоту для текущей страницы
                    const currentPageHeight = Math.min(
                        remainingHeight,
                        maxHeight
                    );
                    const scaledSourceHeight =
                        (currentPageHeight * canvas.height) / imgHeight;

                    // Создаем временный canvas для части изображения
                    const tempCanvas = document.createElement("canvas");
                    tempCanvas.width = canvas.width;
                    tempCanvas.height = scaledSourceHeight;
                    const tempContext = tempCanvas.getContext("2d");
                    if (!tempContext)
                        throw new Error("Failed to get temp canvas context");

                    // Копируем часть изображения
                    tempContext.drawImage(
                        canvas,
                        0,
                        sourceY,
                        canvas.width,
                        scaledSourceHeight,
                        0,
                        0,
                        tempCanvas.width,
                        tempCanvas.height
                    );

                    // Добавляем новую страницу, если это не первая страница
                    if (pageIndex > 0) {
                        pdf.addPage();
                    }

                    // Добавляем часть изображения на страницу
                    const pageImgData = tempCanvas.toDataURL("image/png");
                    pdf.addImage(
                        pageImgData,
                        "PNG",
                        margin,
                        margin,
                        imgWidth,
                        currentPageHeight
                    );

                    // Обновляем оставшуюся высоту и позицию
                    remainingHeight -= currentPageHeight;
                    sourceY += scaledSourceHeight;
                    pageIndex++;
                }
            } else {
                // Если изображение помещается на одну страницу
                pdf.addImage(
                    imgData,
                    "PNG",
                    margin,
                    margin,
                    imgWidth,
                    imgHeight
                );
            }

            // Сохраняем файл
            pdf.save(filename);
        } catch (error) {
            console.error("Error taking screenshot:", error);
            // Если пользователь отменил выбор экрана
            if (error instanceof Error && error.name === "NotAllowedError") {
                console.log("User cancelled screen capture");
                return;
            }
            // Если браузер не поддерживает API
            if (error instanceof Error && error.name === "NotSupportedError") {
                console.log("Screen Capture API is not supported");
                return;
            }
        }
    }, [filename, format, orientation]);

    return { targetRef, takeScreenshot };
}
