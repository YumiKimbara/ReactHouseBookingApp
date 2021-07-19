import React, { useContext } from "react";
import { Box, Image } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import PropertyDetailContext from "../Context/PropertyDetailContext";
import "./scss/HotelListCard.scss";

const HotelListCard = ({ id, name, starRating, total, price, imageUrl }) => {
  const { dispatchPropertyDetail } = useContext(PropertyDetailContext);

  return (
    <>
      <Link
        to={{
          pathname: "/detail",
          //state: {},
        }}
      >
        <Box
          onClick={() =>
            dispatchPropertyDetail({
              type: "HOTEL_ID",
              payload: id,
            })
          }
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          className="cardContainer"
        >
          <Image src={imageUrl} alt="hotel image" />
          <Box p="6" className="listCardContainer">
            <Box d="flex" alignItems="baseline">
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              ></Box>
            </Box>
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {name}
            </Box>
            <Box>
              {price}
              <Box as="span" color="gray.600" fontSize="sm">
                / wk
              </Box>
            </Box>
            <Box d="flex" mt="2" alignItems="center">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i < starRating ? "teal.500" : "gray.300"}
                  />
                ))}
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {total ? total : "0"} reviews
              </Box>
            </Box>
          </Box>
        </Box>
      </Link>
    </>
  );
};

export default HotelListCard;
