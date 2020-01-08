import React, { useState, useEffect } from "react";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Stack } from "office-ui-fabric-react";
import { TooltipHost } from "office-ui-fabric-react/lib/Tooltip";
import { DatePicker } from "office-ui-fabric-react";
import { ComboBox } from "office-ui-fabric-react/lib/ComboBox";
import { getId } from "office-ui-fabric-react/lib/Utilities";
import { initializeIcons } from "@uifabric/icons";
import Handlebars from "handlebars";
import HandlebarsIntl from "handlebars-intl";

import { setDatetime, get12Hours, get24Hours } from "../js/datetime";

/** @module datetimeBox */

initializeIcons();
HandlebarsIntl.registerWith(Handlebars);

/**
 * @typedef {{}} DatetimeBoxProps
 * @property {{}} value - Date value
 * @property {string} tooltip - a Handlebar enable string
 * @property {function} onSelectDatetime - a callback fired when date or time values changed
 * @property {boolean} is24 - 24 hours if true, otherwise 12 hours
 * @property {boolean} isDateOnly - will display time dropdown if true
 */

const datetimeBoxId = getId("datetimeBox"),
  tooltipId = getId("tooltip"),
  /**
   * Sets the tooltip content by merging the tooltip and value
   * @param {string} tooltip
   * @param {{}} value - Date
   * @returns {string}
   */
  setTooltip = (tooltip, value) => {
    if (!tooltip || (tooltip.indexOf("{{") > -1 && !value)) return "";

    const template = tooltip && Handlebars.compile(tooltip);

    if (!template) return "";

    return (template && template({ value })) || "";
  },
  /** Datetimebox
   * @param {DatetimeBoxProps} props
   * @returns {{}}
   */
  DatetimeBox = props => {
    const { label, value, tooltip, onSelectDatetime, is24, isDateOnly } = props,
      options = is24 ? get24Hours() : get12Hours(),
      [date, setDate] = useState(value),
      [time, setTime] = useState(
        value &&
          options.find(o => {
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
          })
      );

    useEffect(() => {
      setDate(value);
      setTime(
        value &&
          options.find(o => {
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
          })
      );
    }, [props.value]);

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
              onSelectDate={value => {
                setDate(value);
                if (!value) setTime(null);

                onSelectDatetime && onSelectDatetime(setDatetime(value, time));
              }}
              placeholder="---"
              allowTextInput={true}
            />
          </TooltipHost>
          {!isDateOnly && (
            <ComboBox
              autoComplete="on"
              useComboBoxAsMenuWidth={true}
              buttonIconProps={{ iconName: "Clock" }}
              multiSelect={false}
              label={label && "_"}
              options={options}
              selectedKey={time && time.key}
              onChange={(event, option) => {
                setTime(option);

                onSelectDatetime && onSelectDatetime(setDatetime(date, option));
              }}
            />
          )}
        </Stack>
      </Fabric>
    );
  };

export default DatetimeBox;
