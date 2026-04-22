import { render, screen } from '@testing-library/react';
import About from './About';

describe('About', () => {
  it('renders heading, stats, and languages', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: /who i am/i })).toBeInTheDocument();
    expect(screen.getByText('10+')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /languages/i })).toBeInTheDocument();
    expect(screen.getByText(/english/i)).toBeInTheDocument();
  });
});
