import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import DatetimeBox from "./datetimeBox";

storiesOf("DatetimeBox", module)
  .add("Initial", () => <DatetimeBox />)
  .add("With Hello label", () => <DatetimeBox label="Hello" />)
  .add("With 1/1/2020", () => <DatetimeBox value={new Date("1/1/2020")} />)
  .add("With Tooltip", () => <DatetimeBox tooltip="I am a tooltip" />)
  .add("With On Select Date Event", () => (
    <DatetimeBox onSelectDate={action("onSelectDate")} />
  ));
