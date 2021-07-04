import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import nodeHTMLParser from 'node-html-parser'
import express from 'express'
import { config } from 'dotenv'
import { validateSnowflake } from './convert.js'
config()
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const indexContent = fs.readFileSync(
	path.resolve(__dirname, '../public', 'index.html')
)

app.get('/', (req, res) => {
	const parsedIndex = nodeHTMLParser.parse(indexContent)
	if (req.query.s) {
		try {
			const timestamp = validateSnowflake(
				req.query.s,
				+process.env.SNOWFLAKE_EPOCH
			)
			const metaTags = parsedIndex.querySelectorAll('html head meta')
			const metaTitleOG = metaTags.find(
				(node) => node.attributes?.property === 'og:title'
			)
			metaTitleOG.setAttribute(
				'content',
				timestamp.toLocaleString() +
					' ' +
					(new Date().toString().split('(')[1] || '').slice(0, -1)
			)
		} catch (e) {}
	}
	res.send(parsedIndex.toString())
})

app.use('/', express.static(path.resolve(__dirname, `../public`)))

app.listen(process.env.SNOW_PORT, () =>
	console.log(`Server started on port ${process.env.SNOW_PORT}`)
)
