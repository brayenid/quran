const urlParser = {
  withCombiner() {
    const url = window.location.hash.slice(1).toLowerCase()
    const splitedUrl = this._spliter(url)
    return this._combiner(splitedUrl)
  },

  withoutCombiner() {
    const url = window.location.hash.slice(1).toLowerCase()
    return this._spliter(url)
  },

  _spliter(url) {
    const urlsSplits = url.split('/')
    return {
      surah: urlsSplits[1] || null,
      noSurah: urlsSplits[2] || null,
      ayat: urlsSplits[3] || null,
      noAyat: urlsSplits[4] || null
    }
  },

  _combiner(splitedUrl) {
    const splited = (splitedUrl.surah ? `/${splitedUrl.surah}` : '/') + (splitedUrl.noSurah ? '/:noSurah' : '') + (splitedUrl.ayat ? `/${splitedUrl.ayat}` : '') + (splitedUrl.noAyat ? '/:noAyat' : '')
    return splited
  }
}

module.exports = urlParser
