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
			/><code>vegeta897#7777</code></span
		>
	</p>
	<p>
		<a class="github" href="https://github.com/vegeta897/snow-stamp"
			><img height="24px" src={github} alt="GitHub" /><span
				style="text-decoration: none">&nbsp;</span
			>Source</a
		>&nbsp; &mdash;&nbsp;
		<a href="https://github.com/vegeta897/snow-stamp/blob/main/CHANGELOG.md"
			>Changelog</a
		>{#if changelogLastUpdated}<span class="changelog-date"
				>{changelogLastUpdated}</span
			>{/if}
	</p>
	<p>
		<a href="https://github.com/sponsors/vegeta897"
			><span style="text-decoration: none">&nbsp;💙</span> Donate</a
		> to get your name here!
	</p>
</div>

<style>
	.credits {
		color: #777;
		text-align: center;
		font-size: 1em;
		margin: 1em auto 0;
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

	.changelog-date {
		margin-left: 0.4em;
		color: #777;
	}

	:global(body.dark-mode) .changelog-date {
		color: #a0a9ba;
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
</style>
