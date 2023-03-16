import { useEffect } from "react";

function useEscapeKey(handleClose, triggerRef) {
  useEffect(() => {
    let handleEscKey = (e) => {
      if (e.key === "Escape") {
        triggerRef.current.focus();
        handleClose();
      }
    };
    document.addEventListener("keyup", handleEscKey, false);
    return () => {
      document.removeEventListener("keyup", handleEscKey, false);
    };
  }, [handleClose, triggerRef]);
}

export { useEscapeKey };
