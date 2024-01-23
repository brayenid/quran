const api = {
  getAllDatas: async () => {
    const response = await fetch('https://equran.id/api/v2/surat')
    const responseJson = response.json()
    return responseJson
  },
  getDetailByNumber: async (number) => {
    const response = await fetch(`https://equran.id/api/v2/surat/${number}`)
    const responseJson = response.json()
    return responseJson
  },
  getDetailByNumberEndpoint: (number) => `https://equran.id/api/v2/surat/${number}`,
  getTafsirByNumber: async (number) => {
    const response = await fetch(`https://equran.id/api/v2/tafsir/${number}`)
    const responseJson = response.json()
    return responseJson
  },
  getAllSurahNameAndNumberOnly: async () => {
    const response = await fetch('https://equran.id/api/v2/surat')
    const responseJson = (await response.json()).data
    const responseJsonMapped = responseJson.map(({ namaLatin, nomor }) => ({ nama: namaLatin, nomor }))
    return responseJsonMapped
  },
  getTodaysShalatSchedule: async (id) => {
    const { day, month, year } = {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    }
    const response = await fetch(`https://api.myquran.com/v1/sholat/jadwal/${id}/${year}/${month}/${day}`)
    const responseJson = (await response.json()).data
    return responseJson
  },
  getCitiesSchedule: async () => {
    const response = await fetch('https://api.myquran.com/v1/sholat/kota/semua')
    const responseJson = response.json()
    return responseJson
  }
}

module.exports = api
