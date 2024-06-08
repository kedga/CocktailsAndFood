import { useOrderContext } from "../context";
import { StandardButton } from "../layout_components";

export default function CartButton() {
  const { totalPrice } = useOrderContext();

  return (
    <StandardButton yellow to="/checkout" className="shadow-custom-big w-fit">
      <div className="flex items-center gap-4">
        <i className="fa-solid fa-cart-shopping text-xl"></i>
        <span>{totalPrice} kr</span>
      </div>
    </StandardButton>
  );
}
