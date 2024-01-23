const AyatTafsirView = require('../views/AyatTafsirView')
const HomeView = require('../views/HomeView')
const SurahDetailView = require('../views/SurahDetailView')

const routes = {
  '/': HomeView,
  '/surah/:noSurah': SurahDetailView,
  '/surah/:noSurah/ayat/:noAyat': AyatTafsirView
}

module.exports = routes
