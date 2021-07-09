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
	if (dayjsLocales.includes(locale)) return locale
	if (dayjsLocales.includes(locale.split('-')[0])) return locale.split('-')[0]
	return 'en'
}

let epoch = +process.env.SNOWFLAKE_EPOCH || undefined

export function getEmbedTitle({ l, z, s, f }) {
	// Sanitize inputs (queries sent more than once become arrays, thanks Viper)
	l = l && l.toString()
	z = z && z.toString()
	s = s && s.toString()
	f = f && f.toString()
	if (!z) return false // No time zone means embed disabled
	let embedDate
	if (s) {
		try {
			embedDate = validateSnowflake(s, epoch)
		} catch (e) {}
	} else if (f) {
		try {
			embedDate = validateSnowflake(decodeSnowflake(f, epoch))
		} catch (e) {}
	}
	if (!embedDate) return false
	embedDate = new dayjs(embedDate).tz(TZ_NAMES[parseInt(z, 36)] || 'UTC')
	if (l) embedDate = embedDate.locale(adaptLocale(l))
	// There's a bug in Day.js where setting locale on a UTC time zone causes the original offset to be subtracted twice, so we use .utc() to force correct UTC time
	if (embedDate.utcOffset() === 0) {
		return embedDate.utc().format('L LTS') + ' UTC'
	}
	return embedDate.format('L LTS z')
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
