class SearchCard extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
    <link rel="stylesheet" href="/components/searchCard/searchCard.css" />
    <div class="card">
  <img src="" alt="" width=100 height=100 />
  <div class="card-details">
    <h3>Book Title</h3>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia sit fuga
      aut, quisquam ipsam nisi vel possimus corrupti optio similique.
    </p>
  </div>
</div>
`;
  }
}

customElements.define("search-card", SearchCard);
