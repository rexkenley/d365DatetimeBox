import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import DatetimeBox from "./datetimeBox";

storiesOf("DatetimeBox", module)
  .add("Initial", () => <DatetimeBox />)
  .add("With props label Hello", () => <DatetimeBox label="Hello" />)
  .add("With props value Date 1/1/2020", () => (
    <DatetimeBox value={new Date("1/1/2020")} />
  ))
  .add("With props tooltip Hello", () => <DatetimeBox tooltip="Hello" />)
  .add("With props onSelectDate", () => (
    <DatetimeBox onSelectDate={action("onSelectDate")} />
  ))
  .add("Birthdate Example", () => (
    <DatetimeBox
      label="Birth Date"
      value={new Date("1/1/1975")}
      tooltip="Born {{formatRelative value units='year'}}"
    />
  ));
