import React, { useState, useEffect } from "react";
import "./Seat.css";
import data from "./data.json";
import styled from "styled-components";
import { registerRoute } from "../utils/ApiRoutes";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

export default function Seat() {
  const getData = () => {
    console.log(typeof data);
    console.log(data);
    for (const item in data) {
      let option = document.createElement("option");
      let select = document.querySelector(".selectState");
      //   console.log(item);
      option.value = item;
      option.innerHTML = item;
      select.appendChild(option);
    }
  };

  // REACT TOAST
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    const value = e.target.value;
    const cities = data[value];
    // console.log(typeof(data[value]));
    for (const i in data[value]) {
      let option = document.createElement("option");
      let select = document.querySelector(".selectCity");

      option.value = cities[i];
      option.innerHTML = cities[i];
      select.appendChild(option);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [count, setcount] = useState(0);
  const [ticketPrice, setticketPrice] = useState(0);

  function PopulateUi() {
    const seats = document.querySelectorAll(".row .seat:not(.occupied)");
    if (localStorage.getItem("selectedSeats")) {
      console.log("no");
      const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

      if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
          if (selectedSeats.indexOf(index) > -1) {
            seat.classList.add("selected");
          }
        });
      }
    }
  }
  useEffect(() => {
    PopulateUi();
  }, []);
  const selectedSeats = () => {
    const movieSelect = document.querySelector("#movie");
    let movieTicketPrice = +movieSelect.value; // with plus string to number

    setcount(count + 1);
    setticketPrice((count + 1) * movieTicketPrice);
  };
  const unSelectedSeats = () => {
    const movieSelect = document.querySelector("#movie");
    let movieTicketPrice = +movieSelect.value; // with plus string to number
    setcount(count - 1);
    setticketPrice(ticketPrice - movieTicketPrice);
  };
  const movieSelected = () => {
    const movieSelect = document.querySelector("#movie");
    console.log(movieSelect.selectedIndex);
    localStorage.setItem("selectedMovieIndex", movieSelect.selectedIndex);
    localStorage.setItem("selectedMoviePrice", movieSelect.value);
  };
  const seatClicked = async (e) => {
    const seats = document.querySelectorAll(".row .seat:not(.occupied)");
    console.log(e.target);
    if (
      e.target.classList.contains("seat") &&
      !e.target.classList.contains("occupied")
    ) {
      console.log("Seat", e.target);
      e.target.classList.toggle("selected");
      if (e.target.classList.contains("selected")) {
        selectedSeats();
        console.log(count);
      } else {
        unSelectedSeats();
      }

      const seatsSelected = document.querySelectorAll(".row .seat.selected");
      let s = "";
      // storing the selected seats in the local storage
      const seatsIndex = [...seatsSelected].map(function (seat) {
        s += [...seats].indexOf(seat) + ".";
        return [...seats].indexOf(seat);
      });

      localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
    }
  };
  const submitted = async (e) => {
    e.preventDefault();
    const seats = document.querySelectorAll(".row .seat:not(.occupied)");
    const seatsSelected = document.querySelectorAll(".row .seat.selected");
    let s = "";
    // storing the selected seats in the local storage
    const seatsIndex = [...seatsSelected].map(function (seat) {
      s += [...seats].indexOf(seat) + ".";
      return [...seats].indexOf(seat);
    });

    let selectState = document.querySelector(".selectState").value;
    let selectCity = document.querySelector(".selectCity").value;
    const { data } = await axios.post(registerRoute, {
      city: selectCity,
      state: selectState,
      SeatsSelected: s,
    });

    toast("Data Submitted!!!!", toastOptions);
  };
  return (
    <div className="container">
      <form method="post" onSubmit={submitted}>
        <div className="selectBox">
          {/* <input type="text"></input> */}
          <div className="select">
            <p>State: </p>
            <select className="selectState" onChange={handleChange}>
              <option>---Select---</option>
            </select>
          </div>
          <div className="select">
            <p>City: </p>
            <select className="selectCity"></select>
          </div>
        </div>
        <div className="main-container">
          <label>Pick a movie</label>
          <select id="movie" onClick={movieSelected}>
            <option value="200">Movie1 (Rs. 200)</option>
            <option value="210">Movie2 (Rs. 210)</option>
            <option value="220">Movie3 (Rs. 220)</option>
            <option value="190">Movie4 (Rs. 190)</option>
          </select>
        </div>
        <ul className="showcase">
          <li>
            <div className="seat"></div>
            <small>N/A</small>
          </li>
          <li>
            <div className="seat selected"></div>
            <small>Selected</small>
          </li>
          <li>
            <div className="seat occupied"></div>
            <small>Occupied</small>
          </li>
        </ul>
        <div className="insideContainer" onClick={seatClicked}>
          {/* <div className="screen"></div> */}
          <div className="row">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
          <div className="row">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
          <div className="row">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
          <div className="row">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
          <div className="row">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
          <div className="row">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
          <p className="text">
            You have Selected <span id="count">{count}</span> seats for a price
            of Rs.
            <span id="total">{ticketPrice}</span>
          </p>
        </div>
        <ButtonStyled type="submit" onSubmit={submitted}>
          Next
        </ButtonStyled>
        <ToastContainer></ToastContainer>
      </form>
    </div>
  );
}

const ButtonStyled = styled.button`
  background: linear-gradient(to right, #231f5c 0%, #03217b 79%);
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-size: 0.6rem;
  /* width: 65%; */
  /* height: 3rem; */
  padding: 9px;
  font-weight: bolder;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 0.4rem;

  border-width: 2px;
  border-style: solid;
  border-top-color: #03217b;
  border-left-color: #03217b;
  border-right-color: #14163c;
  border-bottom-color: #14163c;
  &:hover {
    background: transparent;
    /* padding: 10px; */
    /* border: 3px solid linear-gradient(to right, #14163c 0%, #03217b 79%); */
    border-width: 2px;
    border-style: solid;
    border-top-color: #03217b;
    border-left-color: #03217b;
    border-right-color: #14163c;
    border-bottom-color: #14163c;
  }
`;
