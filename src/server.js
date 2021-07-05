import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import nodeHTMLParser from 'node-html-parser'
import express from 'express'
import { config } from 'dotenv'
import { decodeURLFormattedTimestamp } from './format.js'

config()
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const indexContent = fs.readFileSync(
	path.resolve(__dirname, '../public', 'index.html')
)
const indexContentString = indexContent.toString()

app.get('/', (req, res) => {
	if (req.query.t) {
		console.log('locale format query:', req.query.t)
		const parsedIndex = nodeHTMLParser.parse(indexContent)
		const metaTags = parsedIndex.querySelectorAll('html head meta')
		const metaTitleOG = metaTags.find(
			(node) => node.attributes?.property === 'og:title'
		)
		metaTitleOG.setAttribute(
			'content',
			decodeURLFormattedTimestamp(req.query.t)
		)
		res.send(parsedIndex.toString())
	} else {
		res.send(indexContentString)
	}
})

app.use('/', express.static(path.resolve(__dirname, `../public`)))

const port = process.env.SNOW_PORT || 3000
app.listen(port, () => console.log(`Server started on port ${port}`))
