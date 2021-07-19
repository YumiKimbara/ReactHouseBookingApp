import React, { useContext } from "react";
import HomeContext from "../Context/HomeContext";
import HotelListCard from "./HotelListCard";
//import { Flex } from "@chakra-ui/react";
import "./scss/HotelLists.scss";

const HotelLists = () => {
  const homeCtx = useContext(HomeContext);

  return (
    <>
      {homeCtx.fetchedData &&
        homeCtx.fetchedData.results.map((result) => {
          return (
            <HotelListCard
              id={result.id}
              name={result.name}
              starRating={result.starRating ? result.starRating : ""}
              total={result.guestReviews ? result.guestReviews.total : ""}
              price={result.ratePlan ? result.ratePlan.price.current : ""}
              imageUrl={
                result.optimizedThumbUrls
                  ? result.optimizedThumbUrls.srpDesktop
                  : ""
              }
            />
          );
        })}
    </>
  );
};

export default HotelLists;
