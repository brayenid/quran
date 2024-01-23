const { getTodaysShalatSchedule, getCitiesSchedule } = require('../api')

class ShalatSchedule {
  constructor({ scheduleEl, selectorEl, firstCity }) {
    this.element = document.querySelector(scheduleEl)
    this.selector = document.querySelector(selectorEl)
    this.firstCity = firstCity
  }

  async init() {
    // komponent Jadwal
    const renderSchedule = async (id) => {
      const response = await getTodaysShalatSchedule(id)
      const { jadwal } = response

      let schedContainer = `
  <div class="shalatSchedContent"></div>
  `
      this.element.innerHTML = schedContainer
      jadwal.tanggal = jadwal.tanggal.split(', ')[1]
      const shalatSchedContent = document.querySelector('.shalatSchedContent')
      let content = ''

      const jadwalToArray = [{ ...jadwal }]
      const jadwalMapped = jadwalToArray.map(({ tanggal, imsak, subuh, dzuhur, ashar, maghrib, isya }) => ({ tanggal, imsak, subuh, dzuhur, ashar, maghrib, isya }))
      const jadwalObjToArray = Object.entries(jadwalMapped[0])
      jadwalObjToArray.forEach(([key, item]) => {
        content += `
          <div class="schedItem">
              <p class="item schedTime">${key}</p>
              <p class="item">${item}</p>
          </div>
          `
      })
      shalatSchedContent.innerHTML = content
    }

    const currentLocation = (await getCitiesSchedule()).filter((res) => {
      return res.lokasi.toLowerCase() === this.firstCity.toLowerCase()
    })
    await renderSchedule(currentLocation[0].id)

    // komponen selektor
    const cities = await getCitiesSchedule()
    const citiesMapped = cities.map((item) => {
      const regex = /(kota|kab)\.\s*/i
      return {
        id: item.id,
        lokasi: item.lokasi.replace(regex, '')
      }
    })

    // sort by location first letter
    citiesMapped.sort((a, b) => a.lokasi.localeCompare(b.lokasi))

    citiesMapped.forEach((res) => {
      const elementOption = document.createElement('option')
      elementOption.setAttribute('value', res.id)
      if (this.firstCity && res.lokasi.toLowerCase() === this.firstCity.toLowerCase()) {
        elementOption.setAttribute('selected', '')
      }
      elementOption.innerHTML = res.lokasi
      this.selector.appendChild(elementOption)
    })
    this.selector.addEventListener('change', async () => {
      await renderSchedule(this.selector.value)
    })
  }
}

module.exports = ShalatSchedule
