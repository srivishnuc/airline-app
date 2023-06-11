import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/utils-for-tests';
import '@testing-library/jest-dom';
import ServiceList from '../components/AdminManageAncillary/ServicesList';

describe('Service list component', () => {
 it('list prop check', () => {
  renderWithProviders(
   <table>
    <tbody>
     <ServiceList key="S0001" id={1} flight="S0001" service="Veg Meals" setError={() => {}} />
    </tbody>
   </table>
  );
  renderWithProviders(
   <table>
    <tbody>
     <ServiceList key="S0002" id={2} flight="S0002" service="Non-veg Meals" setError={() => {}} />
    </tbody>
   </table>
  );
  const serviceList = screen.getAllByTestId('service');
  expect(serviceList).toHaveLength(2);
 });
});
