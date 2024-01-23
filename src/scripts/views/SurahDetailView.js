const urlParser = require('../routes/urlParser')
const { getDetailByNumber, getAllSurahNameAndNumberOnly } = require('../api')
const { stopLoading, starLoading } = require('../components/Loading')
const SurahDetailView = {
  render() {
    return `<div class="detailContainer"></div>`
  },
  async afterRender() {
    starLoading()
    const { noSurah } = urlParser.withoutCombiner()
    const data = (await getDetailByNumber(noSurah)).data

    const container = document.querySelector('.detailContainer')
    container.innerHTML = `
    <div class="surahDetailContainer">
      <div class="menu">
        <div class="left">
          <a href="#/">&lsaquo; Kembali Ke Daftar Surah</a>
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
          <h1>${data.nomor}. ${data.namaLatin} <span class="arabic">(${data.nama})</span></h1>
          <p class="yellow">${data.arti}</p>
        </div>
        <h2 class="ayatsTitle">Ayat-ayat (${data.jumlahAyat}) :</h2>
        <div class="ayatContainer"></div>
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
      location.replace(`/#/surah/${surahSelector.value}`) // sesuaikan dengan direktori penyimpanan proyek
      container.innerHTML = ''
    })

    // melakukan looping pada pada daftar ayat
    const ayatContainer = document.querySelector('.ayatContainer')
    let ayatEl = ''
    data.ayat.forEach((ayat) => {
      const ayatAudio = Object.values(ayat.audio)[1]
      ayatEl += `
      <div class="ayat">
        <div class="ayatHead">
          <h3 class="arabic">${ayat.teksArab}</h3>
          <p>${ayat.teksLatin}</p>
        </div>
        <div class="ayatBody">
          <p><span class="nomorAyat">${ayat.nomorAyat}</span> - ${ayat.teksIndonesia}</p>
          <div class="ayatFooter">
            <div class="audioContainer">
              <audio class="ayatAudio" id="ayat-${ayat.nomorAyat}" controls controlslist="nodownload" preload="none">
                <source src="${ayatAudio}" type="audio/mpeg">
                Your browser does not support the audio element.
              </audio>
            </div>
            <a class="ayatTafsir" href="#/surah/${noSurah}/ayat/${ayat.nomorAyat}">Tafsir <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
          </div>
        </div>
      </div>`
    })
    stopLoading()

    ayatContainer.innerHTML = ayatEl
    let currentIndex = 0 // indeks autoplay

    // menghentikan audio lain saat satu audio diputar
    const audios = document.querySelectorAll('.ayatAudio')
    const stopOtherAudios = (targetAudio) => {
      audios.forEach((audio, index) => {
        if (audio === targetAudio) {
          currentIndex = index // set indeks untuk audio saat ini supaya audio autoplay dijalankan di indeks audio terakhir
          audio.parentElement.parentElement.parentElement.parentElement.classList.add('audioPlaying')
        }
        if (audio !== targetAudio) {
          audio.pause()
          audio.currentTime = 0
          audio.parentElement.parentElement.parentElement.parentElement.classList.remove('audioPlaying')
        }
      })
    }

    audios.forEach((audio) => {
      audio.addEventListener('play', () => {
        stopOtherAudios(audio)
      })
    })
    // autonext audio
    const playNextAudio = () => {
      if (currentIndex < audios.length - 1) {
        currentIndex++
        audios[currentIndex].play()
      } else {
        audios[currentIndex].parentElement.parentElement.parentElement.parentElement.classList.remove('audioPlaying')
        // Pemutaran mencapai audio terakhir
        currentIndex = 0 // Atur kembali indeks ke 0 jika ingin mengulang dari awal
      }
    }
    audios.forEach((audio) => {
      audio.addEventListener('ended', () => {
        playNextAudio()
      })
    })
  }
}

module.exports = SurahDetailView
