import { LitElement, css, html } from "lit-element";
import { CardStyles } from './Card.styles'
import "@ui5/webcomponents/dist/StandardListItem.js"
import "@ui5/webcomponents/dist/Badge.js"

class Card extends LitElement {
  static get styles() {
    return [css``, CardStyles]
  }
 
  static get properties() {
    return {
      card_id: {
        type: String,
      },
      item: {
        type: Object
      },
    }
  }
  
  constructor() {
    super();
    this.item = {}
  }

  connectedCallback() {
    super.connectedCallback()
  }

  render() {
    return html` 
    <!-- ToDo: Write logic for each field  -->
    <ui5-li class="card-item" id="${this.item.id}">
      <div class="card-item-header">
        <ui5-badge class="card-type">${this.item.story_type}</ui5-badge>
        <span class="card-id">${this.item.id}</span>
      </div>
      <div class="card-title">${this.item.name}</div>
      ${this.item.description ? html`<div class="card-description">${this.item.description}</div>` : ''}
      <div class="card-details">
      ${this.item.archived ? html`<div class="card-info">Archived: ${this.item.archived}</div>` : ''}
      ${this.item.completed ? html` <div class="card-info">Completed: ${this.item.completed}</div>` : ''}
      ${this.item.estimate ? html`<div class="card-info">Estimate: ${this.item.estimate} hrs</div>` : ''}
      </div>
      <div class="card-item-footer">
      ${this.item.blocker ? 
        html`<ui5-badge color-scheme="5"><ui5-icon name="add-equipment" slot="icon"></ui5-icon>Blocker</ui5-badge>` : '' }
      ${this.item.commits ? 
        html`<ui5-badge color-scheme="3"><ui5-icon name="add-equipment" slot="icon"></ui5-icon>Commits</ui5-badge>` : '' }
      ${this.item.blocked ?   
        html`<ui5-badge color-scheme="8"><ui5-icon name="locked" slot="icon"></ui5-icon>Blocked</ui5-badge>` : '' }
      ${this.item.comments ?  
        html`<ui5-badge color-scheme="6"><ui5-icon name="pending" slot="icon"></ui5-icon>Comments</ui5-badge>` : '' }
      </div>
      <ui5-icon class="card-icon-arrow" part="icon" name="slim-arrow-right" style="width:2.5rem;height:2.5rem;font-size:2.0rem;"></ui5-icon>
  </ui5-li>`
  }
}

customElements.define('card-item', Card)