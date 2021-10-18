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
		isSnowy,
	} from './util.js'
	import Help from './Help.svelte'
	import Output from './Output.svelte'
	import Share from './Share.svelte'
	import Credits from './Credits.svelte'
	import { validateSnowflake } from './convert'
	import Switch from './Switch.svelte'
	import IconMoon from './IconMoon.svelte'
	import IconSun from './IconSun.svelte'
	import LetItSnow from './LetItSnow.svelte'
	import { onMount } from 'svelte'

	const dynamicMode = window.__SNOWSTAMP_DYNAMIC__
	const { SNOWFLAKE_EPOCH } = process.env
	const EPOCH = +SNOWFLAKE_EPOCH || undefined

	const queries = qs.parse(location.search)
	let snowflake = queries.s || (queries.f && decodeSnowflake(queries.f)) || '',
		timestamp,
		error,
		url,
		letItSnow

	let shareStamp = getLocalStorageBoolean('shareStamp', true)
	let shortenSnowflake = getLocalStorageBoolean('shortenSnowflake', true)
	let darkMode = getLocalStorageBoolean('darkMode', true)

	let locale, tz

	$: updateSnowflake(snowflake)
	$: dynamicMode && updateShareOptions(shareStamp, shortenSnowflake)

	$: {
		if (darkMode) window.document.body.classList.add('dark-mode')
		else window.document.body.classList.remove('dark-mode')
		localStorage.setItem('darkMode', darkMode)
	}

	onMount(() =>
		setTimeout(() => window.document.body.classList.remove('preload'))
	)

	// Validate snowflake and update timestamp or error
	function updateSnowflake() {
		timestamp = null
		error = null
		letItSnow = false
		if (!snowflake.trim()) return
		try {
			timestamp = validateSnowflake(snowflake, EPOCH)
			updateURL()
		} catch (e) {
			if (isSnowy(snowflake)) {
				letItSnow = true
			} else {
				error = e
			}
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
	<div id="dark-toggle">
		<div style="display:inline-block;position:relative; top:13px; right:2px;">
			{#if darkMode}
				<IconMoon />
			{:else}
				<IconSun />
			{/if}
		</div>
		<Switch
			bind:checked={darkMode}
			switchColorEnabled="#bbb"
			bgColorEnabled="#444"
		/>
	</div>
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
		<Output {timestamp} {darkMode} />
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
	{#if letItSnow}
		<LetItSnow />
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
		position: relative;
	}

	main h2 {
		font-size: 5em;
		margin: 0;
	}

	h1 {
		color: #008dad;
		font-size: 2em;
	}

	:global(body.dark-mode) h1 {
		color: #69eaff;
	}

	#dark-toggle {
		position: absolute;
		top: 0;
		right: 0;
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
		border: 1px solid #ccc;
		width: 380px;
	}

	:global(body.dark-mode) hr {
		border: 1px solid #333;
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
