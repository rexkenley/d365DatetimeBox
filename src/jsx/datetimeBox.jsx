import React, { useState, useEffect } from "react";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Stack, DatePicker } from "office-ui-fabric-react";
import { TooltipHost } from "office-ui-fabric-react/lib/Tooltip";
import { ComboBox } from "office-ui-fabric-react/lib/ComboBox";
import { getId } from "office-ui-fabric-react/lib/Utilities";
import { initializeIcons } from "@uifabric/icons";
import Handlebars from "handlebars";
import HandlebarsIntl from "handlebars-intl";

import { setDatetime, get12Hours, get24Hours } from "../js/datetime";
import ManualTimeBox from "./manualTimeBox";

/** @module datetimeBox */

initializeIcons();
HandlebarsIntl.registerWith(Handlebars);

/**
 * @module datetimeBox/DatetimeBoxProps
 * @typedef {{}} DatetimeBoxProps
 * @property {string} label
 * @property {{}} value - datetime value
 * @property {boolean} isTimeRange - display second time box
 * @property {{}} endValue - end datetime value
 * @property {string} tooltip - a Handlebar enabled string
 * @property {function} onSelectDatetime - a callback fired when date or time values changed
 * @property {boolean} is24 - 24 hours if true, otherwise 12 hours
 * @property {boolean} isDateOnly - will display time dropdown if true
 * @property {boolean} isManual - allow manual time entry
 * @property {boolean} disabled - lock control
 */

const datetimeBoxId = getId("datetimeBox"),
  tooltipId = getId("tooltip"),
  setTooltip = (tooltip, value) => {
    if (!tooltip || (tooltip.indexOf("{{") > -1 && !value)) return "";

    const template = tooltip && Handlebars.compile(tooltip);

    if (!template) return "";

    return (template && template({ value })) || "";
  },
  /**
   * DatetimeBox
   * @module datetimeBox/Datetimebox
   * @function
   * @param {DatetimeBoxProps} props
   * @returns {{}}
   */
  DatetimeBox = props => {
    const {
        label,
        value,
        isTimeRange,
        endValue,
        tooltip,
        onSelectDatetime,
        is24,
        isDateOnly,
        isManual,
        disabled
      } = props,
      options = is24 ? get24Hours() : get12Hours(),
      [date, setDate] = useState(),
      [time, setTime] = useState(),
      [endTime, setEndTime] = useState(),
      onTimeChange = val => {
        setTime(val);

        const result = { value: setDatetime(date, val) };

        if (isTimeRange)
          Object.assign(result, {
            endValue: setDatetime(date, endTime)
          });

        onSelectDatetime && onSelectDatetime(result);
      };

    useEffect(() => {
      setDate(value);
      setTime(
        value &&
          (isManual
            ? value
            : options.find(o => {
                return (
                  o.key ===
                  `${value
                    .getHours()
                    .toString()
                    .padStart(2, "0")}:${value
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}`
                );
              }))
      );
      setEndTime(
        endValue &&
          (isManual
            ? endValue
            : options.find(o => {
                return (
                  o.key ===
                  `${endValue
                    .getHours()
                    .toString()
                    .padStart(2, "0")}:${endValue
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}`
                );
              }))
      );
    }, [value, endValue]);

    return (
      <Fabric>
        <Stack tokens={{ childrenGap: 8 }} horizontal>
          <TooltipHost
            id={tooltipId}
            content={setTooltip(tooltip, setDatetime(date, time))}
          >
            <DatePicker
              id={datetimeBoxId}
              label={label}
              value={date}
              disabled={disabled}
              onSelectDate={selected => {
                setDate(selected);
                if (!selected) setTime(null);

                const result = { value: setDatetime(selected, time) };

                if (isTimeRange)
                  Object.assign(result, {
                    endValue: setDatetime(selected, endTime)
                  });

                onSelectDatetime && onSelectDatetime(result);
              }}
              placeholder="---"
              allowTextInput
            />
          </TooltipHost>
          {!isDateOnly &&
            (isManual ? (
              <ManualTimeBox
                label={label && "_"}
                value={value}
                is24={is24}
                disabled={disabled}
                onTimeChange={onTimeChange}
              />
            ) : (
              <ComboBox
                autoComplete="on"
                useComboBoxAsMenuWidth
                buttonIconProps={{ iconName: "Clock" }}
                multiSelect={false}
                label={label && "_"}
                options={options}
                selectedKey={time && time.key}
                disabled={disabled}
                onChange={(event, option) => {
                  onTimeChange(option);
                }}
              />
            ))}
          {!isDateOnly &&
            isTimeRange &&
            (isManual ? (
              <ManualTimeBox
                label={label && "_"}
                value={value}
                is24={is24}
                disabled={disabled}
                onTimeChange={onTimeChange}
              />
            ) : (
              <ComboBox
                autoComplete="on"
                useComboBoxAsMenuWidth
                buttonIconProps={{ iconName: "Clock" }}
                multiSelect={false}
                label={label && "_"}
                options={options}
                selectedKey={endTime && endTime.key}
                disabled={disabled}
                onChange={(event, option) => {
                  onTimeChange(option);
                }}
              />
            ))}
        </Stack>
      </Fabric>
    );
  };

export default DatetimeBox;
