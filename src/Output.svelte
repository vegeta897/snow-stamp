<script>
	import MediaQuery from 'svelte-media-query'
	import { formatLocale, getTimeZoneName, getUNIX, getISO } from './format'
	import Switch from './Switch.svelte'
	import { getLocalStorageBoolean } from './util'

	export let darkMode

	let showUnixMilliseconds = getLocalStorageBoolean(
		'showUnixMilliseconds',
		false
	)
	let unixUnits
	$: unixUnits = showUnixMilliseconds ? 'milliseconds' : 'seconds'

	$: localStorage.setItem('showUnixMilliseconds', showUnixMilliseconds)

	export let timestamp
</script>

<section>
	<!-- Locale timestamp -->
	{#if getTimeZoneName(timestamp)}
		<p class="label">{getTimeZoneName(timestamp)}</p>
	{/if}
	<p><time datetime={getISO(timestamp)}>{formatLocale(timestamp)}</time></p>
	<hr />
	<!-- Unix timestamp -->
	<div style="display: flex">
		<div style="flex: 1 0">
			<p class="label">UNIX {unixUnits}</p>
			<p><samp>{getUNIX(timestamp, showUnixMilliseconds)}</samp></p>
		</div>
		<div>
			<MediaQuery query="(max-width: 749px)" let:matches>
				<p class="label" style="margin-bottom: {matches ? 5 : 9}px;">Units</p>
				<Switch
					bind:checked={showUnixMilliseconds}
					small={matches}
					bgColor={darkMode ? '#2a2d33' : '#999'}
					bgColorEnabled={darkMode ? '#2a2d33' : '#999'}
					switchColor={darkMode ? '#808896' : '#fff'}
					switchColorEnabled={darkMode ? '#808896' : '#fff'}
				/>
			</MediaQuery>
		</div>
	</div>
	<hr />
	<!-- ISO 8601 -->
	<p class="label">ISO 8601</p>
	<p><samp id="iso">{getISO(timestamp)}</samp></p>
</section>

<style>
	section {
		text-align: left;
		color: #eee;
		font-size: 1.8em;
		background: #404040;
		padding: 1em 1.5em;
		white-space: nowrap;
	}

	:global(body.dark-mode) section {
		background: #101314;
	}

	section ::selection {
		background: #000;
	}
	section ::-moz-selection {
		background: #000;
	}

	section p {
		margin: 0.2em 0;
	}

	section .label {
		font-size: 0.9em;
		opacity: 0.85;
	}

	:global(body.dark-mode) section .label {
		opacity: 1;
		color: #88939f;
	}

	section time {
		font-size: 1.8em;
		color: #69eaff;
		line-height: 1;
	}

	section samp {
		font-family: 'Fira Code', monospace;
		font-size: 1.45em;
		line-height: 1;
	}

	section hr {
		border: 1px solid #666;
		margin: 1em 0;
	}

	:global(body.dark-mode) section hr {
		border: 1px solid #1e2122;
	}

	@media (max-width: 749px) {
		section {
			font-size: 1.4em;
			padding: 1em;
		}

		section time {
			font-size: 1.18em;
		}

		section samp {
			font-size: 1em;
		}

		section samp#iso {
			font-size: 0.9em;
		}
	}
</style>
