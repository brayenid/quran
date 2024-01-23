class HamburgerButton {
  constructor({ trigger, target }) {
    this._trigger = trigger
    this._target = target
    this.trigger = document.querySelector(trigger)
    this.target = document.querySelector(target)
  }
  init() {
    this.trigger.addEventListener('click', () => {
      this.target.classList.toggle('show')
    })
    document.addEventListener('click', (e) => {
      if (!e.target.closest(this._target) && !e.target.closest(this._trigger)) {
        this.target.classList.remove('show')
      }
    })
  }
}

module.exports = HamburgerButton
