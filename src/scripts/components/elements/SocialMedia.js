class SocialMedia extends HTMLElement {
  connectedCallback() {
    this.render()
  }

  render() {
    this.innerHTML = `
        <ul class="right">
            <li>
              <a href="#"><i class="fa-brands fa-facebook"></i></a>
            </li>
            <li>
              <a href="#"><i class="fa-brands fa-twitter"></i></a>
            </li>
            <li>
              <a href="#"><i class="fa-brands fa-pinterest"></i></a>
            </li>
            <li>
              <a href="#"><i class="fa-brands fa-tumblr"></i></a>
            </li>
            <li>
              <a href="#"><i class="fa-brands fa-instagram"></i></a>
            </li>
            <li>
              <a href="#"><i class="fa-brands fa-linkedin"></i></a>
            </li>
            <li>
              <a href="#"><i class="fa-brands fa-youtube"></i></a>
            </li>
            <li>
              <a href="#"><i class="fa-brands fa-tiktok"></i></a>
            </li>
          </ul>
        `
  }
}
customElements.define('social-list', SocialMedia)
