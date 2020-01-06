export function setDatetime(date, time) {
  return (
    date &&
    new Date(
      `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date
        .getDate()
        .toString()
        .padStart(2, "0")} ${(time && time.key) || "00:00"}`
    )
  );
}

export function get12Hours() {
  const hours = [];

  for (let hour = 0; hour < 24; hour += 1) {
    ["00", "15", "30", "45"].forEach(min => {
      const time = `${hour.toString().padStart(2, "0")}:${min}`;
      hours.push({
        key: time,
        text: `${hour === 0 ? "12" : hour > 12 ? hour - 12 : hour}:${min} ${
          hour < 12 ? "AM" : "PM"
        }`
      });
    });
  }

  return hours;
}

export function get24Hours() {
  const hours = [];

  for (let hour = 0; hour < 24; hour += 1) {
    ["00", "15", "30", "45"].forEach(min => {
      const time = `${hour.toString().padStart(2, "0")}:${min}`;
      hours.push({ key: time, text: time });
    });
  }

  return hours;
}
