/** @module datetime */

/**
 * An options object
 * @typedef {{}} OptionsTime
 * @property {string} key - a 24 hour time value
 * @property {string} text - a 24 hour time or 12 hour time value
 */

/**
 * Returns a datetime value based on date and time parameters
 * @function
 * @param {{}} date
 * @param {OptionsTime} time
 * @returns {{}} Date value
 */
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

/**
 * Returns an array of 12 hour 15 minute interval values
 * @returns {Array.<OptionsTime>}
 */
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

/**
 * Returns an array of 24 hour 15 minute interval values
 * @returns {Array.<OptionsTime>}
 */
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
