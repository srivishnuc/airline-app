import React from 'react';
import Footer from './Footer';
import { render } from '@testing-library/react';
it('should render Footer page', () => {
 const { getByText } = render(<Footer />);
 getByText('SV Airlines');
});
