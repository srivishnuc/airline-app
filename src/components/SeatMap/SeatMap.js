import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { editCheckin } from '../../Redux/Reducer/staff';

const SeatMap = ({ data, selectedFlight, checkInDetails }) => {
 const [seats, setSeats] = useState([]);
 // const updateSet = () => {
 //   setSeats({seats.seatBooked === false})
 // };
 const dispatch = useDispatch();
 const toggleCheckin = (id, isCheckedIn) => {
  dispatch(editCheckin({ id, data: { isCheckedIn: isCheckedIn === 'Y' ? 'N' : 'Y' } }));
 };
 console.log(seats);
 useEffect(() => {
  const flightPassenger = data?.filter((passenger) => passenger.flight === selectedFlight);
  const checkIn = [];
  flightPassenger?.forEach((element) => {
   const isCheckInDetail = checkInDetails.find((chk) => chk.id === element.id);
   if (isCheckInDetail != {}) checkIn.push(isCheckInDetail);
  });
  setSeats(checkIn);
 }, [selectedFlight, checkInDetails]);

 return (
  <Container className="m-4">
   <p className="fw-bold">Checkin Seatmap</p>
   {seats.length > 0 ? (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
     {seats.map((item) => {
      return (
       <Col md={6} key={item.id}>
        <Button
         size="large"
         className={item.isCheckedIn === 'Y' ? 'bg-success' : 'bg-danger'}
         onClick={() => toggleCheckin(item.id, item.isCheckedIn)}>
         {item.seatno}
        </Button>
       </Col>
      );
     })}
    </ButtonGroup>
   ) : (
    <p className="fw-bold m-auto text-danger">Select flight to see the flight map</p>
   )}
  </Container>
 );
};

SeatMap.propTypes = {
 data: PropTypes.array,
 checkInDetails: PropTypes.array,
 selectedFlight: PropTypes.string
};

export default SeatMap;
