<details>
	<summary>What is a HyperFlake?</summary>
	<p>
		A <a
			href="https://npmjs.com/packages/hyperflake"
			rel="external"
			target="_blank">HyperFlake</a
		> is a unique ID for a resource that contains a timestamp.
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
