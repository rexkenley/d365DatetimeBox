import React, { useState } from "react";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Stack } from "office-ui-fabric-react";
import { Label } from "office-ui-fabric-react/lib/Label";
import { TooltipHost } from "office-ui-fabric-react/lib/Tooltip";
import { DatePicker } from "office-ui-fabric-react";
import { ComboBox } from "office-ui-fabric-react/lib/ComboBox";
import { getId } from "office-ui-fabric-react/lib/Utilities";
import { initializeIcons } from "@uifabric/icons";
import Handlebars from "handlebars";
import HandlebarsIntl from "handlebars-intl";

import { setDatetime, get12Hours, get24Hours } from "../js/datetime";

initializeIcons();
HandlebarsIntl.registerWith(Handlebars);

const datetimeBoxId = getId("datetimeBox"),
  tooltipId = getId("tooltip"),
  setTooltip = (template, value) => {
    return (template && template({ value })) || "";
  },
  DatetimeBox = props => {
    const { label, value, tooltip, onSelectDatetime, is24, isDateOnly } = props,
      options = is24 ? get24Hours() : get12Hours(),
      template = tooltip && Handlebars.compile(tooltip),
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

    return (
      <Fabric>
        <Stack tokens={{ childrenGap: 8 }} horizontal>
          {label && <Label htmlFor={datetimeBoxId}>{label}</Label>}
          <TooltipHost id={tooltipId} content={setTooltip(template, value)}>
            <DatePicker
              id={datetimeBoxId}
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
