<script context="module">
	import { writable } from 'svelte/store'
	export const url = writable('')
</script>

<script>
	import { selectTextOnFocus, blurOnEscape } from './inputDirectives.js'

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
	input {
		width: 340px;
	}

	fieldset {
		border: none;
		margin: 2em auto;
		padding: 0;
	}

	input,
	button {
		padding: 0.4em;
		margin: 0 0.2em;
		-moz-box-sizing: content-box;
		-webkit-box-sizing: content-box;
		box-sizing: content-box;
		line-height: 1.2em;
	}

	@media (max-width: 749px) {
		input {
			width: 190px;
		}
	}
</style>
