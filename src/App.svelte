<script>
	import qs from 'querystringify'
	import {
		selectTextOnFocus,
		blurOnEscape,
		getLocalStorageBoolean,
		detectLocale,
		detectTimeZone,
		encodeSnowflake,
		decodeSnowflake,
	} from './util.js'
	import Help from './Help.svelte'
	import Output from './Output.svelte'
	import Share from './Share.svelte'
	import Credits from './Credits.svelte'
	import { validateSnowflake } from './convert'

	const dynamicMode = window.__SNOWSTAMP_DYNAMIC__

	const queries = qs.parse(location.search)
	let snowflake = queries.s || (queries.f && decodeSnowflake(queries.f)) || '',
		timestamp,
		error,
		url

	let epoch = +process.env.SNOWFLAKE_EPOCH || undefined

	let shareStamp = getLocalStorageBoolean('shareStamp', true)
	let shortenSnowflake = getLocalStorageBoolean('shortenSnowflake', true)

	let locale, tz

	$: updateSnowflake(snowflake)
	$: dynamicMode && updateShareOptions(shareStamp, shortenSnowflake)

	// Validate snowflake and update timestamp or error
	function updateSnowflake() {
		timestamp = null
		error = null
		if (!snowflake.trim()) return
		try {
			timestamp = validateSnowflake(snowflake, epoch)
			updateURL()
		} catch (e) {
			error = e
		}
	}

	// Update share options
	function updateShareOptions() {
		localStorage.setItem('shareStamp', shareStamp)
		localStorage.setItem('shortenSnowflake', shortenSnowflake)
		updateURL()
	}

	// Update the URL
	function updateURL() {
		const query = {}
		if (timestamp) {
			if (dynamicMode && shareStamp) {
				if (locale === undefined) locale = detectLocale()
				if (locale) query.l = locale
				if (tz === undefined) tz = detectTimeZone()
				query.z = tz
			}
			if (shortenSnowflake) {
				query.f = encodeSnowflake(snowflake)
			} else {
				query.s = snowflake
			}
		}
		window.history.replaceState(null, null, qs.stringify(query, '?'))
		url = window.location.href
	}
</script>

<main>
	<hgroup>
		<h2>❄️</h2>
		<h1>Discord Snowflake to Timestamp Converter</h1>
	</hgroup>
	<p style="margin-bottom: 0.5em;">
		Paste in a Discord snowflake to get the timestamp
	</p>
	<Help />
	<div
		style="position: relative; display: inline-flex; margin-bottom: 2em; width: 100%;"
	>
		<div class="input-icon">❄</div>
		<input
			type="text"
			bind:value={snowflake}
			use:selectTextOnFocus
			use:blurOnEscape
			placeholder="e.g. 86913608335773696"
		/>
	</div>

	{#if timestamp}
		<Output {timestamp} />
		<Share
			bind:url
			bind:shareStamp
			bind:shortenSnowflake
			{timestamp}
			{dynamicMode}
		/>
	{/if}
	{#if error}
		<p style="margin-top: 0.2em;">❌ {error}</p>
	{/if}
	<hr />
	<Credits />
</main>

<style>
	main {
		text-align: center;
		padding: 1em 0;
		max-width: 348px;
		margin: 0 auto;
	}

	main h2 {
		font-size: 5em;
		margin: 0;
	}

	h1 {
		color: #008dad;
		font-size: 2em;
	}

	p {
		font-size: 1.3em;
	}

	input {
		font-size: 2.5em;
		width: 100%;
		margin: 0;
		padding: 0.5em 0.5em 0.5em 2em;
	}

	.input-icon {
		display: inline-block;
		position: absolute;
		font-size: 2.5em;
		line-height: 1;
		height: 100%;
		opacity: 0.6;
		top: 4px;
		padding-top: 0.5em;
		padding-left: 0.5em;
	}

	hr {
		border-top: 1px solid #ccc;
		width: 380px;
	}

	@media (min-width: 750px) {
		main {
			max-width: 700px;
		}
	}

	@media (max-width: 749px) {
		input {
			font-size: 1.3em;
		}

		.input-icon {
			font-size: 1.3em;
		}

		hr {
			width: 240px;
		}
	}
</style>
