import { css } from 'lit-element'

export const CardStyles = css`
  .card-type {
    padding: 10px;
  }
  .card-id {
    font-weight: bold;
    margin-left: 15px;
    opacity: 0.4;
    font-size: 18px;
  }
  .card-title {
    font-size: 28px;
    font-weight: normal;
    margin: 10px 0;
    height: auto;
    width: calc(90%);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .card-details {
    display: flex;
    margin: 10px 0;
    font-size: 14px;
    font-weight: 500;
  }
  .card-info {
    margin-right: 10px;
  }
  .card-description {
    font-size: 18px;
    width: calc(90%);
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .card-item {
    position: relative;
    border-bottom: 1px solid #e8e7e6;
    width: auto;
    padding: 20px;
    margin: 0;
    height: 100%;
  }

  .card-item [slot='header'] {
    display: flex;
    align-items: center;
  }

  .card-item h3 {
    margin: 0;
  }

  .card-item sl-icon-button {
    font-size: var(--sl-font-size-medium);
  }

  .card-icon-arrow {
    position: absolute;
    top: 40%;
    float: right;
    right: 0px;
    opacity: 0.5;
    color: blueviolet;
    background: gainsboro;
    border-radius: 50%;
    padding: 5px;
  }
`