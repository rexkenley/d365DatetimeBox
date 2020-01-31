import { setDatetime, get12Hours, get24Hours } from "../src/js/datetime";

describe("setDatetime function", () => {
  test("it should return 1/1/2020 1:00", () => {
    const datetime = setDatetime(new Date("2020-1-1"), { key: "1:00" });
    expect(datetime).toEqual(new Date("2020-1-1 1:00"));
  });

  test("it should return 1/1/2020 13:00", () => {
    const datetime = setDatetime(new Date("2020-1-1"), { key: "13:00" });
    expect(datetime).toEqual(new Date("2020-1-1 13:00"));
  });
});

describe("get12Hours function", () => {
  test("it should return array of 12 Hours", () => {
    const hours = get12Hours();
    expect(hours.length).toEqual(96);
    expect(hours[0].key).toEqual("00:00");
    expect(hours[0].text).toEqual("12:00 a.m.");
    expect(hours[48].text).toEqual("12:00 p.m.");
  });
});

describe("get24Hours function", () => {
  test("it should return array of 24 Hours", () => {
    const hours = get24Hours();
    expect(hours.length).toEqual(96);
    expect(hours[0].text).toEqual("00:00");
    expect(hours[0].text).toEqual("00:00");
    expect(hours[48].text).toEqual("12:00");
  });
});
