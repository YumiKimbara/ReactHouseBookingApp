import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ScrollToTop from "./ScrollToTop";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Home from "../Components/Home";
import FadeIn from "react-fade-in";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropertyDetail from "../Components/PropertyDetail/PropertyDetail";
import HotelLists from "../Components/HotelLists";

const AppRouter = () => {
  return (
    <>
      <Router>
        <FadeIn>
          <ScrollToTop>
            <Header />
            <Switch>
              <Route path="/" exact render={(props) => <Home {...props} />} />
              <Route path="/home" component={Home} />
              <Route path="/hotellists" component={HotelLists} />
              <Route path="/detail" component={PropertyDetail} />
            </Switch>
            <Footer />
          </ScrollToTop>
        </FadeIn>
      </Router>
    </>
  );
};

export default AppRouter;
