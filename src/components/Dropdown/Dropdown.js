import { Group } from "components/lib";
import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { callAll } from "utils/utils";
import { DropdownWrapper } from "./DropdownWrapper";
import { useEscapeKey } from "./useEscapeKey";
import { useOutsideClick } from "./useOutsideClick";

const DropdownContext = createContext();

function useDropdown() {
  const context = useContext(DropdownContext);
  if (!context) throw new Error("useDropdown must be inside a provider");
  return context;
}

function Dropdown({ ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef();
  const buttonRef = useRef();

  useEscapeKey(() => setIsOpen(false), buttonRef);
  useOutsideClick(() => setIsOpen(false), dropdownRef);

  return (
    <DropdownWrapper aria-label="Dropdown menu" ref={dropdownRef}>
      <DropdownContext.Provider
        value={{ isOpen, setIsOpen, buttonRef }}
        {...props}
      />
    </DropdownWrapper>
  );
}

Dropdown.Trigger = function Trigger({ children }) {
  const { isOpen, setIsOpen, buttonRef } = useDropdown();

  const child = typeof children === "function" ? children(isOpen) : children;

  return cloneElement(child, {
    ref: buttonRef,
    onClick: callAll(child.props.onClick, () => setIsOpen((prev) => !prev)),
    "aria-label": "Toggle dropdown",
    "aria-expanded": isOpen,
    "aria-controls": "dropdown-content",
  });
};

Dropdown.Contents = function Contents({ children }) {
  const { isOpen, setIsOpen } = useDropdown();

  if (isOpen) {
    return (
      <Group
        id="dropdown-content"
        direction="column"
        className={"dropdown__content"}
        onBlur={() => setIsOpen(false)}
      >
        {children}
      </Group>
    );
  } else return;
};

export { Dropdown };
