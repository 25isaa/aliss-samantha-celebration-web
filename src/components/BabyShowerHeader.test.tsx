import React from 'react';
import { render, screen } from '@testing-library/react';
import BabyShowerHeader from './BabyShowerHeader'; // Assuming the component is in the same directory

describe('BabyShowerHeader', () => {
  test('renders the main heading', () => {
    render(<BabyShowerHeader />);
    const headingElement = screen.getByText(/Baby Shower/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders the subtitle', () => {
    render(<BabyShowerHeader />);
    const subtitleElement = screen.getByText(/para nuestra princesa/i);
    expect(subtitleElement).toBeInTheDocument();
  });
});
