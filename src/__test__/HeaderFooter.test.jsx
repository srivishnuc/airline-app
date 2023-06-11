import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/utils-for-tests';
import '@testing-library/jest-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/ResusableComponents/Header';

it('Title check', () => {
 renderWithProviders(<Header />);
 const headerTitle = screen.getByRole('text').textContent;
 renderWithProviders(<Footer />);
 const footerTitle = screen.getByTestId('footer-title').textContent;
 expect(footerTitle).toEqual(headerTitle);
});
