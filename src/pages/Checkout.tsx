import { CheckoutItem } from "../components/CheckoutItem";
import { OrderActionType, useOrderContext } from "../context";
import {
  BigWhiteBox,
  BigWhiteBoxDivider,
  BigWhiteBoxSection,
  StandardButton,
  StandardHeader,
} from "../layout_components";
import { useEffect } from "react";

export default function Checkout() {
  const { completedOrders, totalPrice, dispatch } = useOrderContext();

  useEffect(() => {
    dispatch({
      type: OrderActionType.CLEAN_ORDERS,
    });
  }, []);

  const checkoutItems = completedOrders.map((order) => {
    return <CheckoutItem order={order} />;
  });

  const handleClick = () => {
    if (totalPrice) {
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
  };

  return (
    <>
      <StandardHeader head={"Din Varukorg"} />
      {totalPrice > 0 ? (
        <BigWhiteBox>
          {checkoutItems}
          <BigWhiteBoxSection>
            <div className="flex justify-end">
              <h3 className="text-xl font-bold flex gap-4">
                <span>Totalt: </span>
                <span>{totalPrice} kr</span>
              </h3>
            </div>
          </BigWhiteBoxSection>
          <BigWhiteBoxDivider />
          <BigWhiteBoxSection>
            <div className="flex justify-between">
              <StandardButton to="/menu">Beställ mer</StandardButton>

              <StandardButton onClick={handleClick} yellow={true}>
                Slutför order
              </StandardButton>
            </div>
          </BigWhiteBoxSection>
        </BigWhiteBox>
      ) : (
        <BigWhiteBox>
          <BigWhiteBoxSection>
            <div className="text-center text-xl">Din varukorg är tom</div>
          </BigWhiteBoxSection>
          <BigWhiteBoxDivider />
          <BigWhiteBoxSection>
            <div className="flex justify-center">
              <StandardButton to="/menu" yellow>
                Beställ mat
              </StandardButton>
            </div>
          </BigWhiteBoxSection>
        </BigWhiteBox>
      )}
    </>
  );
}
