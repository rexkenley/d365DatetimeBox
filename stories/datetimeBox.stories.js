import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import DatetimeBox from "../src/jsx/datetimeBox";

storiesOf("DatetimeBox", module)
  .add("Initial", () => <DatetimeBox />)
  .add("With props hidden", () => <DatetimeBox hidden />)
  .add("With props isTimeRange and disabled", () => (
    <DatetimeBox isTimeRange disabled />
  ))
  .add("With props label Label", () => <DatetimeBox label="Label" />)
  .add("With props is24", () => <DatetimeBox is24 />)
  .add("With props value Date 1/1/2020 13:00 Standard", () => {
    return <DatetimeBox value={new Date("1/1/2020 13:00")} />;
  })
  .add("With props value Date 1/1/2020 13:00 Military", () => (
    <DatetimeBox is24 value={new Date("1/1/2020 13:00")} />
  ))
  .add("With props tooltip I am a Tooltip", () => (
    <DatetimeBox tooltip="I am a Tooltip" />
  ))
  .add("With props onSelectDatetime", () => (
    <DatetimeBox onSelectDatetime={action("onSelectDatetime")} />
  ))
  .add("With props isDateOnly true", () => <DatetimeBox isDateOnly={true} />)
  .add("With props isTimeRange and onSelectDatetime", () => (
    <DatetimeBox isTimeRange onSelectDatetime={action("onSelectDatetime")} />
  ))
  .add("With props isTimeRange, isMenual and onSelectDatetime", () => (
    <DatetimeBox
      isTimeRange
      isManual
      onSelectDatetime={action("onSelectDatetime")}
    />
  ))
  .add("With props isTimeRange, isMenual, is24 and onSelectDatetime", () => (
    <DatetimeBox
      isTimeRange
      isManual
      is24
      onSelectDatetime={action("onSelectDatetime")}
    />
  ))
  .add("Birthdate Example", () => (
    <DatetimeBox
      isDateOnly
      value={new Date("1/1/1975")}
      tooltip="Born {{formatRelative value units='year'}}"
    />
  ))
  .add("Appointment Example", () => (
    <DatetimeBox
      isTimeRange
      value={new Date("1/1/2020 13:00")}
      endValue={new Date("1/1/2020 14:00")}
    />
  ));
