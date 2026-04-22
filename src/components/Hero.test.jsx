import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero', () => {
  it('renders name, subtitle, and both CTAs', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { name: /hafizh sallam/i })).toBeInTheDocument();
    expect(screen.getByText(/senior product designer crafting/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /get in touch/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view my work/i })).toBeInTheDocument();
  });
});
