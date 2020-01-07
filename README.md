# d365DatetimeBox
An enhanced datetime box

**Enhancements**
- 15 minute time interval
- Customizable tooltip
  - [Handlebars Guide](https://handlebarsjs.com/guide/)
  - [Format Dates Relative To "now"](https://formatjs.io/handlebars/#formatRelative)
  
**Testing and Review**
  - npm run storybook
  - npm run test

**Create deployment file**
- msbuild /t:build /restore /p:configuration=Release
