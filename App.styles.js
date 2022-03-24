import { css } from 'lit-element'

export const AppStyles = css`
  .app-container {
    margin: 0 auto;
    width: 100%;
    font-family: 'Lato', sans-serif;
  }
  .app-content {
    padding: 20px 0;
  }
  h1 {
    font-size: 48px;
    font-weight: normal;
    text-align: center;
  }
  .app-body {
    text-align: justify;
  }
  .nav-container {
    display: flex;
    justify-content: space-evenly;
  }
  .card-header {
    max-width: 300px;
  }

  .card-header [slot='header'] {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-header h3 {
    margin: 0;
  }

  .card-header sl-icon-button {
    font-size: var(--sl-font-size-medium);
  }
`
