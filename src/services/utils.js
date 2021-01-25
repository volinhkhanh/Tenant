

import _ from 'lodash';

const regexDatetimeFormat = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?/;

export const hexToRGB = function (hex) {
  hex = parseInt(hex.slice(1), 16);
  const r = hex >> 16;
  const g = hex >> 8 & 0xFF;
  const b = hex & 0xFF;
  return `rgb(${r},${g},${b})`;
};
export const hexToRGBBold = function (hex, bold) {
  hex = parseInt(hex.slice(1), 16);
  const r = hex >> 16;
  const g = hex >> 8 & 0xFF;
  const b = hex & 0xFF;
  return `rgb(${_.round(r * bold)},${_.round(g * bold)},${_.round(b * bold)})`;
};

export const hexToRGBA = function (hex, opacity) {
  opacity = opacity || 1;
  hex = parseInt(hex.slice(1), 16);
  const r = hex >> 16;
  const g = hex >> 8 & 0xFF;
  const b = hex & 0xFF;
  return `rgba(${r},${g},${b},${opacity})`;
};

export function formatNumber(x) {
  if (!_.isNumber(x)) return 0;
  x = Number((x).toFixed(1));
  n = x.toString().split('.');
  return n[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (n.length > 1 ? ',' + n[1] : '');
}

export function pad2(n) {
  return n > 9 ? '' + n : '0' + n;
}

export function formatMoney(x = '0') {
  if (!_.isNumber(x)) return '0';
  x = Number((x).toFixed(1));
  const n = x.toString().split(',');
  return n[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (n.length > 1 ? ',' + n[1] : '');
}

export function compareUserData(oldData, newData, result) {
  Object.keys(oldData).forEach((k) => {
    if (typeof oldData[k] !== 'object') {
      if (oldData[k] !== newData[k]) this.push({ old: oldData[k], new: newData[k] });
    } else {
      compareUserData(oldData[k], newData[k], this);
    }
  }, result);

  return result;
}

export function comparePickedState(next, current, keyPropsShouldRender) {
  const _next = { ..._.pick(next, keyPropsShouldRender) };
  const _current = { ..._.pick(current, keyPropsShouldRender) };
  return _.isEqual(_next, _current);
}

export function compareOmitState(next, current, keyProps = []) {
  const _next = { ..._.omit(next, keyProps) };
  const _current = { ..._.omit(current, keyProps) };
  return _.isEqual(_next, _current);
}


export const getFullName = (employee) => {
  const firstName = _.get(employee, ['firstName']) || '';
  const lastName = _.get(employee, ['lastName']) || '';
  const middleName = _.get(employee, ['middle_name']) || '';
  const fullName = _.join([lastName, middleName, firstName], ' ');
  return fullName;
};

export const validate = {
  validateText(params) {

  },

  validateDateTimeString: (params) => {
    return (typeof params === 'string' && regexDatetimeFormat.test(params));
  },

};