import { LitElement, css, html, render } from 'lit-element'
import { SearchResultsStyles } from './SearchResults.styles'
import '../../components/card/Card'
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/StandardListItem.js"
import "@ui5/webcomponents/dist/Badge.js"
import "@ui5/webcomponents/dist/Button.js"
import "@ui5/webcomponents/dist/Avatar.js"
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js"
import "@ui5/webcomponents-icons/dist/locked.js"
import "@ui5/webcomponents-icons/dist/add-equipment.js"
import "@ui5/webcomponents-icons/dist/pending.js"

class SearchResults extends LitElement {
  static get styles() {
    return [css`
       header.ui5-list-header {
        padding-left: 40px;
      }
    `, SearchResultsStyles]
  }

  static get properties() {
    return {
      results: {
        type: Object,
      },
      item_id: {
        type: String,
      },
      active: {
        type: Object
      }
    }
  }

  constructor() {
    super()
    this.results = {}
    this.active = {}
    this.item_id = this.active.id
  }

  connectedCallback() {
    super.connectedCallback()

    this.renderRoot.addEventListener('click', () => {
      this.handleItemClick()
    })
  }

  handleItemClick() {
    const selected = this.shadowRoot.activeElement.renderRoot.querySelector('.card-item')
    this.item_id = selected.id
    this.getSelectedItem(this.item_id)
  }

  getSelectedItem(id) {
    const rData = this.results.data
    let item = rData.filter(res => res.id == id)
    item = {...item}

    if(item) {
      this.active = item[0]
      this.item_id = id
    }

    this.dispatchEvent(new CustomEvent('searchItem_Selected', { 
      bubbles: true,
      detail: this.active}
    ))
  }

  render() {
    const resultData = this.results.data
    if(!resultData) return
    return html`
      <div class='search-results-lists' @click="${this.handleItemClick}">
        <ui5-list class="list-header" header-text="Stories" mode="SingleSelect">
        ${this.results.data.map(
          (result) => html`
            <card-item .item=${result} .card_id=${this.results.id}></card-item>
          `
        )}
        </ui5-list>
      </div>
       <!-- ToDo: Pagination -->
    `
  }

}
customElements.define('search-results', SearchResults)