import { getEmbedTitle } from './embed'
import { TZ_NAMES } from './util'

const snowflake = '86913608335773696'

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
		'08/28/2015 8:03:39 PM UTC'
	)
})

test('returns correct timestamp with locale format', () => {
	expect(getEmbedTitle({ s: snowflake, l: 'de', z: '-' })).toBe(
		'28.08.2015 20:03:39 UTC'
	)
	expect(getEmbedTitle({ s: snowflake, l: 'de-DE', z: '-' })).toBe(
		'28.08.2015 20:03:39 UTC'
	)
	expect(getEmbedTitle({ s: snowflake, l: 'zn', z: '-' })).toBe(
		'2015/08/28 20:03:39 UTC'
	)
})

test('returns correct timestamp with America/New_York time zone', () => {
	expect(
		getEmbedTitle({
			s: snowflake,
			l: 'en-US',
			z: TZ_NAMES.indexOf('America/New_York'),
		})
	).toBe('08/28/2015 4:03:39 PM EDT')
})
