import { css } from 'lit-element'

export const SearchBarModalStyles = css`
  h1 {
    padding: 0 30px;
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
    margin-left: 15px;
  }
  #searchbar-form {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 500px;
  }
  .searchbarmodal {
    height: 100%;
    display: flex;
    width: 100%;
    justify-content: center;
    bottom: 0;
    background: white;
    opacity: 0.8;
    right: 0;
    top: 0;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .searchbar {
    max-width: 700px;
    height: 50px;
    border-radius: 15px;
    padding: 5px;
    font-size: 16px;
    width: 100%;
  }
  .searchbar-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
  }
`