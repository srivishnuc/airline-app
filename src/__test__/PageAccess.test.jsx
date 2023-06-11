import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/utils-for-tests';
import '@testing-library/jest-dom';
import AirlineAdmin from '../components/AirlineAdmin/AirlineAdmin';
import AirlineStaff from '../components/AirlineStaff/AirlineStaff';

describe('Page access test', () => {
 it('Admin', () => {
  renderWithProviders(<AirlineAdmin />);
  expect(screen.getByText('Manage Passenger')).toBeInTheDocument();
  expect(screen.getByText('Manage Services')).toBeInTheDocument();
 });
 it('staff', () => {
  renderWithProviders(<AirlineStaff />);
  expect(screen.getByText('Check-In')).toBeInTheDocument();
  expect(screen.getByText('In-Flight')).toBeInTheDocument();
 });
});
