import { LitElement, html, css } from 'lit-element'
import { navigator } from 'lit-element-router'
import { NavigationLinkStyles } from './NavigationLink.styles'

class NavigationLink extends navigator(LitElement) {
  static get styles() {
    return [css``, NavigationLinkStyles]
  }

  static get properties() {
    return {
      href: { type: String },
    }
  }
  constructor() {
    super()
    this.href = ''
  }

  handleClick(e) {
    e.preventDefault()
    this.navigate(this.href)
  }

  render() {
    return html`
      <a class='nav-link' href='${this.href}' @click='${this.handleClick}'>
        <slot></slot>
      </a>
    `
  }
  
}

customElements.define('nav-link', NavigationLink)