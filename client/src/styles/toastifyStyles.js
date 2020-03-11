import { css } from "glamor";

export const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: css({
      background: "rgba(212, 243, 221, 0.95) !important",
      color: "green!important",
      fontWeight: "bold",
      height: "50px!important",
      borderRadius: "5px!important"
    })
  };
  
  export const errorToastStyle = {
    ...toastOptions,
    className: css({
      background: "rgba(255,229,229, 0.95)!important",
      color: "red!important",
      fontWeight: "bold",
      borderRadius: "5px!important"
    })
  };