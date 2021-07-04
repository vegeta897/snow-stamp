// Converts a snowflake ID string into a JS Date object using the provided epoch (in ms), or Discord's epoch if not provided
export function convertSnowflakeToDate(snowflake, epoch = 1420070400000) {
	return new Date(snowflake / 4194304 + epoch)
}

// Validates a snowflake ID string and returns a JS Date object if valid
export function validateSnowflake(snowflake, epoch) {
	if (!Number.isInteger(+snowflake)) {
		throw "That doesn't look like a snowflake. Snowflakes contain only numbers."
	}
	if (snowflake < 4194304) {
		throw "That doesn't look like a snowflake. Snowflakes are much larger numbers."
	}
	const timestamp = convertSnowflakeToDate(snowflake, epoch)
	if (isNaN(timestamp.getTime())) {
		throw "That doesn't look like a snowflake. Snowflakes have fewer digits."
	}
	return timestamp
}
