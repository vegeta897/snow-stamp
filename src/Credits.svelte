<script>
	import discord from './img/discord-logo.svg'
	import github from './img/github-logo.png'

	const changelogLastUpdated = window.__SNOWSTAMP_CHANGELOG_LAST_UPDATED__
</script>

<div class="credits">
	<p>
		<span>Questions or comments?</span>
		<span
			>Add me<img
				height="30px"
				src={discord}
				alt="Discord"
				style="position: relative; top: 11px; margin-top: -11px;"
			/><code>bravo68web</code></span
		>
	</p>
	<p>
		<a class="github" href="https://github.com/BRAVO68WEB/hyperflake-validator-ui"
			><img height="24px" src={github} alt="GitHub" /><span
				style="text-decoration: none">&nbsp;</span
			>Source</a
		>&nbsp; &mdash;&nbsp;
		<a href="https://github.com/BRAVO68WEB/hyperflake-validator-ui/blob/main/CHANGELOG.md"
			>Changelog{#if changelogLastUpdated}&nbsp;&nbsp;{changelogLastUpdated}{/if}</a
		>
	</p>
	<p class="disclaimer">
		Disclaimer: This is official HyperFlake validator. Check it out on <a href="https://github.com/BRAVO68WEB/hyperflake">GitHub</a> for more information.
	</p>
</div>

<style>
	.credits {
		color: #777;
		text-align: center;
		font-size: 1em;
		margin: auto auto 10px;
	}
	:global(body.dark-mode) .credits {
		color: #bec2cc;
	}

	code {
		font-family: 'Fira Code', monospace;
		font-size: 0.9em;
		padding: 0.2em 0.3em;
		background: #f4f4f4;
	}

	:global(body.dark-mode) code {
		color: #bcc5d7;
		background: #2f343a;
	}

	span {
		display: inline-block;
	}

	a.github img {
		position: relative;
		margin-right: 2px;
		top: 5px;
		margin-top: -5px;
	}

	:global(body.dark-mode) a.github img {
		filter: invert();
	}

	.disclaimer {
		font-size: 0.9em;
		color: #88939f;
	}
</style>
