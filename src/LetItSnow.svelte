<script>
	// TODO: Make this a directive?
	export let letItSnow
	const container = document.getElementsByClassName('snow-container')[0]

	export function addSnowflake(repeat) {
		const flake = document.createElement('i')
		container.appendChild(flake)
		const flakeOpacity = 0.5 + Math.random() * 0.5
		flake.style.opacity = flakeOpacity
		flake.style.fontSize = Math.floor(16 + Math.random() * 24) + 'px'
		const flakeLeft = Math.floor(Math.random() * 100)
		const flakeDrift = Math.floor(-10 + Math.random() * 20)
		const flakeOrientation = Math.floor(Math.random() * 360)
		let flakeSpin = Math.floor(50 + Math.random() * 180)
		if (Math.random() > 0.5) flakeSpin *= -1
		const animFrames = [
			{
				transform: `translate(${flakeLeft}vw, 0) rotate(${flakeOrientation}deg)`,
			},
			{
				transform: `translate(${flakeLeft + flakeDrift}vw, 110vh) rotate(${
					flakeOrientation + flakeSpin
				}deg)`,
				opacity: flakeOpacity / 2,
			},
		]
		const animOptions = { duration: Math.floor(10 + Math.random() * 10) * 1000 }
		flake.animate(animFrames, animOptions).finished.then(() => {
			flake.remove()
		})
		if (letItSnow && repeat)
			setTimeout(() => addSnowflake(true), 200 + Math.random() * 200)
	}

	$: if (letItSnow) addSnowflake(true)
</script>

{#if letItSnow}<p class="let-it-snow">❄️ <em>Let it snow</em></p>{/if}

<style>
	p.let-it-snow {
		margin-top: 0.2em;
		color: #008dad;
		font-size: 2em;
	}
	:global(body.dark-mode) p.let-it-snow {
		color: #69eaff;
	}

	:global(.snow-container) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		pointer-events: none;
		z-index: 9999;
	}

	:global(i) {
		font-style: normal;
		font-size: 2.5em;
		position: absolute;
		top: -40px;
		opacity: 0.8;
		color: #444;
	}

	:global(body.dark-mode i) {
		color: #fff;
	}

	:global(i::before) {
		content: '❄';
	}
</style>
