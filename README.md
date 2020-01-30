# d365DatetimeBox

An enhanced datetime box

**Enhancements**

- 15 minute time interval
- Customizable tooltip
  - [Handlebars Guide](https://handlebarsjs.com/guide/)
  - [Format Dates Relative To "now"](https://formatjs.io/handlebars/#formatRelative)
- A date time range

**Settings**

- value - date time field
- endValue - date time field
- tooltip - template string capable tooltip
- is24 - true to display military time
- isTimeRange - true to display end date time

**Testing and Review**

- npm run storybook
  - _Note: If you get an error, run **npm run test:output**_
- npm run test

**Create deployment file**

- msbuild /t:build /restore /p:configuration=Release
