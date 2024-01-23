const urlParser = require('../routes/urlParser')
const { getTafsirByNumber, getAllSurahNameAndNumberOnly } = require('../api')
const { stopLoading, starLoading } = require('../components/Loading')
const AyatTafsirView = {
  render() {
    return `<div class="ayatTafsirContainer"></div>`
  },
  async afterRender() {
    starLoading()
    const { noSurah, noAyat } = urlParser.withoutCombiner()
    const data = (await getTafsirByNumber(noSurah)).data
    const tafsirContent = data.tafsir[noAyat - 1]
    stopLoading()

    const container = document.querySelector('.ayatTafsirContainer')
    container.innerHTML = `
    <div class="surahDetailContainer">
        <div class="menu">
            <div class="left">
                <a href="#/surah/${noSurah}">&lsaquo; Kembali Ke Detail ${data.namaLatin}</a>
            </div>
            <div class="right">
                <form>
                <label for="selectedSurah">Pilih Surah : </label>
                <select id="selectedSurah">
                </select>
                </form>
            </div>
            </div>
            <div class="surahDetailMain">
            <div class="titleContainer">
                <h1>Tafsir : ${noSurah}. ${data.namaLatin} <span class="arabic">(${data.nama})</span></h1>
                <p class="yellow">Ayat ${noAyat}</p>
            </div>
            <div class="tafsirBody">
            <p>${tafsirContent.teks}</p>
            </div>
        </div>
    </div>
    `

    // menambahkan elemen selector surah
    const surahSelector = document.querySelector('#selectedSurah')
    const getSurahNameAndNumber = await getAllSurahNameAndNumberOnly()
    getSurahNameAndNumber.forEach((res) => {
      const elementOption = document.createElement('option')
      elementOption.setAttribute('value', res.nomor)
      const { noSurah } = urlParser.withoutCombiner()
      if (res.nomor === Number(noSurah)) {
        elementOption.setAttribute('selected', '')
      }
      elementOption.innerHTML = res.nama
      surahSelector.appendChild(elementOption)
    })

    //menambahkan fungsi pada selector surah
    surahSelector.addEventListener('change', () => {
      location.replace(`/quran/#/surah/${surahSelector.value}`) // sesuaikan dengan direktori penyimpanan proyek
      container.innerHTML = ''
    })
  }
}
module.exports = AyatTafsirView
