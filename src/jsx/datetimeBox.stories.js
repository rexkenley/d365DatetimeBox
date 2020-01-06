import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import DatetimeBox from "./datetimeBox";

storiesOf("DatetimeBox", module)
  .add("Initial", () => <DatetimeBox />)
  .add("With props is24 true", () => <DatetimeBox is24={true} />)
  .add("With props label Label", () => <DatetimeBox label="Label" />)
  .add("With props value Date 1/1/2020", () => (
    <DatetimeBox value={new Date("1/1/2020")} />
  ))
  .add("With props tooltip I am a Tooltip", () => (
    <DatetimeBox tooltip="I am a Tooltip" />
  ))
  .add("With props onSelectDatetime", () => (
    <DatetimeBox onSelectDatetime={action("onSelectDatetime")} />
  ))
  .add("With props isDateOnly true", () => <DatetimeBox isDateOnly={true} />)
  .add("Birthdate Example", () => (
    <DatetimeBox
      label="Birth Date"
      value={new Date("1/1/1975")}
      tooltip="Born {{formatRelative value units='year'}}"
    />
  ));
