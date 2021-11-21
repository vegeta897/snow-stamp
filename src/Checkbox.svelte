<script>
	export let checked = false
	export let text
</script>

<label class="check">
	{text}
	<input type="checkbox" bind:checked />
	<span class="checkmark" />
</label>

<style>
	/* https://www.w3schools.com/howto/howto_css_custom_checkbox.asp */
	/* Customize the label (the container) */
	.check {
		display: block;
		position: relative;
		padding-left: 35px;
		margin-bottom: 12px;
		cursor: pointer;
		font-size: 18px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	/* Hide the browser's default checkbox */
	.check input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	/* Create a custom checkbox */
	.checkmark {
		position: absolute;
		top: 0;
		left: 0;
		height: 25px;
		width: 25px;
		background-color: #afbcce;
	}

	/* On mouse-over, add a grey background color */
	.check:hover input ~ .checkmark {
		background-color: #c8d7e8;
	}

	/* When the checkbox is checked, add a blue background */
	.check input:checked ~ .checkmark {
		background-color: #0074ad;
	}

	/* Create the checkmark/indicator (hidden when not checked) */
	.checkmark:after {
		content: '';
		position: absolute;
		display: none;
	}

	/* Show the checkmark when checked */
	.check input:checked ~ .checkmark:after {
		display: block;
	}

	/* Style the checkmark/indicator */
	.check .checkmark:after {
		left: 9px;
		top: 5px;
		width: 5px;
		height: 10px;
		border: solid white;
		border-width: 0 3px 3px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}

	@media (max-width: 749px) {
		.check {
			font-size: 16px;
		}
	}
</style>
