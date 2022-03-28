import {isEqual, isObject, transform} from 'lodash';

export class ReflectionUtil {
  private static isEmpty = value => value === undefined || value === null || value === '';

  private static iteratee = base => (result, value, key) => {
    if (!isEqual(value, base[key])) {
      const valIsObj = isObject(value) && isObject(base[key]);
      if (!(ReflectionUtil.isEmpty(value) && ReflectionUtil.isEmpty(base[key]))) {
        result[key] = valIsObj === true ? ReflectionUtil.diff(value, base[key]) : [base[key], value];
      }
    }
  }

  public static diff(obj, base) {
    return transform(obj, ReflectionUtil.iteratee(base));
  }
}
