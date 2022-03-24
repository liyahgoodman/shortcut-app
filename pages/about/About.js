import { LitElement, css, html } from "lit-element";

class About extends LitElement {
  static get styles() {
    return [css``]
  }
 
  static get properties() {
    return {
      about_id: {
        type: String,
      },
    };
  }
  constructor() {
    super();
  }

  render() {
    return html` <div>
      <h1>About this search app</h1>
    </div>`
  }
}
customElements.define('about-page', About)