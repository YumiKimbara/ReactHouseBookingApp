const HomeReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, fetchedData: action.payload };
    case "OPEN":
      return { openModal: true };
    case "CLOSE":
      return { openModal: false };
    case "OPEN_HOME":
      return { openHome: true };
    case "CLOSE_HOME":
      return { openHome: false };
  }
};

export default HomeReducer;
