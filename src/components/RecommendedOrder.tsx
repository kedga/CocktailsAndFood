import { useNavigate } from "react-router-dom";
import { OrderActionType, useOrderContext, useDataContext } from "../context";

export default function RecommendedOrder() {
  const { dispatch } = useOrderContext();
  const { getMenu, getCocktail, sideOptions, proteinOptions } =
    useDataContext();

  const navigate = useNavigate();

  const handleClick = async () => {
    const menu = await getMenu();
    const cocktail = await getCocktail("13847");

    const meal = menu.find((m) => m._id === "66016db329f983c33c7c866e");
    const side = sideOptions.find((s) => s.Id === 1);
    const protein = proteinOptions.find((p) => p.Id === 1);

    if (!meal || !protein || !side) return;

    dispatch({
      type: OrderActionType.CREATE_RECOMMENDED_ORDER,
      payload: { meal, cocktail, protein, side },
    });

    navigate("/checkout");
  };

  return (
    <>
      <button onClick={handleClick}>
        <img className="size-56" src="/img/chefs-choice-logo.png" alt="" />
        <h3 className="text-center py-2 font-ultra tracking-wider">
          KOCKENS VAL
        </h3>
      </button>
    </>
  );
}
