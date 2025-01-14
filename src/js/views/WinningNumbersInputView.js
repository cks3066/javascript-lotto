import View from './View.js';
import { $, $$ } from '../utils/utils.js';
import { LOTTO, SELECTOR } from '../constants/constants.js';
import validateInputWinningNumbers from '../validations/CheckWinningLottos.js';

export default class WinningNumbersInputView extends View {
  constructor() {
    super();
    this.bindInputWinningNumberEvents();
    this.bindDeleteWinningNumberEvents();
    this.bindWinningNumberInputError();
  }

  getInputWinningNumbers() {
    const inputWinningNumbers = [];
    $$(SELECTOR.CLASS.WINNING_NUMBER_INPUT).forEach(element => {
      inputWinningNumbers.push(Number.parseInt(element.value));
    });
    validateInputWinningNumbers(inputWinningNumbers);
    return inputWinningNumbers;
  }

  getDuplicatedKey(duplicatedLottosMap) {
    const duplicatedKey = [];
    duplicatedLottosMap.forEach((value, key) => {
      if (value !== 1) {
        duplicatedKey.push(key);
      }
    });
    return duplicatedKey;
  }

  getDuplicatedLottosMap(elementsArrayUntilCurrentIndex) {
    const duplicatedLottosMap = new Map();
    elementsArrayUntilCurrentIndex.forEach(element => {
      if (duplicatedLottosMap.get(element.value) === undefined) {
        duplicatedLottosMap.set(element.value, 1);
        return;
      }
      duplicatedLottosMap.set(
        element.value,
        duplicatedLottosMap.get(element.value) + 1
      );
    });
    return duplicatedLottosMap;
  }

  isDuplicatedElement(element, duplicatedLottosMap) {
    return this.getDuplicatedKey(duplicatedLottosMap).some(
      item => item === element.value
    );
  }

  showError(elements, duplicatedLottosMap) {
    Array.from(elements).forEach(element => {
      if (this.isDuplicatedElement(element, duplicatedLottosMap)) {
        element.classList.add('input-alert');
      }
      if (
        element.value < LOTTO.MINIMUM_NUMBER ||
        element.value > LOTTO.MAXIMUM_NUMBER
      ) {
        element.classList.add('input-alert');
      }
    });
  }

  // 핸들러
  handleInputWinningNumber(index) {
    const elements = $$(SELECTOR.CLASS.WINNING_NUMBER_INPUT);
    elements[index].value = elements[index].value.substr(0, 2);
    if (index < LOTTO.NUMBER_QUANTITY && elements[index].value.length > 1) {
      elements[index + 1].focus();
    }
    elements.forEach(element => element.classList.remove('input-alert'));
    $(SELECTOR.ID.WINNING_NUMBER_INPUT_ALERT).textContent = '';
  }

  handleDeleteWinningNumber(event, index) {
    const elements = $$(SELECTOR.CLASS.WINNING_NUMBER_INPUT);
    if (event.key === 'Backspace') {
      if (index !== 0 && elements[index].value.length === 0)
        elements[index - 1].focus();
      return;
    }
  }

  handleWinningNumberInputError(event) {
    event.stopPropagation();
    const elements = $$(SELECTOR.CLASS.WINNING_NUMBER_INPUT);
    const duplicatedLottosMap = this.getDuplicatedLottosMap(
      Array.from(elements)
    );

    const inputWinningNumbers = Array.from(elements).map(element => {
      return Number.parseInt(element.value);
    });

    try {
      validateInputWinningNumbers(inputWinningNumbers);
    } catch (error) {
      this.showError(elements, duplicatedLottosMap);
      $(SELECTOR.ID.WINNING_NUMBER_INPUT_ALERT).textContent = error.message;
    }
  }

  // 이벤트 등록 메서드
  bindInputWinningNumberEvents() {
    $$(SELECTOR.CLASS.WINNING_NUMBER_INPUT).forEach((element, index) => {
      this.bindEvent(element, 'input', () => {
        this.handleInputWinningNumber(index);
      });
    });
  }

  bindDeleteWinningNumberEvents() {
    $$(SELECTOR.CLASS.WINNING_NUMBER_INPUT).forEach((element, index) => {
      this.bindEvent(element, 'keydown', event => {
        this.handleDeleteWinningNumber(event, index);
      });
    });
  }

  bindWinningNumberInputError() {
    $$(SELECTOR.CLASS.WINNING_NUMBER_INPUT).forEach(element => {
      this.bindEvent(element, 'input', event => {
        this.handleWinningNumberInputError(event);
      });
    });
  }
}
