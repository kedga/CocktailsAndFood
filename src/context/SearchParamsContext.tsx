import { ReactNode, createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";

export enum SearchParams {
  SortBy = "sort",
  Descending = "desc",
  Filter = "filter",
}

type SearchParamsContextType = {
  sortBy: string;
  sortDesc: boolean;
  filterValue: string;
  setSearchParameter: ({
    paramName,
    newValue,
  }: {
    paramName: SearchParams;
    newValue: any;
  }) => void;
  setSortParams: (sortBy: string, sortDesc: boolean) => void;
  setFilter: (filterValue: string) => void;
};

const SearchParamsContext = createContext<SearchParamsContextType | undefined>(
  undefined
);

export const useSearchParamsContext = () => {
  const context = useContext(SearchParamsContext);
  if (!context) {
    throw new Error("useSearchParamsContext used outside of Provider");
  }
  return context;
};

export const SearchParamsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [searchParams, setSearchparams] = useSearchParams();

  function setSearchParameter({
    paramName,
    newValue,
  }: {
    paramName: SearchParams;
    newValue: any;
  }) {
    setSearchparams(
      (prev) => {
        if (newValue.length < 1) prev.delete(paramName);
        else prev.set(paramName, newValue.toString());
        return prev;
      },
      { replace: true }
    );
  }

  const setSortParams = (sortBy: string, sortDesc: boolean) => {
    setSearchParameter({
      paramName: SearchParams.SortBy,
      newValue: sortBy,
    });
    setSearchParameter({
      paramName: SearchParams.Descending,
      newValue: sortDesc,
    });
  };

  const setFilter = (filterValue: string) => {
    setSearchParameter({
      paramName: SearchParams.Filter,
      newValue: filterValue,
    });
  };

  const sortBy = searchParams.get(SearchParams.SortBy) ?? "";
  const sortDesc = searchParams.get(SearchParams.Descending) === "true";
  const filterValue = searchParams.get(SearchParams.Filter) ?? "";

  return (
    <SearchParamsContext.Provider
      value={{
        sortBy,
        sortDesc,
        filterValue,
        setSearchParameter,
        setSortParams,
        setFilter,
      }}
    >
      {children}
    </SearchParamsContext.Provider>
  );
};
