import { toastMessage } from "./ToastMessage";
import { isEmptyObject } from "../utils/deps";

const selectClass = (props) => {
    let { isSuccess = "", isError = "", message = "", removeTimer = true, timerCount = "5000" } = (!isEmptyObject(props)) ? props : {}
    const typeErr = isEmptyObject(props);

    let obj = {};
    if (isSuccess) {
        obj.classes = "type-success";
        obj.message = (message) ? message : "Success";
    } else if (typeErr || isError) {
        obj.classes = "type-error";
        obj.message = (message) ? message : "Something went wrong!";
    }
    obj.removeTimer = removeTimer;
    obj.timerCount = timerCount;
    return obj
}
const errorBoundary = (props) => {
  return toastMessage(selectClass(props));
};

export { errorBoundary };
export default { errorBoundary };
