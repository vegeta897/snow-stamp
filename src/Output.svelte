<script>
	export let timestamp
</script>

{#if timestamp}
	<section>
		<!-- Locale timestamp -->
		<p>
			<time datetime={timestamp.toISOString()}
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
		<p><samp id="iso">{timestamp.toISOString()}</samp></p>
		<p class="label">ISO 8601</p>
	</section>
{/if}

<style>
	section {
		color: #eee;
		font-size: 1.8em;
		background: rgba(0, 0, 0, 0.87);
		display: table;
		margin: 0 auto;
		padding: 0.5em 1.6em;
	}

	section p {
		margin: 0;
	}

	section time {
		font-size: 2.3em;
		color: #69eaff;
		line-height: 1;
	}

	section samp {
		font-size: 2.2em;
		line-height: 1;
	}

	section hr {
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	section .label {
		text-transform: uppercase;
		opacity: 0.85;
	}

	@media (max-width: 880px) {
		section {
			max-width: 500px;
		}
		section samp#iso {
			font-size: 1.2em;
		}
	}

	@media (max-width: 639px) {
		section {
			font-size: 1.4em;
			padding: 1em;
		}

		section time {
			font-size: 2em;
		}

		section samp {
			font-size: 2.2em;
		}

		section samp#iso {
			font-size: 1em;
		}

		section .label {
		}
	}
</style>
