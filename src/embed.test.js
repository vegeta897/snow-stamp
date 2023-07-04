import { getEmbedTitle } from './embed'
import { TZ_NAMES } from './util'

const snowflake = '3111206171915183114'

test('returns false if given insufficient parameters', () => {
	expect(getEmbedTitle({})).toBe(false)
	expect(getEmbedTitle({ z: '-' })).toBe(false)
	expect(getEmbedTitle({ z: '-', l: 'en-US' })).toBe(false)
})

test('returns false if given invalid snowflake', () => {
	expect(getEmbedTitle({ z: '-', s: 'abc' })).toBe(false)
	expect(getEmbedTitle({ z: '-', f: 'abc' })).toBe(false)
})

test('returns correct timestamp when no time zone specified', () => {
	expect(getEmbedTitle({ s: snowflake, l: 'en-US', z: '-' })).toBe(
		'07/04/2023 7:02:34 AM UTC'
	)
})

test('returns correct timestamp with locale format', () => {
	expect(getEmbedTitle({ s: snowflake, l: 'de', z: '-' })).toBe(
		'04.07.2023 07:02:34 UTC'
	)
	expect(getEmbedTitle({ s: snowflake, l: 'de-DE', z: '-' })).toBe(
		'04.07.2023 07:02:34 UTC'
	)
	expect(getEmbedTitle({ s: snowflake, l: 'zn', z: '-' })).toBe(
		'2023/07/04 07:02:34 UTC'
	)
})

test('returns correct timestamp with America/New_York time zone', () => {
	expect(
		getEmbedTitle({
			s: snowflake,
			l: 'en-US',
			z: TZ_NAMES.indexOf('America/New_York'),
		})
	).toBe('07/04/2023 3:02:34 AM EDT')
})
