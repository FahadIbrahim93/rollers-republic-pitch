import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { DegradedModeBanner } from '../DegradedModeBanner';
import { apiHealth } from '@/lib/api';

/**
 * DegradedModeBanner: the visible outage indicator. It must:
 *  - render nothing when the API is healthy (local or remote-ok)
 *  - appear when a fallback actually happened (apiHealth.degraded === true)
 *  - disappear when the backend recovers
 */
describe('DegradedModeBanner', () => {
  beforeEach(() => {
    apiHealth.degraded = false;
    apiHealth.lastError = null;
    apiHealth.fallbackEmpty = false;
  });

  it('renders nothing when healthy', () => {
    const { container } = render(<DegradedModeBanner />);
    expect(container.firstChild).toBeNull();
  });

  it('stays hidden when the fallback to the bundled catalog is clean', () => {
    act(() => {
      apiHealth.degraded = true;
      apiHealth.fallbackEmpty = false;
      apiHealth._notify();
    });
    const { container } = render(<DegradedModeBanner />);
    expect(container.firstChild).toBeNull();
  });

  it('appears when the API degraded and the fallback had no data', () => {
    act(() => {
      apiHealth.degraded = true;
      apiHealth.fallbackEmpty = true;
      apiHealth._notify();
    });
    render(<DegradedModeBanner />);
    expect(screen.getByRole('status')).toBeTruthy();
    expect(screen.getByText(/showing cached catalog/i)).toBeTruthy();
  });

  it('disappears after recovery (degraded flips back to false)', () => {
    act(() => {
      apiHealth.degraded = true;
      apiHealth.fallbackEmpty = true;
      apiHealth._notify();
    });
    const { rerender } = render(<DegradedModeBanner />);
    expect(screen.getByRole('status')).toBeTruthy();

    act(() => {
      apiHealth.degraded = false;
      apiHealth._notify();
    });
    rerender(<DegradedModeBanner />);
    expect(screen.queryByRole('status')).toBeNull();
  });
});
