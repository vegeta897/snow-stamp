import { validateSnowflake } from './convert.js'
import { decodeSnowflake, TZ_NAMES } from './util.js'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
import localizedFormat from 'dayjs/plugin/localizedFormat.js'
import advancedFormat from 'dayjs/plugin/advancedFormat.js'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localizedFormat)
dayjs.extend(advancedFormat)

// https://github.com/iamkun/dayjs/issues/732#issuecomment-554383261
function adaptLocale(locale) {
	if (locale === 'zn') return 'zh-cn'
	if (locale === 'no') return 'nb'
	return locale
}

export function getEmbedTitle({ l, z, s, f }) {
	if (!z) return false // No time zone means embed disabled
	let embedDate
	if (s) {
		try {
			embedDate = validateSnowflake(s, +process.env.SNOWFLAKE_EPOCH)
		} catch (e) {}
	} else if (f) {
		try {
			embedDate = validateSnowflake(
				decodeSnowflake(f, +process.env.SNOWFLAKE_EPOCH)
			)
		} catch (e) {}
	}
	if (!embedDate) return false
	embedDate = dayjs(embedDate)
	if (l) embedDate = embedDate.locale(adaptLocale(l))
	if (parseInt(z, 36) >= 0) {
		const tzName = TZ_NAMES[parseInt(z, 36)]
		embedDate = embedDate.tz(tzName)
	} else {
		embedDate = embedDate.tz('UTC')
	}
	return embedDate.format('L LT z')
}

// https://unpkg.com/dayjs@1.10.6/locale.json
const dayjsLocales = [
	'af',
	'am',
	'ar-dz',
	'ar-kw',
	'ar-ly',
	'ar-ma',
	'ar-sa',
	'ar-tn',
	'ar',
	'az',
	'be',
	'bg',
	'bi',
	'bm',
	'bn',
	'bo',
	'br',
	'bs',
	'ca',
	'cs',
	'cv',
	'cy',
	'da',
	'de-at',
	'de-ch',
	'de',
	'dv',
	'el',
	'en-au',
	'en-ca',
	'en-gb',
	'en-ie',
	'en-il',
	'en-in',
	'en-nz',
	'en-sg',
	'en-tt',
	'en',
	'eo',
	'es-do',
	'es-pr',
	'es-us',
	'es',
	'fi',
	'fo',
	'fr-ca',
	'fr-ch',
	'fr',
	'fy',
	'ga',
	'gd',
	'gl',
	'gom-latn',
	'gu',
	'he',
	'hi',
	'hr',
	'ht',
	'hu',
	'hy-am',
	'id',
	'is',
	'it-ch',
	'it',
	'ja',
	'jv',
	'ka',
	'kk',
	'km',
	'kn',
	'ko',
	'ku',
	'ky',
	'lb',
	'lo',
	'lt',
	'lv',
	'me',
	'mi',
	'mk',
	'ml',
	'mn',
	'mr',
	'ms-my',
	'ms',
	'mt',
	'my',
	'nb',
	'ne',
	'nl-be',
	'nl',
	'nn',
	'oc-lnc',
	'pa-in',
	'pl',
	'pt-br',
	'pt',
	'ro',
	'ru',
	'rw',
	'sd',
	'se',
	'si',
	'sk',
	'sl',
	'sq',
	'sr-cyrl',
	'sr',
	'ss',
	'sv-fi',
	'sv',
	'sw',
	'ta',
	'te',
	'tet',
	'tg',
	'th',
	'tk',
	'tl-ph',
	'tlh',
	'tr',
	'tzl',
	'tzm-latn',
	'tzm',
	'ug-cn',
	'uk',
	'ur',
	'uz-latn',
	'uz',
	'vi',
	'x-pseudo',
	'yo',
	'zh-cn',
	'zh-hk',
	'zh-tw',
	'zh',
	'et',
	'eu',
	'fa',
]

// Load all locales
for (const locale of dayjsLocales) {
	await import(`dayjs/locale/${locale}.js`)
}
