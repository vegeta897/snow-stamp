export function formatLocale(date) {
	return date.toLocaleString()
}

export function getUNIX(date) {
	return (date.getTime() / 1000) | 0
}

export function getISO(date) {
	return date.toISOString()
}

export function getTimeZoneName(date) {
	const dateString = date.toString()
	if (dateString.includes('(')) {
		return dateString.split('(')[1].slice(0, -1)
	} else if (dateString.includes('GMT')) {
		return 'GMT' + dateString.split('GMT')[1].slice(0, -1)
	}
	return ''
}
