import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  isOrderCompleted,
  Meal,
  Order,
  getOrderPrice,
  Cocktail,
  Extra,
} from "../orderTypes";

export type OrderContextType = {
  currentOrder: Order;
  isOrdersEmpty: boolean;
  completedOrders: Order[];
  totalPrice: number;
  state: OrderState;
  dispatch: React.Dispatch<Action>;
};

interface OrderState {
  orders: Order[];
}

type Action =
  | CreateOrderAction
  | CreateRecommendedOrderAction
  | RemoveOrderAction
  | UpdateOrderAction
  | CleanOrdersAction
  | RemoveAllOrdersAction;

export enum OrderActionType {
  CREATE_ORDER,
  CREATE_RECOMMENDED_ORDER,
  REMOVE_ORDER,
  UPDATE_ORDER,
  CLEAN_ORDERS,
  REMOVE_ALL_ORDERS,
}

interface CreateOrderAction {
  type: OrderActionType.CREATE_ORDER;
  payload: Meal;
}

interface CreateRecommendedOrderAction {
  type: OrderActionType.CREATE_RECOMMENDED_ORDER;
  payload: { meal: Meal; cocktail: Cocktail; protein: Extra; side: Extra };
}

interface RemoveOrderAction {
  type: OrderActionType.REMOVE_ORDER;
  payload: number;
}

interface UpdateOrderAction {
  type: OrderActionType.UPDATE_ORDER;
  payload: Order;
}

interface CleanOrdersAction {
  type: OrderActionType.CLEAN_ORDERS;
}

interface RemoveAllOrdersAction {
  type: OrderActionType.REMOVE_ALL_ORDERS;
}

const initialState: OrderState = {
  orders: [],
};

const getNewOrderId = (prevOrders: Order[]) =>
  prevOrders.length === 0
    ? 1
    : Math.max(...prevOrders.map((order) => order.OrderId)) + 1;

const orderReducer = (state: OrderState, action: Action): OrderState => {
  switch (action.type) {
    case OrderActionType.CREATE_ORDER:
      const newOrder: Order = {
        OrderId: getNewOrderId(state.orders),
        Meal: action.payload,
      };
      return {
        ...state,
        orders: [...state.orders, newOrder],
      };
    case OrderActionType.CREATE_RECOMMENDED_ORDER:
      const recommendedOrder: Order = {
        OrderId: getNewOrderId(state.orders),
        Meal: action.payload.meal,
        Cocktail: action.payload.cocktail,
        Protein: action.payload.protein,
        Side: action.payload.side,
        IsRecommended: true,
      };
      return {
        ...state,
        orders: [...state.orders, recommendedOrder],
      };
    case OrderActionType.REMOVE_ORDER:
      return {
        ...state,
        orders: [...state.orders.filter((o) => o.OrderId !== action.payload)],
      };
    case OrderActionType.UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map((order) => {
          if (action.payload.OrderId === order.OrderId) {
            return action.payload;
          } else {
            return order;
          }
        }),
      };
    case OrderActionType.CLEAN_ORDERS:
      return {
        ...state,
        orders: state.orders.filter(
          (order) =>
            order.Cocktail !== undefined &&
            order.Protein !== undefined &&
            order.Side !== undefined
        ),
      };
    case OrderActionType.REMOVE_ALL_ORDERS:
      return {
        ...state,
        orders: [],
      };
    default:
      return state;
  }
};

export const OrderContext = createContext<OrderContextType | undefined>(
  undefined
);

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("OrderContext was null");
  }
  return context;
};

export const OrderContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  useEffect(() => {
    console.log(
      "orders: " +
        state.orders.map(
          (order) =>
            "\n  order " +
            order.OrderId +
            "\n    meal: " +
            order.Meal.title +
            "\n    protein: " +
            order.Protein?.Name +
            "\n    side: " +
            order.Side?.Name +
            "\n    cocktail: " +
            order.Cocktail?.title +
            (order.Meal.ingredients.some((i) => !i.IsIncluded)
              ? "\n    excluded ingredients: " +
                order.Meal.ingredients
                  .filter((i) => !i.IsIncluded)
                  .map((i) => "\n      " + i.Name)
                  .join("")
              : "")
        )
    );
  }, [state.orders]);

  const currentOrder = state.orders[state.orders.length - 1];
  const isOrdersEmpty = state.orders.length < 1;
  const completedOrders = state.orders.filter((order) =>
    isOrderCompleted(order)
  );
  const totalPrice = completedOrders.reduce(
    (total, order) => total + getOrderPrice(order),
    0
  );

  return (
    <OrderContext.Provider
      value={{
        state,
        dispatch,
        currentOrder,
        isOrdersEmpty,
        completedOrders,
        totalPrice,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
