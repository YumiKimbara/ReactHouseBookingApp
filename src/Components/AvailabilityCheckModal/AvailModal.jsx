import React, { useContext, useState } from "react";
import {
  Text,
  Button,
  FormControl,
  FormLabel,
  Divider,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { ImCross } from "react-icons/im";
import { IoAlertCircleSharp } from "react-icons/io5";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import PropertyDetailContext from "../../Context/PropertyDetailContext";
import "./AvailModal.css";

const AvailModal = () => {
  const { propertyDetail, dispatchPropertyDetail, setRsvCompFlg } = useContext(
    PropertyDetailContext
  );

  //private state hook for modal pop up
  const [error, setError] = useState("");
  const [availFlg, setAvailFlg] = useState(false);
  const [modalStyle, setModalStyle] = useState({ display: "none" });
  const [modalInput, setModalInput] = useState({
    hotelId: propertyDetail.hotelId,
    checkInDate: addDays(new Date(), 1),
    checkOutDate: addDays(new Date(), 2),
    adultNum: 0,
    childrenNum: 0,
    roomType: "",
    roomNum: 0,
  });
  const [calcPanel, setCalcPanel] = useState({ display: "none" });
  const [total, setTotal] = useState({ nights: 0, total: 0, roomNum: 0 });

  //methods
  const openModal = () => {
    setModalStyle({ display: "block" });
  };

  const hideModal = () => {
    setModalStyle({ display: "none" });
    //hide reserve button
    setAvailFlg(false);
    //hide price panel
    setCalcPanel({ display: "none" });
    //clear input
    setModalInput({
      hotelId: propertyDetail.hotelId,
      checkInDate: addDays(new Date(), 1),
      checkOutDate: addDays(new Date(), 2),
      adultNum: 0,
      childrenNum: 0,
      roomType: "",
      roomNum: 0,
    });
  };

  const showPrice = () => {
    //1 day = 86400000 ms
    console.log(
      Math.ceil((modalInput.checkOutDate - modalInput.checkInDate) / 86400000)
    );
    setTotal({
      nights: Math.ceil(
        (modalInput.checkOutDate - modalInput.checkInDate) / 86400000
      ),
      roomNum: modalInput.roomNum,
      total:
        Math.ceil(
          (modalInput.checkOutDate - modalInput.checkInDate) / 86400000
        ) *
        200 *
        modalInput.roomNum,
    });
    setCalcPanel({ display: "block" });
  };

  const checkAvailability = (e) => {
    e.preventDefault();

    let isInputValid = false;
    let isDateValid = false;

    //validation check 1
    if (
      modalInput.adultNum === 0 ||
      modalInput.roomType === "" ||
      modalInput.roomNum === 0
    ) {
      setError("Please enter guest number, room type and room number");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      isInputValid = true;
    }

    //date validation check
    if (modalInput.checkInDate <= modalInput.checkOutDate) {
      isDateValid = true;
    } else {
      setError("Check-out date must be bigger than Check-in date");
      setTimeout(() => {
        setError("");
      }, 2000);
    }

    if (isInputValid && isDateValid) {
      //get the date and hotel id from localstorage
      if (localStorage.hasOwnProperty("reservation")) {
        const reservationData = JSON.parse(localStorage.getItem("reservation"));
        //hotelId, roomType, check-in date match
        if (
          reservationData.some(
            (elem) =>
              elem.hotelId === modalInput.hotelId &&
              elem.roomType === modalInput.roomType &&
              elem.checkInDate.substring(0, 10).replaceAll("-", "/") ===
                e.target[0].value
          )
        ) {
          setError(
            "The room is not available :( Please try different room or date."
          );
          setTimeout(() => {
            setError("");
          }, 2000);
        } else {
          //show price
          showPrice();
          //show reserve button
          setAvailFlg(true);
        }
      } else {
        //show price
        showPrice();
        //show reserve button
        setAvailFlg(true);
      }
    }
  };

  const reserve = (e) => {
    e.preventDefault();
    //dispatch
    dispatchPropertyDetail({
      type: "RESERVE",
      payload: modalInput,
    });
    //open completion page
    setRsvCompFlg(true);
    //close this modal
    setModalStyle({ display: "none" });
    //hide reserve button
    setAvailFlg(false);
    //hide price panel
    setCalcPanel({ display: "none" });
    //clear input
    setModalInput({
      hotelId: propertyDetail.hotelId,
      checkInDate: addDays(new Date(), 1),
      checkOutDate: addDays(new Date(), 2),
      adultNum: 0,
      childrenNum: 0,
      roomType: "",
      roomNum: 0,
    });
  };

  return (
    <>
      <div className="availBtnContainer">
        <Button
          colorScheme="teal"
          size="lg"
          className="availBtn"
          onClick={openModal}
        >
          Check Availability
        </Button>
      </div>
      <div className="modalContainer" style={modalStyle}>
        <div className="modalContent">
          <Text fontSize="xl">Availability</Text>
          <button className="clsBtn" onClick={hideModal}>
            <ImCross />
          </button>
          <form onSubmit={checkAvailability}>
            <div className="dateSelect">
              <FormControl>
                <FormLabel>Check-in date</FormLabel>
                <DatePicker
                  className="checkIn"
                  onChange={(date) =>
                    setModalInput({ ...modalInput, checkInDate: date })
                  }
                  selected={modalInput.checkInDate}
                  dateFormat="yyyy/MM/dd"
                  minDate={addDays(new Date(), 1)}
                  monthsShown={2}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Check-out date</FormLabel>
                <DatePicker
                  className="checkOut"
                  onChange={(date) =>
                    setModalInput({ ...modalInput, checkOutDate: date })
                  }
                  selected={modalInput.checkOutDate}
                  dateFormat="yyyy/MM/dd"
                  minDate={addDays(new Date(), 2)}
                  monthsShown={2}
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="md">Adults</FormLabel>
                <NumberInput
                  min={0}
                  defaultValue={0}
                  className="adultNum"
                  onChange={(num) =>
                    setModalInput({ ...modalInput, adultNum: Number(num) })
                  }
                  value={modalInput.adultNum}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel fontSize="md">Children</FormLabel>
                <NumberInput
                  min={0}
                  defaultValue={0}
                  className="childrenNum"
                  onChange={(num) =>
                    setModalInput({ ...modalInput, childrenNum: Number(num) })
                  }
                  value={modalInput.childrenNum}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </div>

            <FormControl>
              <FormLabel>Rooms</FormLabel>
              <div className="roomTypeInput">
                <FormLabel fontSize="md">Type</FormLabel>
                <Select
                  className="roomType"
                  onChange={(e) =>
                    setModalInput({ ...modalInput, roomType: e.target.value })
                  }
                >
                  <option value="">select room type</option>
                  {propertyDetail.property.propertyDescription.roomTypeNames.map(
                    (e, index) => (
                      <option value={e} key={index}>
                        {e}
                      </option>
                    )
                  )}
                </Select>

                <FormLabel fontSize="md">Number</FormLabel>
                <NumberInput
                  min={0}
                  defaultValue={0}
                  className="roomNum"
                  onChange={(num) =>
                    setModalInput({ ...modalInput, roomNum: Number(num) })
                  }
                  value={modalInput.roomNum}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </div>
            </FormControl>

            {error && (
              <p className="error">
                <IoAlertCircleSharp />
                {error}
              </p>
            )}

            <div className="btns">
              <Button type="submit" className="submitBtn">
                Check availability
              </Button>
              {availFlg && (
                <Button type="button" className="checkOutBtn" onClick={reserve}>
                  Reserve
                </Button>
              )}
            </div>
          </form>

          <div className="pricePanel" style={calcPanel}>
            <Text fontSize="xl">Price</Text>
            <p>Room : $200 x {total.nights} nights</p>
            <p>Number of rooms : {total.roomNum}</p>
            <Divider bg="lightgray" />
            <p className="total">
              <span>Total</span> : ${total.total}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvailModal;
