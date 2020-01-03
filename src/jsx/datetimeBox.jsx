import React from "react";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Label } from "office-ui-fabric-react/lib/Label";
import { DatePicker } from "office-ui-fabric-react";
import { TooltipHost } from "office-ui-fabric-react/lib/Tooltip";
import { getId } from "office-ui-fabric-react/lib/Utilities";
import { initializeIcons } from "@uifabric/icons";

initializeIcons();

const datetimeBoxId = getId("datetimeBox"),
  tooltipId = getId("tooltip"),
  DatetimeBox = props => {
    const { label, value, tooltip, onSelectDate } = props;

    return (
      <Fabric style={{ display: "flex" }}>
        <Label htmlFor={datetimeBoxId}>{label}</Label>
        <TooltipHost content={tooltip} id={tooltipId}>
          <DatePicker
            id={datetimeBoxId}
            value={value}
            placeholder="---"
            onSelectDate={onSelectDate}
          />
        </TooltipHost>
      </Fabric>
    );
  };

export default DatetimeBox;
