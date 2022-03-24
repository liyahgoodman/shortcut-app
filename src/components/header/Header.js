import { LitElement, css, html } from 'lit-element'
import '../../components/navigation/Navigation'
import '@ui5/webcomponents-fiori/dist/Bar.js'
import '@ui5/webcomponents/dist/Button.js'
import '@ui5/webcomponents-icons/dist/action-settings.js'
import '@ui5/webcomponents/dist/Toast.js'

class Header extends LitElement {
  static get styles() {
    return [css`
      .toast-body {
        padding: 0;
        text-align: left;
        font-size: 18px;
      }
    `]
  }

  static get properties() {
    return {
      eg: {
        type: String,
      },
    }
  }

  constructor() {
    super()
  }

  connectedCallback() {
    super.connectedCallback()
  }

  _openToast() {
  	const toasted = this.renderRoot.getElementById('toast')
    toasted.show()
  }

  render() {
    return html`
      <ui5-bar design='Header'>
        <navi-container slot='startContent'></navi-container>
        <slot></slot>
        <ui5-button id='settingsButton' @click="${this._openToast}" icon='action-settings' tooltip='Go to settings' slot='endContent'>
          <ui5-toast id="toast" duration=3500 placement="MiddleEnd">
            <div class="toast-body">
              <h4 style="margin:0px; padding:0px">Tips</h4>
              <div><strong>-</strong> Use arrows to navigate the application</div>
              <div><strong>-</strong> Have a Great Day!</div>
            </div>
          </ui5-toast>
        </ui5-button>
      </ui5-bar>
    `
  }
}

customElements.define('app-header', Header)
