import { LitElement, html, css } from 'lit-element'
import './NavigationLink'
import { NavigationLinkStyles } from './NavigationLink.styles'
import "@ui5/webcomponents-icons/dist/home.js"

class Navigation extends LitElement {
  static get styles() {
    return [css``, NavigationLinkStyles]
  }

  static get properties() {
    return {
      nada: { type: String },
    }
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <nav-link href='/'>
        <ui5-button icon="home" tooltip="Go home"></ui5-button>
      </nav-link>
      <slot></slot>
    `
  }
}

customElements.define('navi-container', Navigation)