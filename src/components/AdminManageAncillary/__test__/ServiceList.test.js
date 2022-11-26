import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/utils-for-tests';
import ServicesList from '../ServicesList';

const setError = jest.fn();
describe('Service list component', () => {
 afterEach(() => {
  cleanup;
 });

 it('list prop check', () => {
  renderWithProviders(
   <ServicesList key="S0001" id="1" flight="S0001" service="Veg Meals" setError={setError} />
  );
  const ServiceList = screen.getByTestId('S0001-service');
  // fireEvent.click(addServiceBtn);
  expect(ServiceList).toBeInTheDocument();
 });
});
