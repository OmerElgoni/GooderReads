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

        <link rel="stylesheet" href="./navBar.css" />
        <a href="/">Home</a>
        <a href="/browse.html">Browse</a>
        <form
        class="search-bar-form"
        autocomplete="off"
        action="/search"
        aria-label="Search for books"
        >
        <input
            class="search-bar-input"
            autocomplete="off"
            name="query"
            type="text"
            placeholder="Search for books"
            aria-label="Search for books"
        />
        </form>
        <a href="/profile.html">Profile</a>

    </nav>
      `;
  }
}

customElements.define("nav-bar", NavBar);
