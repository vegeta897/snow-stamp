<script>
	import { selectTextOnFocus, blurOnEscape } from './util.js'
	import Checkbox from './Checkbox.svelte'

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
	<div class="options">
		{#if dynamicMode}
			<Checkbox
				text="Show timestamp on Discord/Twitter"
				bind:checked={shareStamp}
			/>
		{/if}
		<Checkbox text="Shorten snowflake in URL" bind:checked={shortenSnowflake} />
	</div>
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
	#share-url {
		width: 380px;
	}

	fieldset {
		border: none;
		margin: 1.8em auto 2em;
		padding: 0;
	}

	.options {
		text-align: left;
		margin-left: 160px;
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

	@media (max-width: 749px) {
		.options {
			margin-left: 32px;
		}
		#share-url {
			width: 190px;
		}
	}
</style>
