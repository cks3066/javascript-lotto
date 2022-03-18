import Lotto from '../models/Lotto.js';
import { LOTTO } from '../constants/constants.js';
import { isInRange, isDuplicated } from '../utils/utils.js';

describe('로또 단위 테스트 ', () => {
  const lotto = new Lotto();
  lotto.numbers = lotto.pickNumbers(LOTTO.MINIMUM_NUMBER, LOTTO.MAXIMUM_NUMBER);

  test('로또는 1부터 45번까지의 숫자들을 가진다.', () => {
    expect(
      isInRange(lotto.numbers, LOTTO.MINIMUM_NUMBER, LOTTO.MAXIMUM_NUMBER)
    ).toBe(true);
  });

  test('로또는 총 6개의 숫자를 가진다.', () => {
    expect(lotto.numbers).toHaveLength(6);
  });

  test('로또의 각 숫자들은 중복되지 않는다.', () => {
    expect(isDuplicated(lotto.numbers)).toBe(true);
  });
});
