import React, { useState, useEffect } from "react";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Stack } from "office-ui-fabric-react";
import { MaskedTextField } from "office-ui-fabric-react/lib/TextField";
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";

import { hour12, hour24, periods } from "../js/datetime";

/** @module manualTimeBox */

/**
 * @module manualTimeBox/ManualTimeBoxProps
 * @typedef {{}} ManualTimeBoxProps
 * @property {string} label
 * @property {{}} value - Datetime value
 * @property {function} onTimeChange - a callback fired when valid date is changed
 * @property {boolean} is24 - 24 hours if true, otherwise 12 hours
 * @property {boolean} disabled - lock control
 */

/**
 * ManualTimeBox
 * @module manualTimeBox/ManualTimeBox
 * @function
 * @param {ManualTimeBoxProps} props
 * @returns {{}}
 */
const ManualTimeBox = props => {
  // eslint-disable-next-line
  const { label, value, onTimeChange, is24, disabled } = props,
    [time, setTime] = useState(),
    [period, setPeriod] = useState(),
    [error, setError] = useState();

  useEffect(() => {
    const localeTime =
      (value && value.toLocaleTimeString("en-US", { hour12: !is24 })) || "";

    setTime(
      localeTime &&
        localeTime.substr(0, localeTime.search(":") + 3).padStart(5, "0")
    );
    setPeriod((!is24 && localeTime && localeTime.slice(-2)) || "");
    setError();
  }, [value]);

  return (
    <Fabric>
      <Stack tokens={{ childrenGap: 8 }} horizontal>
        <MaskedTextField
          mask="99:99"
          label={label}
          value={time}
          errorMessage={error}
          disabled={disabled}
          onChange={(event, val) => {
            setTime(val || "");
          }}
          validateOnLoad={false}
          onNotifyValidationResult={(errorMessage, val) => {
            setTime(val);

            if (is24 && hour24.test(val)) {
              onTimeChange && onTimeChange(val);
              setError();
            } else if (!is24 && hour12.test(val)) {
              period && onTimeChange && onTimeChange(`${val} ${period}`.trim());
              setError();
            } else setError("Invalid Time Value");
          }}
        />
        {!is24 && (
          <Dropdown
            label={label && "_"}
            placeholder="--"
            options={periods}
            selectedKey={period}
            disabled={disabled}
            onChange={(event, item) => {
              setPeriod(item.key);

              if (hour12.test(time))
                onTimeChange && onTimeChange(`${time} ${item.key}`);
            }}
          />
        )}
      </Stack>
    </Fabric>
  );
};

export default ManualTimeBox;
