import { LitElement, css, html, render } from 'lit-element';
import { EditContentStyles } from './EditContent.styles'
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js"
import "@ui5/webcomponents/dist/Input.js"
import "@ui5/webcomponents/dist/TextArea.js"
import "@ui5/webcomponents/dist/Label.js"
import "@ui5/webcomponents/dist/Button.js"
import "@ui5/webcomponents/dist/Switch.js"
import "@ui5/webcomponents/dist/Slider.js"
import "@ui5/webcomponents/dist/Select.js"

class EditContent extends LitElement {
  static get styles() {
    return [css`
      .form-label {
        display: block;
        margin-bottom: 5px;
        font-size: 15px;
      }
      .form-input {
        height: 50px;
        border-radius: 10px;
        margin-bottom: 25px;
        max-width: 500px;
        font-size: 15px;
        padding: 10px;
        width: 100%;
      }
      .form-input-area {
        min-height: 200px;
        border-radius: 10px;
        margin-bottom: 25px;
        max-width: 500px;
        height: 175px;
        font-size: 15px;
        padding: 10px 0;
      }
      .submit-button {
        cursor: pointer;
        padding: 10px 20px;
        border: 0;
        background: darkmagenta;
        border-radius: 5px;
        min-width: 100px;
        color: white;
        font-weight: bold;
        margin-top: 25px;
      }
      form > * {
        margin-bottom: 5px;
        display: block
      }
    `, EditContentStyles];
  }

  static get properties() {
    return {
      publicid: {
        type: String,
      },
      current: {
        type: Object
      }
    }
  }

  constructor() {
    super()
    this.total = 0
    this.publicid = ''
    this.edit_body = {}
    this.apiToken = ''
    this.edit_url = 
      'https://api.app.shortcut.com/api/v3/stories/'
    this.submitButtonText = 'Submit'
    this.subHeadText = 'Edit Content'
  }

  connectedCallback() {
    super.connectedCallback()
  }

  async fetchData() {
    const url = this.edit_url + this.publicid
    const body = JSON.stringify(this.edit_body)
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Shortcut-Token': this.apiToken,
        'Content-Type': 'application/json'
      },
      body: body
    })

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`
      throw new Error(message);
    }
    return await response.json()
  }

  _handleSubmit (e) {
    e.preventDefault()
    const contentForm = e.target
    
    // get data from form and convert to object
    let obj = {}
    const formdata = new URLSearchParams(new FormData(contentForm))
    formdata.forEach((value, key) => obj[key] = value)
    this.edit_body = {...this.edit_body, ...obj}

    this.fetchData()
      .then(res => {
        this.current = res
        this.eventFormUpdate()
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  // broadcast the form has been updated
  eventFormUpdate() {
    this.dispatchEvent(new CustomEvent('editForm_Updated', { 
      bubbles: true,
      detail: this.current
    }))
  }

  getStoryType(e) {
    this.edit_body.story_type = e.detail.selectedOption.value
  }
 
  render() {
    const result = this.current || ''
    return html`
      <div class="edit-content">
        <h3>${this.subHeadText}</h3>        
        <div class='edit-form'>
          <!-- ToDo: Put in own package (form)  -->
          <!-- ToDo: Write validation for submit  -->
          <form id="edit-content-form" @submit=${this._handleSubmit} >

            <ui5-label class="form-label" for="myInput">Name</ui5-label>
            <ui5-input id="myInput" class="form-input" name="name" type="text" value="${result.name}" placeholder="Enter your Name"></ui5-input>

            <ui5-label class="form-label" for="myInput2">Description</ui5-label>
            <ui5-textarea id="myInput2" class="form-input-area" name="description" value="${result.description}" placeholder="Type some text" show-exceeded-text></ui5-textarea>

            <ui5-label class="form-label" for="myInput2">Story Type</ui5-label>
            <ui5-select class="select" @change="${this.getStoryType}">
              <ui5-option value="feature" ${result.story_type === 'feature' ? html`selected` : ''}>Feature</ui5-option>
              <ui5-option value="bug" ${result.story_type === 'bug' ? html`selected` : ''}>Bug</ui5-option>
              <ui5-option value="chore" ${result.story_type === 'chore' ? html`selected` : ''}>Chore</ui5-option>
            </ui5-select>

            <button class="submit-button" type="submit" name="submit" design="Emphasized">${this.submitButtonText}</button>
          </form>
        </div>
      </div>
    `
  }
  
}
customElements.define('edit-content', EditContent)