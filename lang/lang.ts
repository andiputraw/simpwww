const id = {
    "UNAVAILABLE_LANG_HEAD": "Maaf, page ini tidak tersedia di bahasa yang anda pilih",
    "UNAVAILABLE_LANG_P": "Coba ubah bahasa di pojok kanan bawah",
}

const en = {
    "UNAVAILABLE_LANG_HEAD": "Sorry, this page is unavailable in your chosen language.",
    "UNAVAILABLE_LANG_P": "Try changing your default language in bottom right corner",
}

export function getDictLang(lang: 'id' | 'en') {
    return lang === 'en' ? en : id
}