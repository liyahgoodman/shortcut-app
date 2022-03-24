import { css } from 'lit-element'

export const NavigationLinkStyles = css`
  .nav-link {
    text-decoration: none;
    color: black;
    padding: 5px;
    margin-right: 5px;
    border-radius: 5px;
    display: inline-block;
    text-align: center;
  }
  slot {
    font-weight: bold;
  }
  .nav-link:hover {
    color: darkmagenta;
  }
`