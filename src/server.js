import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import nodeHTMLParser from 'node-html-parser'
import express from 'express'
import { config } from 'dotenv'
import { getEmbedTitle } from './embed.js'
import { TZ_NAMES } from './util.js'

config()
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let indexContent
try {
	indexContent = fs.readFileSync(
		path.resolve(__dirname, '../build', 'index.html')
	)
} catch (e) {
	console.error(
		'Failed to load "build/index.html" - make sure you run "npm run build" first'
	)
	process.exit(1)
}

let changelogLastUpdated
try {
	const changelogText = fs.readFileSync(
		path.resolve(__dirname, '../', 'CHANGELOG.md'),
		'utf8'
	)
	changelogLastUpdated = changelogText.match(/## (\d\d\d\d-\d?\d-\d?\d)/)[1]
} catch (e) {}

app.get('/', (req, res) => {
	const query = req.query
	if (query.z || query.l) {
		console.log(
			`${new Date().toLocaleString()} ${req.get('user-agent')} - l=${
				query.l || ''
			} z=${query.z || ''} s=${query.s || ''} f=${query.f || ''}`
		)
	}
	const parsedIndex = nodeHTMLParser.parse(indexContent)
	const headElement = parsedIndex.querySelector('head')
	headElement.insertAdjacentHTML(
		'afterbegin',
		'<script>window.__SNOWSTAMP_DYNAMIC__ = true</script>'
	)
	if (changelogLastUpdated) {
		headElement.insertAdjacentHTML(
			'afterbegin',
			`<script>window.__SNOWSTAMP_CHANGELOG_LAST_UPDATED__ = '${changelogLastUpdated}'</script>`
		)
	}
	const embedTitle = getEmbedTitle(query)
	if (embedTitle) {
		console.log(
			`Embed: ${TZ_NAMES[parseInt(query.z, 36)] || ''} - ${embedTitle}`
		)
		const metaTags = headElement.querySelectorAll('meta')
		const metaTitleOG = metaTags.find(
			(node) => node.attributes?.property === 'og:title'
		)
		metaTitleOG.setAttribute('content', embedTitle)
	} else if (query.z || query.l) {
		console.log('Invalid embed!')
	}
	res.send(parsedIndex.toString())
})

app.use('/', express.static(path.resolve(__dirname, `../build`)))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server started on port ${port}`))
