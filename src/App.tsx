import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import StandardLayout from "./layout/StandardLayout";
import { useEffect } from "react";
import {
  Checkout,
  CustomizeOrder,
  DrinkMenu,
  DrinkRecommendation,
  Menu,
  NotFound,
  Welcome,
} from "./pages";

export type CartModifiers = {};

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route
        path="/menu"
        element={
          <StandardLayout cartButton chefsChoice cancelOrderBar>
            <Menu />
          </StandardLayout>
        }
      />
      <Route
        path="/detail"
        element={
          <StandardLayout cartButton cancelOrderBar>
            <CustomizeOrder />
          </StandardLayout>
        }
      />
      <Route
        path="/drinkselection"
        element={
          <StandardLayout cartButton cancelOrderBar>
            <DrinkRecommendation />
          </StandardLayout>
        }
      />
      <Route
        path="/drinklist"
        element={
          <StandardLayout cartButton cancelOrderBar>
            <DrinkMenu />
          </StandardLayout>
        }
      />
      <Route
        path="/checkout"
        element={
          <StandardLayout cancelOrderBar>
            <Checkout />
          </StandardLayout>
        }
      />
      <Route
        path="/*"
        element={
          <StandardLayout>
            <NotFound />
          </StandardLayout>
        }
      />
    </Routes>
  );
}

export default App;
