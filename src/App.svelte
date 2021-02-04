<script>
	import { selectTextOnFocus, blurOnEscape } from './inputDirectives.js'
	import Help from './Help.svelte'

	let snowflake = '',
		timestamp,
		error

	// Reset the snowflake input
	const reset = () => {
		snowflake = ''
		update()
	}

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
	{#if timestamp}
		<section class="info">
			<!-- Locale timestamp -->
			<p>
				<time datetime={timestamp.toISOString()} use:selectTextOnFocus
					>{timestamp.toLocaleString()}</time
				>
			</p>
			<p class="label">
				{(new Date().toString().split('(')[1] || '').slice(0, -1)}
			</p>
			<hr />
			<!-- Unix timestamp -->
			<p><samp>{(timestamp.getTime() / 1000) | 0}</samp></p>
			<p class="label">UNIX</p>
			<hr />
			<!-- ISO 8601 -->
			<p><samp id="unix">{timestamp.toISOString()}</samp></p>
			<p class="label">ISO 8601</p>
		</section>
	{/if}
	{#if error}
		<p>{error}</p>
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

	section.info {
		color: #eee;
		font-size: 1.5em;
		background: rgba(0, 0, 0, 0.87);
		display: table;
		margin: 0 auto;
		padding: 0.5em 1.6em;
	}

	section.info p {
		margin: 0;
	}

	section.info time {
		font-size: 2.3em;
		color: #69eaff;
		line-height: 1;
	}

	section.info samp {
		font-size: 1.8em;
		line-height: 1;
	}

	section.info hr {
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	section.info .label {
		text-transform: uppercase;
		opacity: 0.85;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	@media (max-width: 880px) {
		section.info {
			max-width: 500px;
		}
		section.info samp#unix {
			font-size: 1em;
		}
	}

	@media (max-width: 639px) {
		input {
			font-size: 1.3em;
		}

		.input-icon {
			font-size: 1.3em;
		}

		section.info {
			font-size: 1em;
			padding: 1em;
		}

		section.info time {
			font-size: 2em;
		}

		section.info samp {
			font-size: 2.4em;
		}

		section.info .label {
		}
	}
</style>
