import React, { useReducer, createContext, useState, useEffect } from "react";
import PropertyDetailReducer from "../Reducer/PropertyDetailReducer";
import axios from "axios";

const PropertyDetailContext = createContext();

const PropertyDetailProvider = (props) => {
  /* Global Context */
  const [rsvCompFlg, setRsvCompFlg] = useState(false);

  /* PropertyDetailReducer */
  const [propertyDetail, dispatchPropertyDetail] = useReducer(
    PropertyDetailReducer,
    [],
    () => {
      const localReservationData = localStorage.getItem("reservation");
      return {
        property: [],
        transportation: [],
        host: [],
        roomImg: [],
        reservation: localReservationData
          ? JSON.parse(localReservationData)
          : [],
        price: {
          King: 150,
          Queen: 120,
          Sofa: 100,
          Other: 200,
        },
        hotelId: "",
      };
    }
  );

  /* Get Hotel Detail */
  const detailParam = {
    method: "GET",
    url: "https://hotels4.p.rapidapi.com/properties/get-details",
    params: { id: propertyDetail.hotelId },
    headers: {
      // "x-rapidapi-key": "4af4b398efmsh099cf8a67a7411bp195ecejsn24b33af52ba2",
      // "x-rapidapi-key": "b452ba0297msh7e5ae1d1fbc373dp1b412djsn1f1b5eaf3e46",
      "x-rapidapi-key": "db712c9726mshd2f3281598ae723p1e5f6cjsna726bf6d05e5",
      "x-rapidapi-host": "hotels4.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(detailParam)
      .then((response) => {
        console.log("fetched data is ", response.data);
        dispatchPropertyDetail({
          type: "PROPERTYDETAIL_FETCH_SUCCESS",
          payload: response.data.data.body,
        });
        dispatchPropertyDetail({
          type: "TRANSPORTATION_FETCH_SUCCESS",
          payload: response.data.transportation.transportLocations,
        });
      })
      .catch((error) => {
        console.error(`Failed to fetch property detail data. Error= ${error}`);
      });
  }, [propertyDetail.hotelId]);

  /* Local Storage */
  useEffect(() => {
    localStorage.setItem(
      "reservation",
      JSON.stringify(propertyDetail.reservation)
    );
  }, [propertyDetail.reservation]);

  /* Fake Property Images */
  const ImgAPI = {
    ENDPOINT: "https://pixabay.com/api/",
    API_KEY: "22112901-d9ab6e677acd5ee1c4e0a636d",
  };

  useEffect(() => {
    try {
      (async () => {
        const imgRes = await fetch(
          `${ImgAPI.ENDPOINT}?key=${ImgAPI.API_KEY}&q="room+house"&image_type=photo&pretty=true`
        );
        if (!imgRes.ok) {
          throw imgRes.statusText;
        } else {
          const imgData = await imgRes.json();
          let data = []; //pick only 7 photos
          for (let i = 0; i < 7; i++) {
            data.push(imgData.hits[i]);
          }
          dispatchPropertyDetail({ type: "IMG_FETCH_SUCCESS", payload: data });
        }
      })();
    } catch (error) {
      console.error(`Failed to fetch image data. Error= ${error}`);
    }
  }, []);

  return (
    <>
      <PropertyDetailContext.Provider
        value={{
          propertyDetail,
          dispatchPropertyDetail,
          rsvCompFlg,
          setRsvCompFlg,
        }}
      >
        {props.children}
      </PropertyDetailContext.Provider>
    </>
  );
};

export { PropertyDetailContext as default, PropertyDetailProvider };
