<script>
	import { selectTextOnFocus, blurOnEscape } from './util.js'
	import { getUNIX } from './format'
	import Checkbox from './Checkbox.svelte'

	const COPY = '📋 Copy',
		COPIED = '✔️ Copied!'

	export let url
	export let shareStamp
	export let shortenSnowflake
	export let timestamp
	export let dynamicMode

	let urlCopyText, timestampCopyText

	// TODO Refactor this and the input/button elements
	function copyURL() {
		const input = document.getElementById('share-url')
		input.select()
		input.setSelectionRange(0, 999) // For mobile?
		document.execCommand('copy')
		urlCopyText = COPIED
		timestampCopyText = COPY
	}

	function copyTimestamp() {
		const input = document.getElementById('share-timestamp')
		input.select()
		input.setSelectionRange(0, 999) // For mobile?
		document.execCommand('copy')
		timestampCopyText = COPIED
		urlCopyText = COPY
	}

	$: if (url) urlCopyText = COPY
	$: if (timestamp) timestampCopyText = COPY
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
		value={url}
	/><button on:click={copyURL}>{urlCopyText}</button>
	<label>
		<span>Discord timestamp code</span>
		<input
			type="text"
			id="share-timestamp"
			readonly
			use:selectTextOnFocus
			use:blurOnEscape
			value={`<t:${getUNIX(timestamp)}>`}
		/><button on:click={copyTimestamp}>{timestampCopyText}</button>
	</label>
</fieldset>

<style>
	#share-url {
		width: 380px;
	}

	#share-timestamp {
		width: 120px;
	}

	fieldset {
		border: none;
		margin: 26px auto;
		padding: 0;
		width: 100%;
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
		line-height: 1.3em;
	}

	label {
		margin-top: 1em;
	}

	@media (max-width: 749px) {
		.options {
			margin-left: 32px;
		}
		#share-url {
			width: 190px;
		}
		label span {
			display: block;
			margin-bottom: 0.4em;
		}
	}
</style>
