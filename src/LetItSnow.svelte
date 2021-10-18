<script>
	import { onDestroy, onMount } from 'svelte'

	const existingContainer = document.getElementsByClassName('snow-container')[0]
	const container = existingContainer || document.createElement('div')
	container.classList.add('snow-container')
	let timeout
	function addSnowflake() {
		const flake = document.createElement('i')
		container.appendChild(flake)
		const flakeLeft = Math.floor(Math.random() * 100)
		const flakeDrift = Math.floor(-10 + Math.random() * 20)
		flake.style.setProperty('--left-start', `${flakeLeft}vw`)
		flake.style.setProperty('--left-end', `${flakeLeft + flakeDrift}vw`)
		const flakeOrientation = Math.floor(Math.random() * 360)
		let flakeSpin = Math.floor(30 + Math.random() * 180)
		if (Math.random() > 0.5) flakeSpin *= -1
		flake.style.setProperty('--angle-start', `${flakeOrientation}deg`)
		flake.style.setProperty('--angle-end', `${flakeOrientation + flakeSpin}deg`)
		const flakeDuration = Math.floor(10 + Math.random() * 10)
		flake.style.animation = `snowing ${flakeDuration}s linear 0s 1 normal forwards`
		flake.style.opacity = 0.5 + Math.random() * 0.5
		flake.style.fontSize = Math.floor(16 + Math.random() * 24) + 'px'
		setTimeout(() => {
			flake.remove()
		}, flakeDuration * 1000)
		timeout = setTimeout(addSnowflake, 200 + Math.random() * 200)
	}
	onMount(() => {
		if (!existingContainer) document.body.appendChild(container)
		addSnowflake()
	})
	onDestroy(() => clearTimeout(timeout))
</script>

<p class="let-it-snow">❄️ <em>Let it snow</em></p>

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
