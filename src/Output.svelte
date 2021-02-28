<script>
	export let timestamp
</script>

<section>
	<!-- Locale timestamp -->
	<p class="label">
		{(new Date().toString().split('(')[1] || '').slice(0, -1)}
	</p>
	<p>
		<time datetime={timestamp.toISOString()}>{timestamp.toLocaleString()}</time>
	</p>
	<hr />
	<!-- Unix timestamp -->
	<p class="label">UNIX</p>
	<p><samp>{(timestamp.getTime() / 1000) | 0}</samp></p>
	<hr />
	<!-- ISO 8601 -->
	<p class="label">ISO 8601</p>
	<p><samp id="iso">{timestamp.toISOString()}</samp></p>
</section>

<style>
	section {
		text-align: left;
		color: #eee;
		font-size: 1.8em;
		background: rgba(0, 0, 0, 0.75);
		padding: 1em 1.5em;
		white-space: nowrap;
	}

	section p {
		margin: 0.2em 0;
	}

	section .label {
		font-size: 0.9em;
		opacity: 0.85;
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
		border: 1px solid rgba(255, 255, 255, 0.2);
		margin: 1em 0;
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
