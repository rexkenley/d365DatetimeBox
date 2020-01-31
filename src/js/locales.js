const wantedLocales = ["en-US", "fr", "es", "uk"],
  locales = {};

wantedLocales.forEach(async wl => {
  const locale = await import(`date-fns/locale/${wl}/index`);

  locale && Object.assign(locales, { [wl]: locale.localize });
});

export default locales;
