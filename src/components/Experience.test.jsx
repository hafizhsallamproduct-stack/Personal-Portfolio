import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Experience from './Experience';

describe('Experience', () => {
  it('renders timeline and toggles role details', async () => {
    const user = userEvent.setup();
    render(<Experience />);

    expect(screen.getByRole('heading', { name: /where i've worked/i })).toBeInTheDocument();
    expect(screen.getByText(/wego pte ltd/i)).toBeInTheDocument();

    // Default-expanded role shows its details
    const defaultRole = screen.getByRole('button', {
      name: /collapse senior product designer ii/i,
    });
    expect(defaultRole).toHaveAttribute('aria-expanded', 'true');

    await user.click(defaultRole);
    expect(defaultRole).toHaveAttribute('aria-expanded', 'false');
  });
});
