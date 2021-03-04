<script>
	import qs from 'querystringify'
	import { selectTextOnFocus, blurOnEscape } from './inputDirectives.js'
	import Help from './Help.svelte'
	import Output from './Output.svelte'
	import Share, { url } from './Share.svelte'
	import Credits from './Credits.svelte'

	const EPOCH = isNaN(parseInt(process.env.SNOWFLAKE_EPOCH))
		? 1420070400000
		: parseInt(process.env.SNOWFLAKE_EPOCH)

	let snowflake = qs.parse(location.search).s || '',
		timestamp,
		error

	$: update(snowflake)

	// Refresh the output
	function update() {
		timestamp = null
		error = null
		if (!snowflake.trim()) return
		if (!Number.isInteger(+snowflake)) {
			error =
				"That doesn't look like a snowflake. Snowflakes contain only numbers."
			return
		}
		if (snowflake < 4194304) {
			error =
				"That doesn't look like a snowflake. Snowflakes are much larger numbers."
			return
		}
		timestamp = new Date(snowflake / 4194304 + EPOCH)
		window.history.replaceState(null, null, qs.stringify({ s: snowflake }, '?'))
		url.set(window.location.href)
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
		<Share />
	{/if}
	{#if error}
		<p style="margin-top: 0.2em;">❌ {error}</p>
	{/if}
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
	}
</style>
