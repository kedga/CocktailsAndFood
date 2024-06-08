import { Extra, Order } from "../orderTypes";
import { Navigate } from "react-router-dom";
import {
  BigWhiteBox,
  BigWhiteBoxDivider,
  BigWhiteBoxSection,
  StandardButton,
  StandardHeader,
} from "../layout_components";
import { OrderActionType, useDataContext, useOrderContext } from "../context";
import {
  IngredientSelector,
  RadiobuttonSelector,
  SpicyChilis,
} from "../components";

export default function CustomizeOrder() {
  const { dispatch, currentOrder, isOrdersEmpty } = useOrderContext();

  const { sideOptions, proteinOptions } = useDataContext();

  if (isOrdersEmpty) return <Navigate to="/menu" />;

  const updateOrder = (updatedOrder: Order) => {
    dispatch({
      type: OrderActionType.UPDATE_ORDER,
      payload: updatedOrder,
    });
  };

  const radioButtonLabel = (option: Extra) => (
    <div className="flex gap-2 text-xs flex-wrap text-nowrap select-none">
      {option.Name}
      <span className="font-normal"> (+{option.Price.toFixed(2)} kr)</span>
    </div>
  );

  return (
    <>
      <StandardHeader
        head={"Anpassa din beställning"}
        subHead={"Skapa din perfekta kombination av smaker."}
      />
      <BigWhiteBox>
        <img
          className="h-[350px] w-full object-cover"
          src={currentOrder.Meal.imageUrl}
          alt={currentOrder.Meal.title}
        />

        <BigWhiteBoxSection>
          <h3 className="mb-[10px]">{currentOrder.Meal.title}</h3>
          <div className="flex gap-3">
            <p className="font-semibold mb-[15px]">
              {currentOrder.Meal.price.toFixed(2)} kr
            </p>
            <SpicyChilis spiciness={currentOrder.Meal.spiciness} />
          </div>
          <p>{currentOrder.Meal.description}</p>
        </BigWhiteBoxSection>

        <BigWhiteBoxDivider />

        <BigWhiteBoxSection>
          <h5 className="mb-5">Val av protein, välj 1 st</h5>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-8">
            <RadiobuttonSelector
              updateAction={updateOrder}
              object={currentOrder}
              property="Protein"
              options={proteinOptions}
              optionIdProperty="Id"
              optionTitleProperty="Name"
              renderLabel={radioButtonLabel}
              wrapperClasses="flex justify-between p-4 rounded-xl border-2 border-neutral-300 items-center gap-2 hover:bg-neutral-100 cursor-pointer"
            />
          </div>
        </BigWhiteBoxSection>

        <BigWhiteBoxDivider />

        <BigWhiteBoxSection>
          <h5 className="mb-5">Ris eller sallad för bowl, välj 1 st</h5>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-8">
            <RadiobuttonSelector
              updateAction={updateOrder}
              object={currentOrder}
              property="Side"
              options={sideOptions}
              optionIdProperty="Id"
              optionTitleProperty="Name"
              renderLabel={radioButtonLabel}
              wrapperClasses="flex justify-between p-4 rounded-xl border-2 border-neutral-300 items-center gap-2 hover:bg-neutral-100 cursor-pointer"
            />
          </div>
        </BigWhiteBoxSection>

        <BigWhiteBoxDivider />

        <BigWhiteBoxSection>
          <h5 className="mb-5">Anpassa ingredienser</h5>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-8">
            <IngredientSelector />
          </div>
        </BigWhiteBoxSection>

        <BigWhiteBoxDivider />

        <BigWhiteBoxSection>
          <div className="w-full flex flex-col-reverse gap-4 items-center md:flex-row justify-between">
            <StandardButton to={"/menu"}>Avbryt</StandardButton>
            <StandardButton to={"/drinkselection"} yellow>
              Nästa steg
            </StandardButton>
          </div>
        </BigWhiteBoxSection>
      </BigWhiteBox>
    </>
  );
}
