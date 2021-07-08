<script>
	import { selectTextOnFocus, blurOnEscape } from './util.js'

	export let url
	export let shareStamp
	export let shortenSnowflake
	export let dynamicMode

	let copyText

	function copy() {
		const input = document.getElementById('share-url')
		input.select()
		input.setSelectionRange(0, 999) // For mobile?
		document.execCommand('copy')
		copyText = '✔️ Copied!'
	}

	$: (() => (copyText = '📋 Copy'))(url)
</script>

<fieldset>
	{#if dynamicMode}
		<label>
			<input type="checkbox" bind:checked={shareStamp} />
			<span>Show timestamp when sharing</span>
			<span>(e.g. Discord embeds)</span>
		</label>
	{/if}
	<label>
		<input type="checkbox" bind:checked={shortenSnowflake} />
		Shorten snowflake in URL
	</label>
	<input
		type="text"
		id="share-url"
		readonly
		use:selectTextOnFocus
		use:blurOnEscape
		bind:value={url}
	/><button on:click={copy}>{copyText}</button>
</fieldset>

<style>
	label {
		margin-bottom: 0.3em;
	}

	#share-url {
		width: 380px;
	}

	input[type='checkbox'] {
		margin-right: 0.3em;
	}

	fieldset {
		border: none;
		margin: 2em auto;
		padding: 0;
	}

	input[type='text'],
	button {
		padding: 0.4em;
		margin: 0 0.2em;
		-moz-box-sizing: content-box;
		-webkit-box-sizing: content-box;
		box-sizing: content-box;
		line-height: 1.2em;
	}

	span {
		display: inline-block;
	}

	@media (max-width: 749px) {
		#share-url {
			width: 190px;
		}
	}
</style>
