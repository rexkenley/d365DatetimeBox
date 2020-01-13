import React from "react";
import { storiesOf } from "@storybook/react";
import { withTests } from "@storybook/addon-jest";

import("../test/__results__/.jest-test-results.json").then(results => {
  storiesOf("DatetimeBox", module).add(
    "Test Results",
    () => <div>Jest results in storybook</div>,
    {
      decorators: [withTests({ results })],
      jest: ["datetime.test.js", "storyShots.test.js"]
    }
  );
});
