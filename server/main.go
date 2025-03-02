package main

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"time"
)

type SensorStatus struct {
	SensorName string  `json:"sensor_name"`
	Value      float64 `json:"value"`
	Status     string  `json:"status_message"`
}

type SensorData struct {
	Timestamp time.Time      `json:"timestamp"`
	Sensors   []SensorStatus `json:"sensors"`
}

const (
	normalStatus   = "normal"
	warningStatus  = "warning"
	criticalStatus = "critical"
)

func analyzeSensorData(power, temp, vibration, noise float64) []SensorStatus {
	sensors := make([]SensorStatus, 0)

	// Анализ мощности
	powerStatus := normalStatus
	if power > 40.0 {
		powerStatus = warningStatus
	}
	sensors = append(sensors, SensorStatus{Value: power, Status: powerStatus, SensorName: "Мощность"})

	// Анализ температуры
	tempStatus := normalStatus
	if temp > 70.0 {
		tempStatus = warningStatus
	}
	sensors = append(sensors, SensorStatus{Value: temp, Status: tempStatus, SensorName: "Температура"})

	// Анализ вибрации
	vibrationStatus := normalStatus
	if vibration > 3.0 {
		vibrationStatus = warningStatus
	}
	sensors = append(sensors, SensorStatus{Value: vibration, Status: vibrationStatus, SensorName: "Вибрация"})

	// Анализ шума
	noiseStatus := normalStatus
	if noise > 95.0 {
		noiseStatus = warningStatus
	}
	sensors = append(sensors, SensorStatus{Value: noise, Status: noiseStatus, SensorName: "Шум"})

	return sensors
}

func generateSensorData() SensorData {
	rand.Seed(time.Now().UnixNano())

	power := 10.0 + rand.Float64()*40.0   // 10 - 50 кВт
	temp := 30.0 + rand.Float64()*60.0    // 30 - 90°C
	vibration := 0.1 + rand.Float64()*4.9 // 0.1 - 5.0 g
	noise := 60.0 + rand.Float64()*40.0   // 60 - 100 дБ

	return SensorData{
		Timestamp: time.Now(),
		Sensors:   analyzeSensorData(power, temp, vibration, noise),
	}
}

func sseHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "SSE не поддерживается", http.StatusInternalServerError)
		return
	}

	ticker := time.NewTicker(2 * time.Second)
	defer ticker.Stop()

	for {
		select {
		case <-r.Context().Done():
			return
		case <-ticker.C:
			data := generateSensorData()
			jsonData, err := json.Marshal(data)
			if err != nil {
				continue
			}

			fmt.Fprintf(w, "data: %s\n\n", jsonData)
			flusher.Flush()
		}
	}
}

func main() {
	http.HandleFunc("/events", sseHandler)
	http.HandleFunc("/", serveHTML)

	fmt.Println("Сервер запущен на http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}

func serveHTML(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	w.Write([]byte(htmlContent))
}

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Мониторинг датчиков</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .sensor {
            margin: 20px;
            padding: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
        .warning { 
            color: orange; 
            font-weight: bold;
        }
        .error { 
            color: red; 
            font-weight: bold;
        }
        h1 {
            color: #333;
        }
        h3 {
            color: #444;
            margin-top: 0;
        }
    </style>
</head>
<body>
    <h1>Мониторинг промышленных датчиков</h1>
    <div id="sensors"></div>

    <script>
        const evtSource = new EventSource("/events");
        const sensorsDiv = document.getElementById("sensors");

        evtSource.onmessage = function(event) {
            const data = JSON.parse(event.data);
            let html = '';
            
            for (const sensor of data.sensors) {
                const statusClass = sensor.status_message === 'normal' ? "" : 
                                  sensor.status_message.includes(warningStatus) ? "warning" : "error";
                
                let unit = "";
                switch(sensor.sensor_name) {
                    case "Мощность":
                        unit = "кВт";
                        break;
                    case "Температура":
                        unit = "°C";
                        break;
                    case "Вибрация":
                        unit = "g";
                        break;
                    case "Шум":
                        unit = "дБ";
                        break;
                }
                
                html += ` + "`" + `
                    <div class="sensor">
                        <h3>${sensor.sensor_name}</h3>
                        <p>Значение: ${sensor.value.toFixed(2)} ${unit}</p>
                        <p class="${statusClass}">Статус: ${sensor.status_message}</p>
                    </div>
                ` + "`" + `;
            }
            
            sensorsDiv.innerHTML = html;
        };

        evtSource.onerror = function(err) {
            console.error("SSE Error:", err);
        };
    </script>
</body>
</html>
`
