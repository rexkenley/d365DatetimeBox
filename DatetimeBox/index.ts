import * as React from "react";
import * as ReactDOM from "react-dom";
import differenceInSeconds from "date-fns/differenceInSeconds";
import { IInputs, IOutputs } from "./generated/ManifestTypes"; // eslint-disable-line

import DtB from "../src/jsx/datetimeBox";

export class DatetimeBox
  implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private container: HTMLDivElement;
  private notifyOutputChanged: () => void;
  private value: Date | null;
  private endValue: Date | null;
  private updatedByReact: boolean;
  private tooltip: string;
  private is24: boolean;
  private isTimeRange: boolean;
  private isManual: boolean;
  private locale: string;
  private isControlDisabled: boolean;
  private isVisible: boolean;

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ) {
    const { parameters, mode } = context,
      {
        value,
        endValue,
        tooltip,
        is24,
        isTimeRange,
        isManual,
        locale
      } = parameters,
      { isControlDisabled, isVisible } = mode;

    this.container = container;
    this.notifyOutputChanged = notifyOutputChanged;
    this.value = value && value.raw;
    this.endValue = endValue && endValue.raw;
    this.updatedByReact = false;
    this.tooltip = (tooltip && tooltip.raw) || "";
    this.is24 = (is24 && is24.raw === "true") || false;
    this.isTimeRange = (isTimeRange && isTimeRange.raw === "true") || false;
    this.isManual = (isManual && isManual.raw === "true") || false;
    this.locale = (locale && locale.raw) || "en-US";
    this.isControlDisabled = isControlDisabled;
    this.isVisible = isVisible;

    // Add control initialization code
    ReactDOM.render(
      // @ts-ignore
      React.createElement(DtB, {
        // @ts-ignore
        value: this.value,
        endValue: this.endValue,
        tooltip: this.tooltip,
        is24: this.is24,
        isTimeRange: this.isTimeRange,
        isManual: this.isManual,
        locale: this.locale,
        disabled: this.isControlDisabled,
        hidden: !this.isVisible,
        isDateOnly: value.type === "DateAndTime.DateOnly",
        onSelectDatetime: result => {
          this.value = result.value;
          this.endValue = result.endValue;
          this.updatedByReact = true;
          this.notifyOutputChanged();
        }
      }),
      this.container
    );
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Add code to update control view
    const { parameters, mode } = context,
      { value, endValue } = parameters,
      { isControlDisabled, isVisible } = mode;
    let equivalent;

    if (this.isTimeRange) {
      equivalent =
        value &&
        // @ts-ignore
        !differenceInSeconds(this.value, value.raw) &&
        endValue &&
        // @ts-ignore
        !differenceInSeconds(this.endValue, endValue.raw);
    } else {
      // @ts-ignore
      equivalent = value && !differenceInSeconds(this.value, value.raw);
    }

    if (this.updatedByReact) {
      if (equivalent) this.updatedByReact = false;

      return;
    }

    this.value = value && value.raw;
    this.endValue = endValue && endValue.raw;
    this.isControlDisabled = isControlDisabled;
    this.isVisible = isVisible;

    ReactDOM.render(
      // @ts-ignore
      React.createElement(DtB, {
        // @ts-ignore
        value: this.value,
        endValue: this.endValue,
        tooltip: this.tooltip,
        is24: this.is24,
        isTimeRange: this.isTimeRange,
        isManual: this.isManual,
        locale: this.locale,
        disabled: this.isControlDisabled,
        hidden: !this.isVisible,
        isDateOnly: value.type === "DateAndTime.DateOnly",
        onSelectDatetime: result => {
          this.value = result.value;
          this.endValue = result.endValue;
          this.updatedByReact = true;
          this.notifyOutputChanged();
        }
      }),
      this.container
    );
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    if (this.isTimeRange)
      return {
        // @ts-ignore
        value: this.value,
        // @ts-ignore
        endValue: this.endValue
      };

    // @ts-ignore
    return { value: this.value };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    ReactDOM.unmountComponentAtNode(this.container);
  }
}
