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
