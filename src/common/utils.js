
import JsCookies from "js-cookie";

export function isEmptyObj(obj) {
  return Object.keys(obj).length === 0
}

export function getCookieObj() {
  let cookie_userInfo = {};
  cookie_userInfo = getCookie("userInfo")
    ? JSON.parse(getCookie("userInfo"))
    : {};
  return cookie_userInfo;
}

export function getItem(sKey) {
  return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
};

/**
 * 
 * @param {*} name cookie的key
 * @param {*} value cookie的值
 * @param {*} expires cookie的过期时间，单位是天
 */
export function setCookie(name, value, expires) {
  JsCookies.set(name, value, {
    expires
  });
}
export function getCookie(name) {
  return JsCookies.get(name);
}
export function removeCookie(name) {
  return JsCookies.remove(name);
}

export function removeItem(sKey, sPath, sDomain) {
  if (!sKey || !this.hasItem(sKey)) {
    return false;
  }
  document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
  return true;
};

export function handleDate(string) {
  let item = string.split("T")
  return item[0] + " " + item[1].substring(0, 8)
}