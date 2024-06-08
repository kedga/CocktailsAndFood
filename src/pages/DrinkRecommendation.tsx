import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { OrderActionType, useDataContext, useOrderContext } from "../context";
import { Cocktail } from "../orderTypes";
import {
  BigWhiteBox,
  BigWhiteBoxDivider,
  BigWhiteBoxSection,
  StandardButton,
  StandardHeader,
} from "../layout_components";

export default function DrinkRecommendation() {
  const { currentOrder, dispatch, isOrdersEmpty } = useOrderContext();

  const { drinksInfo, getCocktail } = useDataContext();

  if (isOrdersEmpty) return <Navigate to="/menu" />;

  const navigate = useNavigate();

  const [cocktail, setCocktail] = useState<Cocktail | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const drinkInfo = drinksInfo.find(
        (di) => di.associatedProteinId === currentOrder.Protein?.Id
      );
      if (!drinkInfo) return;
      const cocktail = await getCocktail(drinkInfo.drinkId);
      setCocktail(cocktail);
    })();
  }, []);

  const handleClick = () => {
    const updatedOrder = {
      ...currentOrder,
      Cocktail: cocktail,
    };

    dispatch({
      type: OrderActionType.UPDATE_ORDER,
      payload: updatedOrder,
    });
    navigate("/checkout");
  };

  return (
    <>
      <StandardHeader
        head={"Din cocktailrekommendation"}
        subHead="Låt dig inspireras av vårt förslag eller valj att skapa din egen unika smakresa genom att byta ut rekommendationen mot en annan cocktail från vår meny."
      />
      {cocktail ? (
        <BigWhiteBox>
          <BigWhiteBoxSection>
            <div className="w-full flex flex-col-reverse gap-10 items-center md:flex-row justify-between">
              <img className="h-52 md:rounded-[25px]" src={cocktail.imageUrl} />
              <div>
                <h3>{cocktail.title}</h3>
                <p className="font-semibold mt-2 mb-4">
                  {cocktail.price.toFixed(2)} kr
                </p>
                <p>{cocktail.description}</p>
              </div>
            </div>
          </BigWhiteBoxSection>

          <BigWhiteBoxDivider />

          <BigWhiteBoxSection>
            <div className="w-full flex flex-col-reverse gap-4 items-center md:flex-row justify-between">
              <StandardButton to="/detail" backArrow>
                Tillbaka
              </StandardButton>
              <StandardButton to={"/drinklist"}>
                Välj egen cocktail
              </StandardButton>
              <StandardButton onClick={handleClick} yellow>
                Acceptera förslag
              </StandardButton>
            </div>
          </BigWhiteBoxSection>
        </BigWhiteBox>
      ) : (
        <BigWhiteBox>
          <BigWhiteBoxSection>
            <div className="w-full text-center">Laddar cocktail...</div>
          </BigWhiteBoxSection>
        </BigWhiteBox>
      )}
    </>
  );
}
