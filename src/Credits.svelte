<script>
	import discord from './img/discord-logo.svg'
	import github from './img/github-logo.png'
</script>

<div class="credits">
	<p>
		<a class="github" href="https://github.com/vegeta897/snow-stamp"
			><img
				height="24px"
				src={github}
				alt="GitHub"
				style="position: relative; margin-right: 2px; top: 5px; margin-top: -5px;"
			/><span style="text-decoration: none">&nbsp;</span>GitHub</a
		>
	</p>
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
		<span>If you want to support my projects,</span>
		<span
			><a href="https://paypal.me/spikowski" target="_blank"
				>send me a tip!<span style="text-decoration: none">&nbsp;💙</span></a
			></span
		>
	</p>
</div>

<style>
	.credits {
		color: #777;
		text-align: center;
		font-size: 1em;
		margin: 1em auto 0;
	}

	.credits code {
		font-family: 'Fira Code', monospace;
		font-size: 0.9em;
		padding: 0.2em 0.3em;
		background: #f4f4f4;
	}

	.credits span {
		display: inline-block;
	}
</style>
