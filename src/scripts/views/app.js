const { stopLoading } = require('../components/Loading')
const routes = require('../routes')
const urlParser = require('../routes/urlParser')
class App {
  constructor(app) {
    this._app = document.querySelector(`${app}`)
  }

  async renderPage() {
    try {
      const url = urlParser.withCombiner()
      const page = routes[url]
      this._app.innerHTML = page.render()
      await page.afterRender()
      window.scrollTo(0, 0)
    } catch (error) {
      this._app.innerHTML = `
     <div class="notFoundPage">
        <h1>Halaman Tidak Ditemukan!</h1>
        <p>Halaman yang anda cari tidak ditemukan, kembali ke <a href="/quran/#">halaman utama?</a></p>
     </div>
     `
      stopLoading()
    }
  }
}

module.exports = App
