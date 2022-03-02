import View from './View.js';
import { $, $$ } from '../utils/utils.js';
import { SELECTOR } from '../constants/constants.js';

export default class CheckWinningLottosView extends View {
  constructor() {
    super();
    this.bindWinningNumberInputLimitEvent();
  }
  // ToDo: 사용자는 로또의 당첨번호를 입력할 수 있다.
  getInputWinningNumbers() {
    $$(SELECTOR.CLASS.WINNING_NUMBER_INPUT).forEach((element) => {
      if (element.classList.contains('bonus-number')) {
        console.log('bonus', element.value);
        return;
      }
      console.log(element.value);
    });
  }

  handleOnInput(index) {
    const element = $$(SELECTOR.CLASS.WINNING_NUMBER_INPUT);
    if (index === 6) {
      element[index].value = element[index].value.substr(0, 2);
      return;
    }
    if (element[index].value.length > 1) {
      element[index + 1].focus();
    }
  }

  bindWinningNumberInputLimitEvent() {
    console.log('Gd');
    $$(SELECTOR.CLASS.WINNING_NUMBER_INPUT).forEach((element, index) => {
      this.bindEvent(element, 'input', () => {
        this.handleOnInput(index);
      });
    });
  }

  // ToDo: 당첨 번호 입력 후 결과 확인하기 버튼 누르면 결과확인 모달창이 생성된다.
}
