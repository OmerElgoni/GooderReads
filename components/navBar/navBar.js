class NavBar extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
    <nav class="nav-bar">
        <link rel="stylesheet" href="/components/navBar/navBar.css" />
        <span>
        <a id="home_link" href="/"></a>
        </span>
        <span class="nav-content">
        <a href="/browse.html">Browse</a>
        <a href="/readList.html">Read</a>
        <a href="/wishlist.html">Wishlist</a>
        <form
        id="search-bar-form"
        autocomplete="off"
        action="/pages/search/search.html"
        aria-label="Search for books"
        >
        <input
            class="search-bar-input"
            autocomplete="off"
            name="q"
            type="text"
            placeholder="Search for books"
            aria-label="Search for books"
        />
        </form>
        </span>
        <a href="/profile.html">Profile</a>

    </nav>
      `;
  }
}

customElements.define("nav-bar", NavBar);
