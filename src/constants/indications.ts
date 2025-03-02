function generateSensorReadings() {
  const currentTime = new Date();
  const startTime = new Date(currentTime);
  startTime.setDate(currentTime.getDate() - 3);

  const sensorReadings = [];

  while (startTime <= currentTime) {
    const reading = {
      timestamp: startTime.toISOString(),
      sensors: [
        {
          sensor_name: "Мощность",
          value: parseFloat((Math.random() * (20 - 10) + 10).toFixed(2)),
          status_message: "normal",
        },
        {
          sensor_name: "Температура",
          value: parseFloat((Math.random() * (60 - 40) + 40).toFixed(2)),
          status_message: "normal",
        },
        {
          sensor_name: "Вибрация",
          value: parseFloat((Math.random() * (0.5 - 0.2) + 0.2).toFixed(2)),
          status_message: "normal",
        },
        {
          sensor_name: "Шум",
          value: parseFloat((Math.random() * (80 - 70) + 70).toFixed(2)),
          status_message: "normal",
        },
      ],
    };
    sensorReadings.push(reading);
    startTime.setHours(startTime.getHours() + 1);
  }

  return sensorReadings;
}

export const readings = generateSensorReadings();
