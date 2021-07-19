import React, { useContext } from "react";
import {
  Text,
  Button,
  Spinner,
  Divider,
  Box,
  Grid,
  GridItem,
  SimpleGrid,
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { FaHeart } from "react-icons/fa";
import { MdSmokeFree } from "react-icons/md";
import {
  IoFlowerOutline,
  IoFlowerSharp,
  IoBedSharp,
  IoLocationSharp,
} from "react-icons/io5";
import "./PropertyDetail.css";
import PropertyDetailContext from "../../Context/PropertyDetailContext";
import AvailModal from "../AvailabilityCheckModal/AvailModal";
import RsvCompModal from "../RsvCompModal/RsvCompModal";

const PropertyDetail = () => {
  const { propertyDetail, rsvCompFlg } = useContext(PropertyDetailContext);

  return (
    <>
      {propertyDetail.roomImg.length !== 0 &&
      Object.keys(propertyDetail.property).length !== 0 ? (
        <div className="PropertyDetailContainer">
          {/* ===== Property Title ===== */}
          <div className="title">
            <Text fontSize={{ base: "2xl", md: "2xl", lg: "4xl" }}>
              {propertyDetail.property.propertyDescription.name}
            </Text>
            <Button colorScheme="teal" size="md">
              <FaHeart /> Save
            </Button>
          </div>

          <p className="address">
            <IoLocationSharp />{" "}
            {propertyDetail.property.propertyDescription.address.fullAddress}
          </p>

          {/* ===== Image Panel ===== */}
          <Grid
            h="200px"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(7, 1fr)"
            gap={4}
            className="imgPanel"
          >
            <GridItem rowSpan={2} colSpan={3} className="imgItem">
              <img src={propertyDetail.roomImg[0].largeImageURL} alt="img0" />
            </GridItem>
            <GridItem colSpan={2} className="imgItem">
              <img src={propertyDetail.roomImg[1].largeImageURL} alt="img1" />
            </GridItem>
            <GridItem colSpan={2} className="imgItem">
              <img src={propertyDetail.roomImg[2].largeImageURL} alt="img2" />
            </GridItem>
            {(() => {
              const html = [];
              for (let i = 3; i < propertyDetail.roomImg.length; i++) {
                html.push(
                  <GridItem
                    colSpan={1}
                    className="imgItem"
                    key={propertyDetail.roomImg.id}
                  >
                    {" "}
                    <img
                      src={propertyDetail.roomImg[i].largeImageURL}
                      alt={`img${i}`}
                    />
                  </GridItem>
                );
              }
              return html;
            })()}
          </Grid>

          <Divider bg="lightgray" />

          {/* ===== Details ===== */}
          <div>
            <Text fontSize={{ base: "2xl", md: "2xl", lg: "3xl" }}>
              {propertyDetail.property.propertyDescription.tagline[0]
                .replace("<b>", "")
                .replace("</b>", "")}{" "}
            </Text>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non in
              vel, ad consequuntur fugiat debitis exercitationem ex minus
              officia consequatur tempora assumenda voluptatum deleniti dolorem
              ipsam a animi corporis accusantium.
            </p>
          </div>

          {/* amenity */}
          <Text fontSize="2xl" className="detailTitle">
            Amenities
          </Text>
          <SimpleGrid
            columns={[1, null, 2]}
            // templateColumns="repeat(2, 1fr)"
            gap={6}
            className="amenityPanel"
          >
            <Box w="100%" h="100%" className="hotel">
              <Text fontSize="lg">Hotel</Text>
              <ul>
                {propertyDetail.property.amenities[0].listItems.map(
                  (elem, index) => (
                    <li key={index}>
                      <IoFlowerOutline /> {elem.listItems}
                    </li>
                  )
                )}
              </ul>
            </Box>

            <Box w="100%" h="100%" className="room">
              <Text fontSize="lg">Room</Text>
              <ul>
                {propertyDetail.property.amenities[1].listItems.map(
                  (elem, index) => (
                    <li key={index}>
                      <IoFlowerSharp /> {elem.listItems}
                    </li>
                  )
                )}
              </ul>
            </Box>
          </SimpleGrid>

          <Divider bg="lightgray" />

          {/* Room */}
          <Text fontSize="2xl" className="detailTitle">
            Sleeping Arrangements
          </Text>
          {propertyDetail.property.propertyDescription.roomTypeNames.length !==
          0 ? (
            <SimpleGrid
              columns={[2, 3, 5]}
              // templateColumns="repeat(5,1fr)"
              gap={4}
              className="roomTypePanel"
            >
              {(() => {
                let roomArr = [];
                const html = [];
                roomArr =
                  propertyDetail.property.propertyDescription.roomTypeNames.map(
                    (e) => e.split(",")
                  );
                for (let i = 0; i < roomArr.length; i++) {
                  html.push(
                    <Box className="roomInfo" w="100%" key={i}>
                      <p className="room"> {roomArr[i][0]}</p>
                      <p>
                        <IoBedSharp></IoBedSharp> {roomArr[i][1]}
                      </p>
                      <p>
                        <MdSmokeFree></MdSmokeFree> {roomArr[i][2]}
                      </p>
                    </Box>
                  );
                }
                return html;
              })()}
            </SimpleGrid>
          ) : (
            <p>No information available :(</p>
          )}

          {/* Review */}
          <Text fontSize="2xl" className="detailTitle">
            Review
          </Text>

          {/* Transportation : tab */}
          <Text fontSize="2xl" className="detailTitle">
            Transportation
          </Text>

          {/* Host info */}
          <Text fontSize="2xl" className="detailTitle">
            Hosted by{" "}
          </Text>
          <Button colorScheme="teal" size="lg" className="contactBtn">
            Contact host
          </Button>

          {/* ===== Modal pop up for availability check =====  */}
          <AvailModal />

          {/* ===== Modal pop up for reservation complete === */}
          {rsvCompFlg && <RsvCompModal />}
        </div>
      ) : (
        <div className="PropertyDetailContainer">
          <p className="loading">Loading... Hang on a sec...</p>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"
          />
        </div>
      )}
    </>
  );
};

export default PropertyDetail;
