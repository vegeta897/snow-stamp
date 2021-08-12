export function formatLocale(date) {
	return date.toLocaleString()
}

export function getUNIX(date, useMS) {
	let unix = date.getTime()
	if (!useMS) unix = (unix / 1000) | 0
	return unix
}

export function getISO(date) {
	return date.toISOString()
}

export function getTimeZoneName(date) {
	if (Intl?.DateTimeFormat) {
		// Modern method
		const timeZoneName = new Intl.DateTimeFormat('default', {
			timeZoneName: 'long',
		})
			.formatToParts(date)
			.find((p) => p.type.toLowerCase() === 'timezonename')
		if (timeZoneName) return timeZoneName.value
	}
	// Fallback method
	const dateString = date.toString()
	if (dateString.includes('(')) {
		return dateString.split('(')[1].slice(0, -1)
	} else if (dateString.includes('GMT')) {
		return 'GMT' + dateString.split('GMT')[1].slice(0, -1)
	}
	return ''
}
