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

`npm install && npm run dev`

### Epoch

You can use a custom epoch instead of [Discord's](https://discord.com/developers/docs/reference#snowflakes) by setting environment variable `SNOWFLAKE_EPOCH` to the desired integer. You can create a `.env` file in root to set this variable.

## Deploy

You can deploy a static site or run the included server. The benefit of using the server is that links containing snowflakes will show the timestamp in embeds when posted on services like Discord.

For either deployment, you must first build:

`npm run build`

To deploy a static site, copy or host the contents of `/public`

Otherwise, start the server:

`npm start`

---

_Made with svelte_
