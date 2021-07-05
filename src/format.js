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

export function getShortTimeZoneName(date) {
	const tzName = getTimeZoneName(date)
	if (/^(gmt|utc|\+|-)/gi.test(tzName)) return tzName
	const tzWords = tzName.split(' ')
	if (tzWords.length < 2) return tzName
	return tzWords
		.map((w) => (Number.isInteger(+w) ? w : w[0].toUpperCase()))
		.join('')
}
