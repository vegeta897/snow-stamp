import {
	convertSnowflakeToDate,
	DISCORD_EPOCH,
	validateSnowflake,
} from './convert'

const snowflake = '86913608335773696'
const defaultUnix = 1440792219004

test('converts snowflake to correct date', () => {
	expect(convertSnowflakeToDate(snowflake).getTime()).toBe(defaultUnix)
})

test('converts snowflake to correct date with custom epoch', () => {
	const epoch = 1000
	expect(convertSnowflakeToDate(snowflake, epoch).getTime()).toBe(
		defaultUnix - DISCORD_EPOCH + epoch
	)
})

test('returns date for valid snowflake', () => {
	expect(validateSnowflake(snowflake)).toBeInstanceOf(Date)
	expect(validateSnowflake(snowflake, 1000)).toBeInstanceOf(Date)
})

test('throws if snowflake is not an integer', () => {
	expect(() => validateSnowflake('abc')).toThrow()
})

test('throws if snowflake is too short', () => {
	expect(() => validateSnowflake('1000')).toThrow()
})

test('throws if snowflake is too long', () => {
	expect(() => validateSnowflake('9'.repeat(23))).toThrow()
})
