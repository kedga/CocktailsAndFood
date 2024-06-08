type createSortFunctionProps<T> = {
  sortBy: keyof T;
  sortDesc: boolean;
};

export default function createSortFunction<T>({
  sortBy,
  sortDesc,
}: createSortFunctionProps<T>) {
  const sortFunction = (a: T, b: T) => {
    const aValue = a[sortBy as keyof T];
    const bValue = b[sortBy as keyof T];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDesc ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDesc
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  };

  return sortFunction;
}
