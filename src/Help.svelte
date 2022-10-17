<details>
	<summary>What is a snowflake?</summary>
	<p>
		A <a
			href="https://discord.com/developers/docs/reference#snowflakes"
			rel="external"
			target="_blank">Snowflake</a
		> is a unique ID for a resource which contains a timestamp.
	</p>
	<p>
		To copy a snowflake, you must have <em>Developer Mode</em> enabled in Discord.
	</p>
	<p>
		On <em>desktop</em>, click the ⚙ button next to your name and look in the
		<em>Advanced</em>
		tab.<br />Then you can right click on any message, user, or server and
		choose <em>Copy ID</em> in the menu.
	</p>
	<p>
		On <em>mobile</em>, tap on your avatar in the bottom right and look in the
		<em>Appearance</em>
		tab.<br />Then you can long-press on any message or server and choose
		<em>Copy ID</em> in the menu. For users, tap the
		<span class="button" /> button in their profile.
	</p>
	<p>
		Paste the snowflake into the box below to check the age of a Discord account
		or server.
	</p>
</details>

<style>
	details {
		text-align: left;
		margin: 0 44px 1.5em;
	}

	@media (max-width: 749px) {
		details {
			margin: 0 0 1.5em;
		}
	}

	summary {
		color: #666;
		font-size: 1.2em;
		cursor: pointer;
		font-weight: bold;
		text-align: center;
	}

	summary:hover {
		text-decoration: underline;
	}

	:global(body.dark-mode) summary {
		color: #abbef5;
	}

	em {
		font-style: normal;
		color: #666;
	}

	:global(body.dark-mode) em {
		color: #abbef5;
	}

	span.button {
		display: inline-block;
		background: #bbb;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		position: relative;
		top: 1px;
		text-align: center;
	}

	:global(body.dark-mode) span.button {
		background: #555;
	}

	span.button:before {
		position: relative;
		top: -5.5px;
		content: '...';
	}

	summary:focus {
		outline: none;
	}
</style>
