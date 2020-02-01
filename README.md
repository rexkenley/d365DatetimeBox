# d365DatetimeBox

An enhanced datetime box

**Enhancements**

- 15 minute time interval
- Customizable tooltip
  - [Handlebars Guide](https://handlebarsjs.com/guide/)
  - [Format Dates Relative To "now"](https://formatjs.io/handlebars/#formatRelative)
- A date time range in either dropdown or manual entry mode
- Localized feature (en-US, es, fr, uk)

**Settings**

- value - date time field
- endValue - date time field
- tooltip - template string capable tooltip
- is24 - true to display military time
- isTimeRange - true to display end date time
- isManual - true to allow manual time entry
- locale - locale code

**Testing and Review**

- npm run storybook
  - Note: If you get an error, make sure you have a **\_\_results\_\_** folder in test and run **npm run test:output**
- npm run test

**Create deployment file**

- msbuild /t:build /restore /p:configuration=Release

**Localization**
The current code base supports English, French, Spanish and Ukranian. If you want to change the supported languages, you need to change src\js\datetime.js

- import { enUS, es, fr, uk } from "date-fns/locale";
- [date-fns locale](https://github.com/date-fns/date-fns/tree/master/src/locale)
