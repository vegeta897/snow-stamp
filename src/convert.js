export const HYPERFLAKE_EPOCH = 946684800000

// Converts a snowflake ID string into a JS Date object using the provided epoch (in ms), or Discord's epoch if not provided
export function convertSnowflakeToDate(snowflake, epoch = HYPERFLAKE_EPOCH) {
	// Convert snowflake to BigInt to extract timestamp bits
	// https://discord.com/developers/docs/reference#snowflakes
	const milliseconds = BigInt(snowflake) >> 22n
	return new Date(Number(milliseconds) + epoch)
}

// Validates a snowflake ID string and returns a JS Date object if valid
export function validateSnowflake(snowflake, epoch) {
	if (!Number.isInteger(+snowflake)) {
		throw new Error(
			"That doesn't look like a snowflake. Snowflakes contain only numbers."
		)
	}

	if (snowflake < 4194304) {
		throw new Error(
			"That doesn't look like a snowflake. Snowflakes are much larger numbers."
		)
	}

	const timestamp = convertSnowflakeToDate(snowflake, epoch)

	if (Number.isNaN(timestamp.getTime())) {
		throw new Error(
			"That doesn't look like a snowflake. Snowflakes have fewer digits."
		)
	}

	return timestamp
}
