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

import { get12Hours, get24Hours } from "../js/datetime";

initializeIcons();
HandlebarsIntl.registerWith(Handlebars);

const datetimeBoxId = getId("datetimeBox"),
  tooltipId = getId("tooltip"),
  setTooltip = (template, value) => {
    return (template && template({ value })) || "";
  },
  setDatetime = (date, time) => {
    return (
      date &&
      new Date(
        `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date
          .getDate()
          .toString()
          .padStart(2, "0")} ${(time && time.key) || "00:00"}`
      )
    );
  },
  DatetimeBox = props => {
    const { label, value, tooltip, onSelectDatetime, is24, isDateOnly } = props,
      options = is24 ? get24Hours() : get12Hours(),
      template = tooltip && Handlebars.compile(tooltip),
      [date, setDate] = useState(setDatetime(value)),
      [time, setTime] = useState();

    return (
      <Fabric>
        <Stack tokens={{ childrenGap: 8 }} horizontal>
          {label && <Label htmlFor={datetimeBoxId}>{label}</Label>}
          <TooltipHost id={tooltipId} content={setTooltip(template, value)}>
            <DatePicker
              id={datetimeBoxId}
              value={value}
              onSelectDate={value => {
                setDate(value);

                let datetime = setDatetime(value, time);
                onSelectDatetime && onSelectDatetime(datetime);
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
              options={options}
              onChange={(event, option) => {
                setTime(option);

                let datetime = setDatetime(date, option);
                onSelectDatetime && onSelectDatetime(datetime);
              }}
            />
          )}
        </Stack>
      </Fabric>
    );
  };

export default DatetimeBox;
