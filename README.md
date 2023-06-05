# ❄️ Snow-Stamp

I couldn't find a page anywhere that let you paste in a Discord snowflake to get the timestamp.

So I made one.

🔗 https://snowsta.mp

👩‍💻 If you're a developer looking for the conversion code, check out [src/convert.js](src/convert.js)

## Contribute

[Pull requests and issues](CONTRIBUTING.md) are welcome! Check the [help wanted](https://github.com/vegeta897/snow-stamp/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) tag.

- Add me on Discord `vegeta897#7777`
- [Sponsor me on GitHub](https://github.com/sponsors/vegeta897) ([details](#sponsors))
- [Buy me a coffee](https://www.buymeacoffee.com/vegeta897)

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

### Custom Epoch

You can use a custom epoch instead of [Discord's](https://discord.com/developers/docs/reference#snowflakes) by setting environment variable `SNOWFLAKE_EPOCH` to the desired integer or with an `.env` file.

## Sponsors

- [FlawCra](https://github.com/FlawCra)
- Proxy#8342
- [Timothy Williams](https://github.com/Cowlephant)
- [Morgân von Brylân](https://github.com/GlanVonBrylan)

You can [sponsor me on GitHub](https://github.com/sponsors/vegeta897) to have your name added here, or on [snowsta.mp](https://snowsta.mp) itself!

---

[![MadeWithSvelte.com shield](https://madewithsvelte.com/storage/repo-shields/3155-shield.svg)](https://madewithsvelte.com/p/snow-stamp/shield-link)
