import { useEffect } from "react";

function useOutsideClick(handleClose, ref) {
  useEffect(() => {
    let handler = (e) => {
      if (!ref.current.contains(e.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [handleClose, ref]);
}

export { useOutsideClick };
