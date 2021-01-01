import './styles.scss';

const timerRemove = (toast, timerCount) => {
    setTimeout(function () {
        toast.innerHTML = "";
        toast.className = "";
        toast.setAttribute("class", "hide");
    }, timerCount)
}

const toastMessage = (props) => {
    const { removeTimer = true, classes = "", message = "", timerCount = "5000" } = props;
    const toast = document.getElementById("toast-message-container");
    if (toast) {
        toast.classList.remove("hide");
        toast.setAttribute("class", classes);

        toast.innerHTML = "";

        const ele_1 = document.createElement("div");
        ele_1.setAttribute("class", "toast-text icon-times-circle-o");
        ele_1.innerText = message;

        const ele_2 = document.createElement("div");
        ele_2.setAttribute("class", "icon-close");

        ele_2.onclick = function () {
            toast.innerHTML = "";
            toast.className = "";
            toast.setAttribute("class", "hide");
        };

        toast.appendChild(ele_1);
        toast.appendChild(ele_2);

        removeTimer && timerRemove(toast, timerCount);
    }
}

export { toastMessage };

export default { toastMessage };