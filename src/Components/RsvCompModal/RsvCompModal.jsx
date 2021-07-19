import React, { useContext } from "react";
import { Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ImCross, ImSmile } from "react-icons/im";
import "react-datepicker/dist/react-datepicker.css";
import PropertyDetailContext from "../../Context/PropertyDetailContext";
import "./RsvCompModal.css";

const RsvCompModal = () => {
  const { setRsvCompFlg } = useContext(PropertyDetailContext);

  const closeModal = () => {
    setRsvCompFlg(false);
  };

  return (
    <>
      <div className="modalContainer">
        <div className="modalContent">
          <Button className="clsBtn" onClick={closeModal}>
            <ImCross />
          </Button>
          <div className="modalMsg">
            <Text
              fontSize={{ base: "1xl", md: "2xl", lg: "3xl" }}
              className="compMsg"
            >
              Reservation Completed
              <ImSmile /> Thank you!!
            </Text>
            <Link
              to="/home"
              className="backHomeBtn"
              onClick={() => {
                setRsvCompFlg(false);
              }}
            >
              Go back to homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RsvCompModal;
