export function formatLocale(date) {
	return date.toLocaleString()
}

export function getTimeZoneName(date) {
	return (date.toString().split('(')[1] || '').slice(0, -1)
}

export function getUNIX(date) {
	return (date.getTime() / 1000) | 0
}

export function getISO(date) {
	return date.toISOString()
}

// Attempt to shorten the name of a time zone
// This is guesswork prone to erroneous results and needs to be refined over time
export function getShortTimeZoneName(date) {
	const tzName = getTimeZoneName(date)
	// Keep GMT/UTC or +/- offsets
	if (/^(gmt|utc|\+|-)/gi.test(tzName)) return tzName
	const tzWords = tzName.split(' ')
	// Keep time zones that aren't 3 or 4 words
	if (tzWords.length < 2 || tzWords.length > 4) return tzName
	// Keep time zones that have any lowercase words
	if (tzWords.some((w) => w[0].toUpperCase() !== w[0])) return tzName
	// Return first letter of every word
	return tzWords.map((w) => (Number.isInteger(+w) ? w : w[0])).join('')
}

export function encodeURLFormattedTimestamp(stamp) {
	return stamp.split(' ').join('_')
}

export function decodeURLFormattedTimestamp(stamp) {
	return stamp.split('_').join(' ')
}
