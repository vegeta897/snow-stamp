<script context="module">
	import { writable } from 'svelte/store'
	export const url = writable('')
</script>

<script>
	import { selectTextOnFocus, blurOnEscape } from './util.js'

	export let shareStamp
	export let shortenSnowflake
	export let updateURL

	let copyText

	function copy() {
		const input = document.getElementById('share-url')
		input.select()
		input.setSelectionRange(0, 999) // For mobile?
		document.execCommand('copy')
		copyText = '✔️ Copied!'
	}

	url.subscribe(() => (copyText = '📋 Copy'))
</script>

<fieldset>
	<label>
		<input
			type="checkbox"
			bind:checked={shareStamp}
			on:change={() => updateURL(true)}
		/>
		<span>Show timestamp when sharing</span>
		<span>(e.g. Discord embeds)</span>
	</label>
	<label>
		<input
			type="checkbox"
			bind:checked={shortenSnowflake}
			on:change={() => updateURL(true)}
		/>
		Shorten snowflake in URL
	</label>
	<input
		type="text"
		id="share-url"
		readonly
		use:selectTextOnFocus
		use:blurOnEscape
		bind:value={$url}
	/><button on:click={copy}>{copyText}</button>
</fieldset>

<style>
	label {
		margin-bottom: 0.3em;
	}

	input[type='text'] {
		width: 340px;
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
		input[type='text'] {
			width: 190px;
		}
	}
</style>
