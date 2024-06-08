import { ReactNode, useState } from "react";
import { StandardButton } from "../layout_components";
import { twMerge } from "tailwind-merge";

export type SortOptions = {
  activeOption: string;
  initialSortDesc: boolean;
  updateFunction: (sortBy: string, sortDesc: boolean) => void;
};

export default function SortOptionButton<T>({
  children,
  sortParameter,
  sortOptions: { activeOption, initialSortDesc, updateFunction },
}: {
  children: ReactNode;
  sortOptions: SortOptions;
  sortParameter: keyof T;
}) {
  const active = activeOption === sortParameter;

  const [descending, setDescending] = useState(active ? initialSortDesc : true);

  const handleClick = () => {
    if (!active) {
      updateFunction(sortParameter as string, descending);
    }
    if (active) {
      updateFunction(sortParameter, !descending);
      setDescending((prev) => !prev);
    }
  };

  return (
    <StandardButton
      onClick={handleClick}
      yellow={active}
      className="w-fit h-fit px-4 gap-2 shrink-0"
      small
    >
      {children}{" "}
      <i
        className={twMerge(
          "translate-y-[1px] fa-solid",
          descending ? "fa-angle-down" : "fa-angle-up",
          active ? "text-neutral-900" : "text-neutral-300"
        )}
      ></i>
    </StandardButton>
  );
}
