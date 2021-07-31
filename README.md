# ❄️ Snow-Stamp

I couldn't find a page anywhere that let you paste in a Discord snowflake to get the timestamp.

So I made one.

🔗 https://y.at/❄️⚙️⏰👏

👩‍💻 If you're a developer looking for the conversion code, check out [convert.js](src/convert.js)

## Contribute

Pull requests and issues are welcome!

- Add me on Discord `vegeta897#7777`
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

---

[![MadeWithSvelte.com shield](https://madewithsvelte.com/storage/repo-shields/3155-shield.svg)](https://madewithsvelte.com/p/snow-stamp/shield-link)
