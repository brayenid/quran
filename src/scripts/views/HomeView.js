const { getAllDatas } = require('../api')
const { stopLoading, starLoading } = require('../components/Loading')
const HomeView = {
  render() {
    return `
      <div class="surahSearch">
        <div class="searchBoxContainer">
          <input type="text" placeholder="Cari surah ..." />
          <i class="fas fa-search"></i>
        </div>
      </div>
      <div class="surahContainer"></div>
    `
  },

  async afterRender() {
    starLoading()
    const { data: datas } = await getAllDatas()
    const container = document.querySelector('.surahContainer')
    let content = ''

    const renderMainPage = (datas) => {
      datas.forEach((data) => {
        content += `
        <a href="#/surah/${data.nomor}">
          <div class="surah">
            <h2>${data.nomor} - ${data.namaLatin} <span class="arabic">(${data.nama})</span></h2>
            <p>Arti : ${data.arti}</p>
            <p>Jumlah Ayat : ${data.jumlahAyat}</p>
          </div>
        </a>
        `
      })
      container.innerHTML = content
    }

    renderMainPage(datas)

    stopLoading()

    const searchBox = document.querySelector('.searchBoxContainer input')
    searchBox.addEventListener('input', () => {
      const sanitizeString = (str) => {
        return str.replace(/[-']/g, '').toLowerCase()
      }

      const datasFiltered = datas.filter((res) => {
        const sanitizedNamaLatin = sanitizeString(res.namaLatin)
        const sanitizedSearchValue = sanitizeString(searchBox.value)
        return sanitizedNamaLatin.includes(sanitizedSearchValue)
      })

      content = ''
      renderMainPage(datasFiltered)
    })
  }
}

module.exports = HomeView
