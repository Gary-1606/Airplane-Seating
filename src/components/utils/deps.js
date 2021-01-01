const isEmptyObject = (obj) => {
  return (
    obj === undefined ||
    obj === null ||
    !(obj instanceof Object) ||
    Object.keys(obj).length === 0
  );
};
const isArray = (props) => {
  const givenType = typeof props;
  const isArrayBooleanVal = props instanceof Array;
  return givenType && isArrayBooleanVal;
};

const isEmptyArray = (props) => {
  const isArr = isArray(props);
  return props && props.length === 0 && isArr;
};

const isNonEmptyArray = (props) => {
  const isArr = isArray(props);
  return props && props.length && isArr;
};

const isNonEmptyValue = (value) => {
  return value !== undefined && value !== null && value !== ""; //&& !isNaN(value);
};

const hasOwnProperty = (props, key) => {
  return (
    props !== undefined &&
    props !== null &&
    props instanceof Object &&
    props.hasOwnProperty(key)
  );
};
const getAuthToken = () => {
  return getDataInLocal("x-auth-token");
};

const setAuthToken = (props) => {
  setDataInLocal("x-auth-token", props);
};

const setDataInLocal = (key, data) => {
  if (key === "x-auth-token") {
    localStorage.setItem(key, data);
  } else {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

const getDataInLocal = (key) => {
  let sessionData = "";
  if (key === "x-auth-token") {
    sessionData = localStorage.getItem(key);
  } else {
    sessionData = localStorage.getItem(key) || "{}";
    sessionData = JSON.parse(sessionData);
  }
  return sessionData;
};

const getFormJSONData = (formElement) => {
  if (!isEmptyObject(formElement)) {
    let formDataObj = new FormData(formElement);
    let data = {};
    for (let key of formDataObj.keys()) {
      data[key] = formDataObj.get(key);
    }
    return data;
  }
  return false;
};
const objectCompare = (newObj, oldObj) => {
  return JSON.stringify(newObj) === JSON.stringify(oldObj);
};
const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
export {
  setAuthToken,
  getAuthToken,
  deepCopy,
  objectCompare,
  getFormJSONData,
  getDataInLocal,
  setDataInLocal,
  isEmptyArray,
  isEmptyObject,
  isNonEmptyArray,
  hasOwnProperty,
  isNonEmptyValue,
};
