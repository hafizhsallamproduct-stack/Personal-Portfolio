import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from './Footer';

describe('Footer', () => {
  it('renders copyright and calls toggleTheme on click', async () => {
    const user = userEvent.setup();
    const toggleTheme = vi.fn();
    render(<Footer theme="light" toggleTheme={toggleTheme} />);

    expect(screen.getByText(/hafizh sallam/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /toggle theme/i }));
    expect(toggleTheme).toHaveBeenCalledOnce();
  });
});
