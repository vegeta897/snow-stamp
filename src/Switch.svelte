<!-- Based on https://svelte.dev/repl/35d77f2ab11e4197a19ffd8e7c4ac74e?version=3.9.1 -->
<script>
	export let checked = false
	export let bgColor = '#999'
	export let bgColorEnabled = '#2f363a'
	export let switchColor = '#fff'
	export let switchColorEnabled = '#808896'
	export let small = false
</script>

<label
	class="switch{small ? ' small' : ''}"
	style="--bg-color-enabled:{bgColorEnabled};
	--bg-color:{bgColor};
	--switch-color:{switchColor};
	--switch-color-enabled:{switchColorEnabled}"
>
	<input type="checkbox" bind:checked />
	<span class="slider" />
</label>

<style>
	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 34px;
	}

	.switch.small {
		width: 48px;
		height: 26px;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		/*noinspection CssUnresolvedCustomProperty*/
		background-color: var(--bg-color);
		-webkit-transition: 0.2s;
		transition: 0.2s;
		border-radius: 34px;
	}

	.small .slider {
		border-radius: 26px;
	}

	.slider:before {
		position: absolute;
		content: '';
		left: 4px;
		bottom: 4px;
		-webkit-transition: 0.2s;
		transition: 0.2s;
		/*noinspection CssUnresolvedCustomProperty*/
		border: 13px solid var(--switch-color);
		border-radius: 50%;
	}

	.small .slider:before {
		left: 3px;
		bottom: 3px;
		border-width: 10px;
	}

	input:checked + .slider {
		background-color: var(--bg-color-enabled);
	}

	input:checked + .slider {
		box-shadow: 0 0 1px var(--bg-color-enabled);
	}

	input:checked + .slider:before {
		/*noinspection CssUnresolvedCustomProperty*/
		border-color: var(--switch-color-enabled);
		-webkit-transform: translateX(26px);
		-ms-transform: translateX(26px);
		transform: translateX(26px);
	}

	.small input:checked + .slider:before {
		-webkit-transform: translateX(22px);
		-ms-transform: translateX(22px);
		transform: translateX(22px);
	}
</style>
