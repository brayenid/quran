require('../styles/main.css')
const App = require('./views/app')

const HamburgerButton = require('./components/HamburgerButton')
const ShalatSchedule = require('./components/ShalatSchedule')

const app = new App('#main')
const hamburgerButton = new HamburgerButton({ trigger: '.hamburger', target: '.topNav .left' })
// Custom Elements
require('./components/elements/SocialMedia')

window.addEventListener('DOMContentLoaded', async () => {
  app.renderPage()
  hamburgerButton.init()
})
window.addEventListener('hashchange', async () => {
  app.renderPage()
})
