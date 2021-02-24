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

<div>
	<input
		type="text"
		id="share-url"
		readonly
		use:selectTextOnFocus
		use:blurOnEscape
		bind:value={$url}
	/><button on:click={copy}>{copyText}</button>
</div>

<style>
	div {
		font-size: 1.1em;
		margin: 1em auto 0;
		padding: 0.3em 0;
		display: table;
	}
	input {
		font-size: 0.9em;
		width: 340px;
	}
	button {
		margin: 0 0 0 0.5em;
	}

	@media (max-width: 639px) {
		input {
			width: 180px;
		}
	}
</style>
