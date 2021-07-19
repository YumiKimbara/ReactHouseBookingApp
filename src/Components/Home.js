import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import BookModal from "./BookModal";
import HotelLists from "./HotelLists";
import HomeContext from "../Context/HomeContext";
import { Button, ListItem, Spinner } from "@chakra-ui/react";
import "./scss/Home.scss";

//画像はimportではなくstringでパスを変数に代入するやり方が良い。
//画像はpublicフォルダの中に。
const mainImage = "/image/mainImage.jpg";
const vancouver = "/image/vancouver.jpg";
const kelowna = "/image/kelowna.jpg";
const tofino = "/image/tofino.jpg";
const richmond = "/image/richmond.jpg";
const victoria = "/image/victoria.jpg";
const burnaby = "/image/burnaby.jpg";
const outdoorgetaways = "/image/outdoorgetaways.jpg";
const uniquestays = "/image/uniquestays.jpg";
const entirehomes = "/image/entirehomes.jpg";
const featuredcollection = "/image/featuredcollection.jpg";
const onlineexperiences = "/image/onlineexperiences.jpg";
const experiences = "/image/experiences.jpg";
const tryhosting = "/image/tryhosting.jpg";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [myStartDate, setMyStartDate] = useState("");
  const [myEndDate, setMyEndDate] = useState("");
  const [showHotelList, setShowHotelList] = useState(false);
  const [error, setError] = useState(false);
  const homeCtx = useContext(HomeContext);

  //locations/search
  const getHotelData = () => {
    const options = {
      method: "GET",
      url: "https://hotels4.p.rapidapi.com/locations/search",
      params: { query: inputValue, locale: "en_US" },
      headers: {
        // "x-rapidapi-key": "b452ba0297msh7e5ae1d1fbc373dp1b412djsn1f1b5eaf3e46",
        "x-rapidapi-key": "db712c9726mshd2f3281598ae723p1e5f6cjsna726bf6d05e5",
        "x-rapidapi-host": "hotels4.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response);
        setDestination(response.data.suggestions[0].entities[0].destinationId);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });

    // const options = {
    //   method: "GET",
    //   url: "https://hotels4.p.rapidapi.com/locations/search",
    //   params: { query: inputValue, locale: "en_US" },
    //   headers: {
    //     "x-rapidapi-key": "4af4b398efmsh099cf8a67a7411bp195ecejsn24b33af52ba2",
    //     "x-rapidapi-host": "hotels4.p.rapidapi.com",
    //   },
    // };

    // axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log(response);
    //     setDestination(response.data.suggestions[0].entities[0].destinationId);
    //   })
    // .catch(function (error) {
    //   console.error(error);
    //   setError(true);
    // });
  };

  //
  useEffect(() => {
    if (destination === "") return;

    const options = {
      method: "GET",
      url: "https://hotels4.p.rapidapi.com/properties/list",
      params: {
        adults1: "1",
        pageNumber: "1",
        destinationId: destination,
        pageSize: "25",
        checkOut: myEndDate,
        checkIn: myStartDate,
        sortOrder: "PRICE",
        locale: "en_US",
        currency: "USD",
      },
      headers: {
        // "x-rapidapi-key": "b452ba0297msh7e5ae1d1fbc373dp1b412djsn1f1b5eaf3e46",
        "x-rapidapi-key": "db712c9726mshd2f3281598ae723p1e5f6cjsna726bf6d05e5",
        "x-rapidapi-host": "hotels4.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.data.body.searchResults);
        homeCtx.dispatchHome({
          type: "FETCH_SUCCESS",
          payload: response.data.data.body.searchResults,
        });
      })
      .catch(function (error) {
        console.error(error);
      });

    // const options = {
    //   method: "GET",
    //   url: "https://hotels4.p.rapidapi.com/properties/list",
    //   params: {
    //     adults1: "1",
    //     pageNumber: "1",
    //     destinationId: destination,
    //     pageSize: "25",
    //     checkOut: myEndDate,
    //     checkIn: myStartDate,
    //     sortOrder: "PRICE",
    //     locale: "en_US",
    //     currency: "USD",
    //   },
    //   headers: {
    //     "x-rapidapi-key": "4af4b398efmsh099cf8a67a7411bp195ecejsn24b33af52ba2",
    //     "x-rapidapi-host": "hotels4.p.rapidapi.com",
    //   },
    // };

    // axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log(response.data);
    //     homeCtx.dispatchHome({
    //       type: "FETCH_SUCCESS",
    //       payload: response.data.data.body.searchResults,
    //     });
    // })
    // .catch(function (error) {
    //   console.error(error);
    // });
  }, [destination]);

  return (
    <>
      <BookModal
        setInputValue={setInputValue}
        getHotelData={getHotelData}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setMyStartDate={setMyStartDate}
        setMyEndDate={setMyEndDate}
        setShowHotelList={setShowHotelList}
        inputValue={inputValue}
      />
      {homeCtx.openHome || homeCtx.openModal ? (
        <div>
          <div
            className="mainImage"
            style={{
              backgroundImage: `url(${mainImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              position: "relative",
              width: "100%",
              //height: "calc(100vh - 90px)",
            }}
          >
            <div className="mainMessageContainer">
              <h1>The Greatest Outdoors</h1>
              <Button colorScheme="teal">Get Inspired</Button>
            </div>
          </div>
          <div>
            <div className="section">
              <h2 className="subTitle">Explore nearby</h2>
              <div className="exploreNearbyContainer">
                <div className="cityContainer">
                  <img className="cityImage" src={vancouver} alt="vancouver" />
                  <div className="cityDescription">
                    <span>Vancouver</span>
                    <span>15-minute drive</span>
                  </div>
                </div>
                <div className="cityContainer">
                  <img className="cityImage" src={kelowna} alt="kelowna" />
                  <div className="cityDescription">
                    <span>Kelowna</span>
                    <span>5-hour drive</span>
                  </div>
                </div>
                <div className="cityContainer">
                  <img className="cityImage" src={tofino} alt="tofino" />
                  <div className="cityDescription">
                    <span>Tofino</span>
                    <span>6-hour drive</span>
                  </div>
                </div>
                <div className="cityContainer">
                  <img className="cityImage" src={richmond} alt="richmond" />
                  <div className="cityDescription">
                    <span>Richmond</span>
                    <span>30-minute drive</span>
                  </div>
                </div>
                <div className="cityContainer">
                  <img className="cityImage" src={victoria} alt="victoria" />
                  <div className="cityDescription">
                    <span>Victoria</span>
                    <span>3.5-hour drive</span>
                  </div>
                </div>
                <div className="cityContainer">
                  <img className="cityImage" src={burnaby} alt="burnaby" />
                  <div className="cityDescription">
                    <span>Burnaby</span>
                    <span>15-minute drive</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="section">
              <h2 className="subTitle">Live anywhere</h2>
              <div className="liveAnywhereContainer">
                <div className="categoryContainer">
                  <img
                    className="categoryImage"
                    src={outdoorgetaways}
                    alt="outdoorgetaways"
                  />
                  <span>Outdoor getaways</span>
                </div>
                <div className="categoryContainer">
                  <img
                    className="categoryImage"
                    src={uniquestays}
                    alt="uniquestays"
                  />
                  <span>Unique stays</span>
                </div>
                <div className="categoryContainer">
                  <img
                    className="categoryImage"
                    src={entirehomes}
                    alt="entirehomes"
                  />
                  <span>Entire homes</span>
                </div>
              </div>
            </div>
            <div className="tryHostingContainer">
              <div
                className="tryHostingBgImage"
                style={{
                  backgroundImage: `url(${tryhosting})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  position: "relative",
                  width: "100%",
                  //height: "50vh",
                }}
              >
                <div className="tryHostingDescription">
                  <h2>Try hosting</h2>
                  <Button>Learn more</Button>
                </div>
              </div>
            </div>
            <div className="section">
              <h2 className="subTitle">Discover Experiences</h2>
              <div className="liveAnywhereContainer">
                <div className="categoryContainer">
                  <img
                    className="categoryImage"
                    src={featuredcollection}
                    alt="featuredcollection"
                  />
                  <span>Featured collection: Wanderlust</span>
                </div>
                <div className="categoryContainer">
                  <img
                    className="categoryImage"
                    src={onlineexperiences}
                    alt="onlineexperiences"
                  />
                  <span>Online Experiences</span>
                </div>
                <div className="categoryContainer">
                  <img
                    className="categoryImage"
                    src={experiences}
                    alt="experiences"
                  />
                  <span>Experiences</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {inputValue && (
            <div className="placeOfStay">
              <h1>Stays in {inputValue.toUpperCase()}</h1>
            </div>
          )}
          <div className="allCardContainer">
            <HotelLists inputValue={inputValue} />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

// (
//   <div>
//     {inputValue && (
//       <div className="placeOfStay">
//         <h1>Stays in {inputValue.toUpperCase()}</h1>
//       </div>
//     )}
//     <div className="allCardContainer">
//       <HotelLists inputValue={inputValue} />
//     </div>
//   </div>
// )
// ? (
//   destination === ""
// ) : (
//   <div style={{ minHeight: "500px" }}>
//     {console.log(homeCtx.fetchedData)}
//     <p className="loading">Loading... Hang on a sec...</p>
//     <Spinner
//       thickness="4px"
//       speed="0.65s"
//       emptyColor="gray.200"
//       color="teal.500"
//       size="xl"
//     />
//   </div>
// )
