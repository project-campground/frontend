# App.Campground.GG

This contains the source code for `app.campground.gg` web-app client, the interface you interact with to use the Campground platform on the web and likely Electron or Electron-like frameworks.

## API

This web-app interacts with Campground back-end API and requires proper configuration. To configure it, it is recommended to copy `config.example.json` as `config.json` and likely change the values in the configuration.

## CSS

You can also change the CSS of the Campground web-app client by editing `src/custom.css`. It is recommended to use MUI variables instead of directly using colours, as it may not result in appearance that works with both light and dark themes.