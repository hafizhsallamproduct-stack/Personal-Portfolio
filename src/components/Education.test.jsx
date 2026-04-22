import { render, screen } from '@testing-library/react';
import Education from './Education';

describe('Education', () => {
  it('renders university and degree', () => {
    render(<Education />);
    expect(screen.getByRole('heading', { name: /background/i })).toBeInTheDocument();
    expect(screen.getByText(/universiti utara malaysia/i)).toBeInTheDocument();
    expect(screen.getByText(/multimedia design/i)).toBeInTheDocument();
  });
});
