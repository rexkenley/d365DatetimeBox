import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import ManualTimeBox from "../src/jsx/manualTimeBox";

const time = new Date("1/1/2001 10:21 am");

storiesOf("ManualTimeBox", module)
  .add("Initial", () => <ManualTimeBox />)
  .add("With props label Label", () => <ManualTimeBox label="Label" />)
  .add("With props value", () => <ManualTimeBox value={time} />)
  .add("With props is24 and value", () => <ManualTimeBox is24 value={time} />)
  .add("With props disabled", () => <ManualTimeBox disabled />)
  .add("With props onTimeChange", () => (
    <ManualTimeBox onTimeChange={action("onTimeChange")} />
  ));
