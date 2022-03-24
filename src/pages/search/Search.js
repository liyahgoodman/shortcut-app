import { LitElement, css, html } from 'lit-element';
import '../../components/content/EditContent'
import '../../components/search/SearchResults'
import '../../components/navigation/Navigation.js'
import '../../components/navigation/NavigationLink.js'
import '../../components/search/SearchBarModal'
import '@ui5/webcomponents-fiori/dist/FlexibleColumnLayout.js'
import '@ui5/webcomponents-fiori/dist/ShellBar.js'
import "@ui5/webcomponents/dist/List.js"
import "@ui5/webcomponents/dist/Button.js"
import "@ui5/webcomponents-icons/dist/full-screen.js"
import "@ui5/webcomponents-icons/dist/add.js"
import "@ui5/webcomponents-icons/dist/decline.js"
import "@ui5/webcomponents-fiori/dist/IllustratedMessage.js"
import "@ui5/webcomponents-fiori/dist/illustrations/SimpleMagnifier.js"

class Search extends LitElement {
  static get styles() {
    return [css`
      h1 {
        text-align: center;
        font-size: 48px;
      }
      .firstColumn {
        background: white;
        border-right: 2px solid white;
        height: 100%;
      }
      .search-illustration {
        margin-top: 50px;
      }
      .flex-column {
        border-top: 1px solid rgb(217, 217, 217);
      }
      .colHeader {
        margin-top: 5px;
        display: flex;
        justify-content: end;
        margin-right: 20px;
      }
      .colHeader > * {
        margin-left: 5px;
      }
    `]
  }

  static get properties() {
    return {
      item_id: {
        type: String,
      },
      results: {
        type: Object,
      },
      selected_item: {
        type: Object
      },
      query_search: {
        type: String
      },
      page_size: {
        type: Number
      }
    }
  }

  constructor() {
    super()
    this.results = {}
    this.total = 0
    this.apiToken = ''
    this.page_size = 15
    this.ajax_url = 
    'https://api.app.shortcut.com/api/v3/search/stories'
    this.page_title = 'Search'
    this.results_text = 'Results'
  }

  connectedCallback() {
    super.connectedCallback()

    this.shadowRoot.addEventListener('searchBar_Value', data => {
      this.query_search = data.detail.query

        this.fetchData()
          .then(res => {
            this.results = res
          })
          .catch(error => {
            console.log('error' + error.message)
          })
      }
    )

    this.shadowRoot.addEventListener('editForm_Updated', data => {
      this.selected_item = data.detail
      this.updateList(this.results.data)
    })

    this.shadowRoot.addEventListener('searchItem_Selected', data => {
      this.selected_item = data.detail
      this.item_id = this.selected_item.id
    })
  }

  firstUpdated() {
    this.fcl = this.renderRoot.getElementById('fcl')
    this.midColumn = this.renderRoot.getElementById('col2list')
  }

  async fetchData() {
    const url = this.ajax_url + '?query=' + this.query_search + '&page_size=' + this.page_size
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Shortcut-Token': this.apiToken
      }
    })

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`
      throw new Error(message);
    }

    return await response.json()
  }

  _handleClick() {
    this.fcl.layout = "TwoColumnsMidExpanded"
  }

  _closeColumn() {
    this.fcl.layout = "OneColumn"
  }

  _fullColumn() {
    this.fcl.layout = "MidColumnFullScreen"
  }

  updateList(resultsData) {
    resultsData.map((res, index) => {
      if(res.id === this.selected_item.id) {
        resultsData[index] = this.selected_item
      }
    })
  }

  render() {
    return html` 
    <searchbar-modal class="searchbarmodal" .query="${this.query_search}" .page_size="${this.page_size}"></searchbar-modal>
    <div class="search-content">
      <slot name="one"></slot>
      <h1>${this.page_title}</h1>
      <ui5-flexible-column-layout id="fcl" class="flex-column">

        <!-- first column -->
        <div class="firstColumn" slot="startColumn">
          <app-header>
            <div class="subTitle">${this.results.total ? this.results.total +  ' ' + this.results_text : ''}</div>
          </app-header>          
          <search-results @click="${this._handleClick}" .results="${this.results}" .active="${this.selected_item}" .item_id="${this.item_id}"></search-results>
          ${!this.query_search ? html`<ui5-illustrated-message class="search-illustration" name="SimpleMagnifier" title="Hello"></ui5-illustrated-message>` : ''}
        </div>

        <!-- middle/last column -->
        <div class="midColumn" slot="midColumn">
          <div class="colHeader">
            <ui5-button icon="add" disabled></ui5-button>
            <ui5-button id="fullscreenMidColumn" icon="full-screen" @click="${this._fullColumn}"></ui5-button>
            <ui5-button id="closeMidColumn" icon="decline" @click="${this._closeColumn}"></ui5-button>
          </div>
          <div id="col2list">
            <edit-content .current="${this.selected_item}" .publicid="${this.item_id}"></edit-content>
          </div>
        </div>
      </ui5-flexible-column-layout>
    </div>
    `
  }
}
customElements.define('search-page', Search)