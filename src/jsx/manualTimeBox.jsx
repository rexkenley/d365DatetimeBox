import React, { useState, useEffect } from "react";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Stack } from "office-ui-fabric-react";
import { MaskedTextField } from "office-ui-fabric-react/lib/TextField";
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";

/** @module manualTimeBox */

/**
 * @typedef {{}} ManualTimeBoxProps
 * @property {string} label
 * @property {{}} value - Datetime value
 * @property {function} onTimeChange - a callback fired when valid date is changed
 * @property {boolean} is24 - 24 hours if true, otherwise 12 hours
 */

//https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s06.html
const val12 = new RegExp("^(1[0-2]|0?[1-9]):([0-5]?[0-9])$"),
  val24 = new RegExp("^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$"),
  /** ManualTimeBox
   * @param {ManualTimeBoxProps} props
   * @returns {{}}
   */
  ManualTimeBox = props => {
    // eslint-disable-next-line
    const { label, value, onTimeChange, is24 } = props,
      [time, setTime] = useState(),
      [period, setPeriod] = useState();

    useEffect(() => {
      const localeTime =
        (value && value.toLocaleTimeString("en-US", { hour12: !is24 })) || "";

      setTime(localeTime && localeTime.substr(0, localeTime.search(":") + 3));
      setPeriod((!is24 && localeTime && localeTime.slice(-2)) || "");
    }, [value]);

    return (
      <Fabric>
        <Stack tokens={{ childrenGap: 8 }} horizontal>
          <MaskedTextField
            label={label}
            mask={"99:99"}
            value={time}
            onChange={(event, newValue) => {
              setTime(newValue || "");
            }}
            validateOnLoad={false}
            onNotifyValidationResult={(errorMessage, local) => {
              if (errorMessage) return;

              setTime(local);

              if ((is24 && val24.test(local)) || (val12.test(local) && period))
                onTimeChange && onTimeChange(`${local} ${period}`.trim());
            }}
          />
          {!is24 && (
            <Dropdown
              label={label && "_"}
              placeholder="--"
              options={[
                { key: "AM", text: "A.M." },
                { key: "PM", text: "P.M." }
              ]}
              selectedKey={period}
              onChange={(event, item) => {
                setPeriod(item.key);

                if (val12.test(time))
                  onTimeChange && onTimeChange(`${time} ${item.key}`);
              }}
            />
          )}
        </Stack>
      </Fabric>
    );
  };

export default ManualTimeBox;
