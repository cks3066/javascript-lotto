import { $ } from './util/dom.js';
import Lotto from './object/Lotto.js';

export default class LottoController {
  constructor(lottoUI) {
    this.lottoUI = lottoUI;
    this.lottos = [];
  }

  init() {
    this.lottoUI.initUI();
    this.initEventListener();
  }

  initEventListener() {
    $('#app').addEventListener('click', event => {
      if (event.target.closest('.money-input-button')) {
        this.handleMoneyInputButton();
      }
    });
  }

  handleMoneyInputButton() {
    this.makeLottos();
    this.lottoUI.renderCheckLottoUI(this.lottos.length);
  }

  makeLottos() {
    const moneyInput = Number($('.money-input').value);

    if (moneyInput < 1000) {
      alert('최소 1000원 이상의 금액을 입력해야 합니다.');
      return;
    }

    const lottoAmount = Math.floor(moneyInput / 1000);

    for (let i = 0; i < lottoAmount; i++) {
      const lotto = new Lotto();
      lotto.setNumbers();
      this.lottos.push(lotto);
    }
  }
}