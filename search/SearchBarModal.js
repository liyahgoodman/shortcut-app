import { LitElement, css, html } from 'lit-element'
import { SearchBarModalStyles } from './SearchBarModal.styles'
import "@ui5/webcomponents/dist/Input.js"
import "@ui5/webcomponents-icons/dist/search.js"
import "@ui5/webcomponents/dist/Slider.js"


class SearchBarModal extends LitElement {
  static get styles() {
    return [css`
    `, SearchBarModalStyles]
  }

  constructor() {
    super();
    this.query = ''
    this.searchText = 'What stories are you interested in today?'
    this.submitButtonText = 'Submit'
  }

  static get properties() {
    return {
      query: {
        type: String,
      },
      page_size: {
        type: Number
      }
    }
  }

  _handleFormSubmit(e) {
    e.preventDefault()

    const value = this.shadowRoot.getElementById('searchbarInput').value
    console.log('this is the query: ' + value)

    if(value && value.trim().length > 0) {
        this.dispatchEvent(new CustomEvent('searchBar_Value', { 
          bubbles: true,
          detail: {
            query: value,
            psize: this.page_size
        }}))
    } else {
      window.alert('Enter a term to search')
    }

  }
  // ToDo: Form validation
  render() {
    return html`
      <div class="searchbar-container">
        <div class="searchbar-content">
          <h1>${this.searchText}</h1>
            <form id="searchbar-form" @submit=${this._handleFormSubmit} @change=${this._handleFormSubmit}>
              <ui5-input id="searchbarInput" class='searchbar' placeholder="Enter search criteria ..." ></ui5-input>
              <button class="submit-button" type="submit" name="submit" design="Emphasized">${this.submitButtonText}</button>
            </form>
        </div>
      </div>
    `
  }
}
customElements.define('searchbar-modal', SearchBarModal)