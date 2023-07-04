# ❄️ hyperflake-validator-ui

Validate HyperFlake Snowflake IDs

👩‍💻 If you're a developer looking for the conversion code, check out [src/convert.js](src/convert.js)

## Develop

1. `npm install && npm run dev`
2. Write code
3. `npm run format && npm run test`

## Deploy

You can deploy a static site or run the included server. The benefit of using the server is that links containing snowflakes will show the timestamp in embeds when posted on services like Discord.

For either deployment, you must first build:

`npm run build`

To deploy a static site, copy or host the contents of `/build`

Otherwise, start the server:

`npm start`

The server runs on port 3000 by default, but you can set `PORT` in your environment variables. You can create a `.env` file in root to set this variable.

## Source Code Attribution

- Original Code by [vegeta897](https://github.com/vegeta897) from [snow-stamp](https://github.com/vegeta897/snow-stamp/)
- All Assets belong to [vegeta897](https://github.com/vegeta897)