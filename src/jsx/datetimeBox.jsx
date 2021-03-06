import React, { useState, useEffect } from "react";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Stack, DatePicker } from "office-ui-fabric-react";
import { TooltipHost } from "office-ui-fabric-react/lib/Tooltip";
import { ComboBox } from "office-ui-fabric-react/lib/ComboBox";
import { getId } from "office-ui-fabric-react/lib/Utilities";
import { initializeIcons } from "@uifabric/icons";
import Handlebars from "handlebars";
import HandlebarsIntl from "handlebars-intl";

import {
  setDatetime,
  get12Hours,
  get24Hours,
  getStrings
} from "../js/datetime";
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
 * @property {string} locale
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
        disabled,
        hidden,
        locale
      } = props,
      options = is24 ? get24Hours() : get12Hours(locale),
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
      },
      onEndTimeChange = val => {
        setEndTime(val);

        const result = {
          value: setDatetime(date, time),
          endValue: setDatetime(date, val)
        };

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

    if (hidden) return <Fabric />;

    return (
      <Fabric>
        <Stack tokens={{ childrenGap: 8 }} horizontal verticalAlign="end">
          <TooltipHost
            id={tooltipId}
            content={setTooltip(tooltip, setDatetime(date, time))}
          >
            <DatePicker
              showGoToToday={false}
              id={datetimeBoxId}
              label={label}
              value={date}
              disabled={disabled}
              strings={getStrings(locale)}
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
                value={value}
                is24={is24}
                disabled={disabled}
                locale={locale}
                onTimeChange={onTimeChange}
              />
            ) : (
              <ComboBox
                autoComplete="on"
                useComboBoxAsMenuWidth
                buttonIconProps={{ iconName: "Clock" }}
                multiSelect={false}
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
                value={value}
                is24={is24}
                disabled={disabled}
                locale={locale}
                onTimeChange={onEndTimeChange}
              />
            ) : (
              <ComboBox
                autoComplete="on"
                useComboBoxAsMenuWidth
                buttonIconProps={{ iconName: "Clock" }}
                multiSelect={false}
                options={options}
                selectedKey={endTime && endTime.key}
                disabled={disabled}
                onChange={(event, option) => {
                  onEndTimeChange(option);
                }}
              />
            ))}
        </Stack>
      </Fabric>
    );
  };

export default DatetimeBox;
