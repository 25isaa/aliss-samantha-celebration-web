import { renderHook, act } from '@testing-library/react';
import { usePageTracking, useBabyShowerAnalytics } from './useBabyShowerAnalytics'; // Adjust path as needed
import babyShowerAnalytics from '../lib/babyShowerAnalytics'; // Adjust path as needed

// Mock the babyShowerAnalytics module
vi.mock('../lib/babyShowerAnalytics', () => ({
  default: {
    configurarURL: vi.fn(),
    trackClick: vi.fn(),
    trackFormSubmit: vi.fn(),
    trackConfirmacion: vi.fn(),
    trackGift: vi.fn(),
    trackShare: vi.fn(),
    trackDownload: vi.fn(),
    trackCustomEvent: vi.fn(),
    trackError: vi.fn(),
    getStatus: vi.fn(),
    trackPageView: vi.fn(), // Ensure this is mocked if usePageTracking calls it
  }
}));

describe('useBabyShowerAnalytics Hooks', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    // Mock global.Date.now for consistent time tracking in usePageTracking
    vi.spyOn(global.Date, 'now').mockReturnValue(new Date('2024-01-01T00:00:00.000Z').getTime());
  });

  afterEach(() => {
     vi.restoreAllMocks();
  });

  describe('usePageTracking', () => {
    test('should call trackPageView on mount and trackCustomEvent on unmount', () => {
      const testPageName = 'Test Page';
      const { unmount } = renderHook(() => usePageTracking(testPageName));

      // Check if trackPageView was called on mount
      expect(babyShowerAnalytics.trackPageView).toHaveBeenCalledWith(testPageName);
      expect(babyShowerAnalytics.trackPageView).toHaveBeenCalledTimes(1);

      // Simulate time passing for the time spent calculation
      act(() => {
        vi.spyOn(global.Date, 'now').mockReturnValue(new Date('2024-01-01T00:00:10.000Z').getTime()); // 10 seconds later
      });

      unmount();

      // Check if trackCustomEvent was called on unmount for time spent
      expect(babyShowerAnalytics.trackCustomEvent).toHaveBeenCalledWith(
        'TIEMPO_EN_PAGINA',
        `Pasó 10 segundos en: ${testPageName}`,
        { pagina: testPageName, segundos: 10 }
      );
      expect(babyShowerAnalytics.trackCustomEvent).toHaveBeenCalledTimes(1);
    });

     test('should not call trackCustomEvent on unmount if time spent is less than or equal to 5 seconds', () => {
      const testPageName = 'Short Visit Page';
      const { unmount } = renderHook(() => usePageTracking(testPageName));

      expect(babyShowerAnalytics.trackPageView).toHaveBeenCalledWith(testPageName);

      act(() => {
        vi.spyOn(global.Date, 'now').mockReturnValue(new Date('2024-01-01T00:00:03.000Z').getTime()); // 3 seconds later
      });

      unmount();

      expect(babyShowerAnalytics.trackCustomEvent).not.toHaveBeenCalled();
    });
  });

  describe('useEventTracking (via trackCustomEvent from useBabyShowerAnalytics)', () => {
    test('should call babyShowerAnalytics.trackCustomEvent with correct parameters', () => {
      const { result } = renderHook(() => useBabyShowerAnalytics());
      const { trackCustomEvent } = result.current;

      const eventName = 'TEST_EVENT';
      const description = 'This is a test event';
      const data = { customKey: 'customValue' };

      act(() => {
        trackCustomEvent(eventName, description, data);
      });

      expect(babyShowerAnalytics.trackCustomEvent).toHaveBeenCalledWith(eventName, description, data);
      expect(babyShowerAnalytics.trackCustomEvent).toHaveBeenCalledTimes(1);
    });
  });
});
