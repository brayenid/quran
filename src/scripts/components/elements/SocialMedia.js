class SocialMedia extends HTMLElement {
  connectedCallback() {
    this.render()
  }

  render() {
    this.innerHTML = `
        <ul class="right">
            <li>
              <a href="https://www.facebook.com/profile.php?id=100065311337133" target="_blank"><i class="fa-brands fa-facebook"></i></a>
            </li>
            <li>
              <a href="https://twitter.com/Duniaislam241" target="_blank"><i class="fa-brands fa-twitter"></i></a>
            </li>
            <li>
              <a href="https://id.pinterest.com/duniaislam241/" target="_blank"><i class="fa-brands fa-pinterest"></i></a>
            </li>
            <li>
              <a href="https://www.tumblr.com/blog/duniaislam" target="_blank"><i class="fa-brands fa-tumblr"></i></a>
            </li>
            <li>
              <a href="https://www.instagram.com/banjar.santri/" target="_blank"><i class="fa-brands fa-instagram"></i></a>
            </li>
            <li>
              <a href="https://linkedin.com/in/dunia-islam-73473427a" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
            </li>
            <li>
              <a href="https://www.youtube.com/channel/UCyirRAaAo3Jt9fAj9Q9iIrQ" target="_blank"><i class="fa-brands fa-youtube"></i></a>
            </li>
            <li>
              <a href="https://www.tiktok.com/@duniaislam241?lang=en" target="_blank"><i class="fa-brands fa-tiktok"></i></a>
            </li>
          </ul>
        `
  }
}
customElements.define('social-list', SocialMedia)
