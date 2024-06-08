import { useNavigate } from "react-router-dom";
import { OrderActionType, useOrderContext } from "../context/OrderContext";
import { useState } from "react";
import { StandardButton } from "../layout_components";

export default function CancelOrderBar() {
  const { dispatch } = useOrderContext();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const navigate = useNavigate();

  function handleCancel() {
    dispatch({
      type: OrderActionType.REMOVE_ALL_ORDERS,
    });
    setOpenModal(false);
    navigate("/");
  }

  return (
    <>
      {openModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg z-10"></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white m-auto z-20 rounded-[25px] shadow-custom-big">
            <div className="flex flex-col items-center">
              <p className="text-center text-xl p-10 -mb-2">
                Vill du avbryta beställningen?
              </p>

              <hr className="w-full border-neutral-300" />

              <div className="flex flex-row justify-between gap-8 p-10">
                <StandardButton
                  small
                  onClick={() => setOpenModal(false)}
                  className="w-52"
                >
                  Nej
                </StandardButton>
                <StandardButton
                  yellow
                  small
                  onClick={handleCancel}
                  className="w-52"
                >
                  Ja
                </StandardButton>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="bg-white w-full shadow-custom-big border-t border-neutral-200 flex justify-center">
        <button
          onClick={() => setOpenModal(true)}
          className="font-semibold leading-none p-[40px] text-sm"
        >
          <div className="flex gap-3 items-center">
            <i className="fa-solid fa-xmark"></i>
            <span>Avbryt beställning</span>
          </div>
        </button>
      </div>
    </>
  );
}
