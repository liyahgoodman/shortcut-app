import { LitElement, html, css } from 'https://unpkg.com/@polymer/lit-element@latest/lit-element.js?module'
import { router } from 'lit-element-router'
import { AppStyles } from './App.styles'

// components
import './Router'
import './components/header/Header'

// pages
import './pages/search/Search'

class App extends router(LitElement) {
  static get styles() {
    return [css``, AppStyles]
  }

  static get properties() {
    return {
      route: { type: String },
      params: { type: Object },
      query: { type: Object },
    }
  }

  static get routes() {
    return [
      {
        name: 'search',
        pattern: 'search',
      },
      {
        name: 'not-found',
        pattern: '*',
      }
    ]
  }

  constructor() {
    super()
    this.route = ''
    this.params = {}
    this.query = {}
  }

  router(route, params, query, data) {
    this.route = route
    this.params = params
    this.query = query
  }

  render() {
    return html`
      <div class='app-container'>
        <search-page></search-page>
      </div>
    `
  }

}

customElements.define('app-container', App)
