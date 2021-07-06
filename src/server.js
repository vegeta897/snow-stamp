import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import nodeHTMLParser from 'node-html-parser'
import express from 'express'
import { config } from 'dotenv'
import { getEmbedTitle } from './embed.js'

config()
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const indexContent = fs.readFileSync(
	path.resolve(__dirname, '../public', 'index.html')
)
const indexContentString = indexContent.toString()

app.get('/', (req, res) => {
	const embedTitle = getEmbedTitle(req.query)
	if (embedTitle) {
		console.log('embed title:', embedTitle)
		const parsedIndex = nodeHTMLParser.parse(indexContent)
		const metaTags = parsedIndex.querySelectorAll('html head meta')
		const metaTitleOG = metaTags.find(
			(node) => node.attributes?.property === 'og:title'
		)
		metaTitleOG.setAttribute('content', embedTitle)
		res.send(parsedIndex.toString())
	} else {
		res.send(indexContentString)
	}
})

app.use('/', express.static(path.resolve(__dirname, `../public`)))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server started on port ${port}`))
