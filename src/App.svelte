<script>
	import { selectTextOnFocus, blurOnEscape } from './inputDirectives.js'
	import Help from './Help.svelte'
	import Output from './Output.svelte'

	let snowflake = '',
		timestamp,
		error

	// Refresh the output
	const update = () => {
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
		timestamp = new Date(snowflake / 4194304 + 1420070400000)
	}
	update()
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
	<div style="position: relative; display: inline-flex; margin-bottom: 2em;">
		<div class="input-icon">❄</div>
		<input
			type="text"
			bind:value={snowflake}
			on:input={update}
			use:selectTextOnFocus
			use:blurOnEscape
			placeholder="e.g. 86913608335773696"
		/>
	</div>
	<Output {timestamp} />
	{#if error}
		<p style="margin-top: 0.2em;">❌ {error}</p>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 320px;
		margin: 0 auto;
	}

	main h2 {
		font-size: 5em;
		margin: 0;
	}

	h1 {
		font-family: 'PT Sans', sans-serif;
		color: #0086ad;
		font-size: 2em;
	}

	p {
		font-size: 1.3em;
	}

	input {
		font-size: 2.5em;
		width: 14.5em;
		/*padding-left: 1.5em;*/
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

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	@media (max-width: 639px) {
		input {
			font-size: 1.3em;
		}

		.input-icon {
			font-size: 1.3em;
		}
	}
</style>
