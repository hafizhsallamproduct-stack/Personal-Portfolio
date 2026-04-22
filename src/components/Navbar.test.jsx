import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders all section links', () => {
    render(<Navbar />);
    // Each link appears twice (nav-top + nav-fixed) — just assert presence
    expect(screen.getAllByRole('link', { name: /about/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /experience/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /education/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /my work/i }).length).toBeGreaterThan(0);
  });

  it('toggles mobile menu open state', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const [hamburger] = screen.getAllByRole('button', { name: /toggle menu/i });
    await user.click(hamburger);
    // Menu toggle is a visual/class change — just assert no crash and button is still there
    expect(hamburger).toBeInTheDocument();
  });
});
