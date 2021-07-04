// Converts a snowflake ID string into a JS Date object using the provided epoch (in ms), or Discord's epoch if not provided
export function convertSnowflakeToDate(snowflake, epoch = 1420070400000) {
  return new Date(snowflake / 4194304 + epoch)
}
