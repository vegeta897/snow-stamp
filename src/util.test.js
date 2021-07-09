import { decodeSnowflake, encodeSnowflake } from './util'

const snowflake = '86913608335773696'
const encodedSnowflake = 'iejx9gd8h4-5g'

test('encodes snowflake into expected output', () => {
	expect(encodeSnowflake(snowflake)).toBe(encodedSnowflake)
})

test('decodes encoded snowflake into expected output', () => {
	expect(decodeSnowflake(encodedSnowflake)).toBe(snowflake)
})

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

test('encodes and decodes random valid snowflakes', () => {
	const flakeMinLength = 8
	const flakeMaxLength = 22
	function generateSnowflake() {
		const length = getRandomInt(flakeMinLength, flakeMaxLength)
		let output = ''
		while (output.length < length) {
			output += getRandomInt(output.length === 0 ? 1 : 0, 10)
		}
		return output
	}
	for (let i = 0; i < 1000; i++) {
		const randomFlake = generateSnowflake()
		expect(decodeSnowflake(encodeSnowflake(randomFlake))).toBe(randomFlake)
	}
})
