const PropertyDetailReducer = (state, action) => {

  switch (action.type) {
    case "IMG_FETCH_SUCCESS":
      return {
        ...state,
        roomImg: action.payload,
      };
    case "PROPERTYDETAIL_FETCH_SUCCESS":
      return {
        ...state,
        property: action.payload,
      };
    case "TRANSPORTATION_FETCH_SUCCESS":
      return {
        ...state,
        transportation: action.payload,
      };
    case "RESERVE":
      return {
        ...state,
        reservation: [action.payload, ...state.reservation]
      };
    case "HOTEL_ID":
      return {
        ...state,
        hotelId: action.payload,
      };

    default:
      Error("Action type is not defined");
      return state;
  }
};

export default PropertyDetailReducer;
