import './css/index.css';
import './css/toggle.css';
import App from './js/app';
import LottoView from './js/ui/LottoView.js';
App();

window.addEventListener('DOMContentLoaded', () => {
  const lottoView = new LottoView();
  lottoView.bindEvents();
});
