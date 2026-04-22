import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PortfolioModal from './PortfolioModal';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/portfolio/:slug" element={<PortfolioModal isStandalone />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('PortfolioModal', () => {
  it('renders selected project title and dialog role', () => {
    renderAt('/portfolio/wego-design-system');
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByRole('heading', { name: /wego design system/i })).toBeInTheDocument();
  });

  it('focuses the close button on open', () => {
    renderAt('/portfolio/wego-design-system');
    expect(screen.getByRole('button', { name: /close modal/i })).toHaveFocus();
  });

  it('closes on Escape key', async () => {
    const user = userEvent.setup();
    renderAt('/portfolio/wego-design-system');

    const heading = screen.getByRole('heading', { name: /wego design system/i });
    await user.keyboard('{Escape}');
    // After Escape, the router navigates away; the heading should no longer be in the doc
    expect(heading).not.toBeInTheDocument();
  });
});
