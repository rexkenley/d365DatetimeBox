/** @module datetime */

/**
 * A RegExp for 12 hours
 * @module datetime/hour12
 * @const {{}}
 * @link https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s06.html
 */
export const hour12 = new RegExp("^(1[0-2]|0?[1-9]):([0-5]?[0-9])$"),
  /**
   * A RegExp for 24 hours
   * @module datetime/hour24
   * @const {{}}
   * @link https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s06.html
   */
  hour24 = new RegExp("^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$"),
  /**
   * Array of time period
   * @module datetime/periods
   * @const {[]}
   */
  periods = [
    { key: "AM", text: "A.M." },
    { key: "PM", text: "P.M." }
  ];

/**
 * An options object
 * @module datetime/OptionsTime
 * @typedef {{}} OptionsTime
 * @property {string} key - a 24 hour time value
 * @property {string} text - a 24 hour time or 12 hour time value
 */

/**
 * Returns a datetime value based on date and time parameters
 * @module datetime/setDatetime
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
        .padStart(2, "0")} ${(time && time.key ? time.key : time) || "00:00"}`
    )
  );
}

/**
 * Returns an array of 12 hour 15 minute interval values
 * @module datetime/get12Hours
 * @function
 * @returns {Array.<OptionsTime>}
 */
export function get12Hours() {
  const hours = [];

  for (let hour = 0; hour < 24; hour += 1) {
    ["00", "15", "30", "45"].forEach(min => {
      const time = `${hour.toString().padStart(2, "0")}:${min}`;
      hours.push({
        key: time,
        // eslint-disable-next-line
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
 * @module datetime/get24Hours
 * @function
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
