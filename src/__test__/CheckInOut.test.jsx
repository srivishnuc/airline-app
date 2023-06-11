import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/utils-for-tests';
import '@testing-library/jest-dom';
import PassengerCheckInDetails from '../components/StaffCheckIn/PassengerCheckInDetails';

describe('check In Out', () => {
 it('check-in button', () => {
  renderWithProviders(
   <table>
    <tbody>
     <PassengerCheckInDetails
      id={10}
      name="krish"
      flight="S0001"
      checkInDetails={{
       isCheckedIn: 'N',
       services: [],
       seatno: 'S',
       id: 10
      }}
     />
    </tbody>
   </table>
  );
  const checkOutText = screen.getByRole('button').textContent;
  expect(checkOutText).toEqual('Check-in');
 });
 cleanup();
 it('check-out button', () => {
  renderWithProviders(
   <table>
    <tbody>
     <PassengerCheckInDetails
      id={11}
      name="Ganesh"
      flight="S0002"
      checkInDetails={{
       isCheckedIn: 'Y',
       services: [],
       seatno: 'S',
       id: 11
      }}
     />
    </tbody>
   </table>
  );
  const checkOutText = screen.getByRole('button').textContent;
  expect(checkOutText).toEqual('Check-out');
 });
});
