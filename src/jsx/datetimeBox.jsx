import React, { useState } from "react";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Label } from "office-ui-fabric-react/lib/Label";
import { DatePicker } from "office-ui-fabric-react";
import { TooltipHost } from "office-ui-fabric-react/lib/Tooltip";
import { getId } from "office-ui-fabric-react/lib/Utilities";
import { initializeIcons } from "@uifabric/icons";
import Handlebars from "handlebars";
import HandlebarsIntl from "handlebars-intl";

initializeIcons();
HandlebarsIntl.registerWith(Handlebars);

const datetimeBoxId = getId("datetimeBox"),
  tooltipId = getId("tooltip"),
  DatetimeBox = props => {
    const { label, value, tooltip, onSelectDate } = props,
      template = tooltip && Handlebars.compile(tooltip),
      [content, setContent] = useState(
        (template && value && template({ value })) || ""
      );

    return (
      <Fabric style={{ display: "flex" }}>
        {label && <Label htmlFor={datetimeBoxId}>{label}&nbsp;</Label>}
        <TooltipHost id={tooltipId} content={content}>
          <DatePicker
            id={datetimeBoxId}
            value={value}
            onSelectDate={value => {
              setContent((template && value && template({ value })) || "");
              onSelectDate && onSelectDate(value);
            }}
            placeholder="---"
          />
        </TooltipHost>
      </Fabric>
    );
  };

export default DatetimeBox;
