import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SkillsAndWork from './SkillsAndWork';

describe('SkillsAndWork', () => {
  it('renders skills, tools, and work cards', () => {
    render(
      <MemoryRouter>
        <SkillsAndWork />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /what i do/i })).toBeInTheDocument();
    expect(screen.getByText(/product design/i)).toBeInTheDocument();
    expect(screen.getByText(/figma/i)).toBeInTheDocument();
    expect(screen.getAllByText(/view project/i).length).toBeGreaterThan(0);
  });
});
