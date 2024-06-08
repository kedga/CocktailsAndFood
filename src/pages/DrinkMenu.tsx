import { Navigate } from "react-router-dom";
import { useDataContext, useOrderContext } from "../context";
import {
  BigWhiteBox,
  BigWhiteBoxSection,
  StandardButton,
  StandardHeader,
} from "../layout_components";
import { DrinkComponent } from "../components";

export default function DrinkMenu() {
  const { isOrdersEmpty } = useOrderContext();

  const { drinksInfo } = useDataContext();

  if (isOrdersEmpty) return <Navigate to="/menu" />;

  return (
    <>
      <StandardHeader head={"Välj egen cocktail"} />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-8 mb-8">
        {drinksInfo
          .filter((d) => d.selectable)
          .map((d) => (
            <DrinkComponent key={d.drinkId} drinkId={d.drinkId} />
          ))}
      </div>

      <BigWhiteBox>
        <BigWhiteBoxSection>
          <div className="flex justify-center">
            <StandardButton to="/drinkselection" backArrow>
              Tillbaka
            </StandardButton>
          </div>
        </BigWhiteBoxSection>
      </BigWhiteBox>
    </>
  );
}
