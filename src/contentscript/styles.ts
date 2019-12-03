import { css } from 'styled-components'

export const container: Partial<CSSStyleDeclaration> = {
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  zIndex: '10000',
  touchAction: 'none',
  userSelect: 'none',
  pointerEvents: 'none',
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end'
}

export default (css`
  @keyframes appear {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes disappear {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  .notification {
    font-family: Helvetica, 'Segoe UI', Arial, sans-serif;
    font-size: 16px;
    animation: appear 1s;
    background: #4b545e;
    border-radius: 4px;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.21);
    color: whitesmoke;
    line-height: 18px;
    margin: 10px;
    padding: 26px;
    position: relative;
    max-width: 500px;
    min-width: 200px;
    display: flex;
    align-items: center;
    pointer-events: all;
    user-select: text;
    backdrop-filter: blur(10px);
  }
  .notification .notification__content {
    display: flex;
    flex-direction: column;
    height: 80px;
  }
  h1,
  h2 {
    margin: 0;
  }
  h1 {
    font-size: 26px;
    line-height: 24px;
  }
  h2 {
    font-size: 20px;
    margin-top: 8px;
    opacity: 0.8;
  }
  .notification p {
    margin: auto 0 0 0;
  }
  .notification img {
    width: 80px;
    height: 80px;
    margin-right: 10px;
    object-fit: cover;
    border-radius: 6px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  }
  .notification.error {
    background: rgba(239, 47, 100, 0.55);
  }
  .notification.success {
    background: rgba(97, 194, 145, 0.55);
    min-width: 400px;
  }
  .notification.success p {
    font-style: italic;
  }
  .notification.info {
    background: rgba(119, 171, 226, 0.55);
  }
` as unknown) as string
