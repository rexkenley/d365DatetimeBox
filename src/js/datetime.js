import { enUS, es, fr, uk } from "date-fns/locale";
import startCase from "lodash/startCase";

/** @module datetime */

/** @const */
const locales = { default: enUS, es, fr, uk },
  wide = { width: "wide" };

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
  hour24 = new RegExp("^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$");

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
 * @param {string} locale - defaults to en-US
 * @returns {Array.<OptionsTime>}
 */
export function get12Hours(locale = "en-US") {
  const hours = [],
    {
      localize: { dayPeriod }
    } = locales[locale] || locales.default;

  for (let hour = 0; hour < 24; hour += 1) {
    ["00", "15", "30", "45"].forEach(min => {
      const time = `${hour.toString().padStart(2, "0")}:${min}`;
      hours.push({
        key: time,
        // eslint-disable-next-line
        text: `${hour === 0 ? "12" : hour > 12 ? hour - 12 : hour}:${min} ${
          hour < 12 ? dayPeriod("am", wide) : dayPeriod("pm", wide)
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

/**
 * Returns an array of periods
 * @module datetime/getPeriods
 * @function
 * @param {string} locale - defaults to en-US
 * @returns {[]}
 */
export function getPeriods(locale = "en-US") {
  const periods = [],
    {
      localize: { dayPeriod }
    } = locales[locale] || locales.default;

  periods.push({ key: "AM", text: dayPeriod("am", wide) });
  periods.push({ key: "PM", text: dayPeriod("pm", wide) });

  return periods;
}

/**
 * Returns a Calendar props object
 * @module datetime/getStrings
 * @function
 * @param {string} locale - defaults to en-US
 * @returns {{}}
 * @link https://developer.microsoft.com/en-us/fabric#/controls/web/calendar#ICalendarStrings
 */
export function getStrings(locale = "en-US") {
  const abbrv = { width: "abbreviated" },
    {
      localize: { day, month }
    } = locales[locale] || locales.default,
    days = [],
    months = [],
    shortDays = [],
    shortMonths = [];

  for (let i = 0; i < 7; i += 1) {
    days.push(startCase(day(i, wide)));
    shortDays.push(startCase(day(i, abbrv)));
  }

  for (let i = 0; i < 12; i += 1) {
    months.push(startCase(month(i, wide)));
    shortMonths.push(startCase(month(i, abbrv)));
  }

  return { goToToday: "Go to Today", days, months, shortDays, shortMonths };
}
