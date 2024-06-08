import { useEffect, useState } from "react";
import { Meal } from "../orderTypes";
import { useNavigate } from "react-router-dom";
import createSortFunction from "../utils/createSortFunction";
import { twMerge } from "tailwind-merge";
import {
  OrderActionType,
  useDataContext,
  useOrderContext,
  useSearchParamsContext,
} from "../context";
import { StandardHeader } from "../layout_components";
import { ItemCard, SortOptionButton, SortOptions } from "../components";

export default function Menu() {
  const { getMenu } = useDataContext();
  const { dispatch } = useOrderContext();
  const { sortBy, sortDesc, filterValue, setSortParams, setFilter } =
    useSearchParamsContext();

  const navigate = useNavigate();

  const [menu, setMenu] = useState<Meal[]>([]);

  const sortOptions: SortOptions = {
    activeOption: sortBy,
    initialSortDesc: sortDesc,
    updateFunction: setSortParams,
  };

  const mealSortFunction = createSortFunction<Meal>({
    sortBy: sortBy as keyof Meal,
    sortDesc: sortDesc,
  });

  const handleClickMeal = (meal: Meal) => {
    dispatch({ type: OrderActionType.CREATE_ORDER, payload: meal });
    navigate("/detail");
  };

  useEffect(() => {
    (async () => {
      const menu = await getMenu();
      setMenu(menu);
    })();
  }, []);

  const filteredMenu = menu.filter((m) =>
    filterValue.length < 1
      ? true
      : m.description.toLowerCase().includes(filterValue.toLowerCase()) ||
        m.title.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <>
      <StandardHeader
        head={"Våra burrito bowls"}
        subHeads={[
          "Välj en bowl med ris eller sallad, grönsaker, protein och dessing/salsa.",
          "Du anpassar din beställning i nästa steg.",
        ]}
      />

      <div className="w-full flex flex-col gap-8">
        <div className="gap-6 px-6 py-4 flex justify-between w-full md:rounded-2xl overflow-hidden bg-white shadow-custom-big">
          <div className="flex gap-6 items-center shrink-0">
            <h5>Sortera efter:</h5>
            <SortOptionButton
              sortParameter={"spiciness"}
              sortOptions={sortOptions}
            >
              Kryddighet
            </SortOptionButton>
            <SortOptionButton sortParameter={"price"} sortOptions={sortOptions}>
              Pris
            </SortOptionButton>
            <SortOptionButton sortParameter={"title"} sortOptions={sortOptions}>
              Namn
            </SortOptionButton>
          </div>
          <div
            className={twMerge(
              "grow flex items-center pl-3 border-2 rounded-full w-full",
              filterValue === "" ? "border-neutral-300" : "border-yellow-400"
            )}
          >
            <i className="fa-solid fa-magnifying-glass text-neutral-400"></i>
            <input
              type="text"
              placeholder="Filtrera..."
              value={filterValue}
              spellCheck="false"
              onChange={(e) => setFilter(e.target.value)}
              className="text-sm font-semibold text-nowrap grow py-[0.4rem] px-2 outline-none bg-transparent"
            ></input>
            {filterValue && (
              <button
                className="flex px-3 hover:bg-yellow-300 duration-100 size-7 rounded-full items-center justify-center mr-1 translate-x-[1px]"
                onClick={() => setFilter("")}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>
        </div>

        {filteredMenu.length > 0 && (
          <div className="w-full flex justify-center">
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-8">
              {filteredMenu.sort(mealSortFunction).map((meal) => (
                <li key={meal._id}>
                  <ItemCard
                    item={meal}
                    onClicked={handleClickMeal}
                    spiciness={meal.spiciness}
                    imageLeft={true}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
