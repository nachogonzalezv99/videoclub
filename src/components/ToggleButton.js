import * as Tooltip from "@radix-ui/react-tooltip";
import { useAsync } from "hooks/useAsync";
import { BsXLg } from "react-icons/bs";
import { Spinner } from "./Spinner/Spinner";
import style from "./ToggleButton.module.scss";

function ToggleButton({
  on,
  label,
  onAction,
  offAction,
  className,
  children,
  isOptimistic,
  ...props
}) {
  const { run, error, isLoading, isError, reset } = useAsync();

  const handleClick = (e) => {
    e.preventDefault();
    if (isError) {
      reset();
    } else {
      if (on) run(onAction());
      else run(offAction());
    }
  };

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            onClick={handleClick}
            className={`${className} ${
              isError ? style.error : on ? style.active : null
            }`}
            disabled={!isOptimistic && isLoading}
            {...props}
          >
            {!isOptimistic && isLoading ? (
              <Spinner />
            ) : isError ? (
              <BsXLg />
            ) : (
              children
            )}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content
          className={`TooltipContent ${isError && "TooltipContent__error"}`}
          sideOffset={5}
        >
          {isError ? error.message : label}
          <Tooltip.Arrow
            className={`TooltipArrow ${isError && "TooltipArrow"}`}
          />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
export { ToggleButton };
