import React from 'react';
import { render, screen, act } from '@testing-library/react';
import CountdownTimer from './CountdownTimer'; // Assuming the component is in the same directory
import { vi } from 'vitest';

// Mock date-fns if it's used internally - not needed if eventDate is a prop

describe('CountdownTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders correctly with a future event date', () => {
    const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 5); // 5 days in the future
    render(<CountdownTimer eventDate={futureDate} />);

    expect(screen.getByText(/DÍAS/i)).toBeInTheDocument();
    expect(screen.getByText(/HORAS/i)).toBeInTheDocument();
    expect(screen.getByText(/MINUTOS/i)).toBeInTheDocument();
    expect(screen.getByText(/SEGUNDOS/i)).toBeInTheDocument();

    // Check for initial non-zero values (highly likely for 5 days in future)
    // Note: This might be slightly flaky if the component initializes asynchronously in a specific way
    // For more robustness, consider checking for the presence of the value display elements themselves
    expect(screen.getByText('05')).toBeInTheDocument(); // Days
    // Hours, Minutes, Seconds will depend on exact execution time, so checking for presence of labels is better
  });

  test('displays a specific message when the event date is in the past', () => {
    const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24); // 1 day in the past
    render(<CountdownTimer eventDate={pastDate} />);
    expect(screen.getByText(/¡Es hoy!/i)).toBeInTheDocument();
  });

  test('timer updates correctly over time', () => {
    const futureDate = new Date(Date.now() + 1000 * 5); // 5 seconds in the future
    render(<CountdownTimer eventDate={futureDate} />);

    // Initial state (e.g., 00 Days, 00 Hours, 00 Minutes, 04/05 Seconds)
    // Depending on how component updates, the very initial seconds might be 05 or 04
    // We are checking for one of these.
    // The values are in <div> elements
    expect(screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'div' && (content === '04' || content === '05');
    })).toBeInTheDocument();


    act(() => {
      vi.advanceTimersByTime(2000); // Advance time by 2 seconds
    });

    // After 2 seconds (e.g., 00 Days, 00 Hours, 00 Minutes, 02/03 Seconds)
    expect(screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'div' && (content === '02' || content === '03');
    })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000); // Advance time by 3 more seconds
    });

    // After 5 seconds, the event should have started
    expect(screen.getByText(/¡Es hoy!/i)).toBeInTheDocument();
  });
});
