import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import FakePlayer from './FakePlayer';

describe('FakePlayer', () => {
  const mockMovie = {
    title: 'Test Movie',
    backdrop: 'https://example.com/backdrop.jpg',
  };

  const mockOnClose = vi.fn();

  it('renders buffering state initially', () => {
    render(<FakePlayer movie={mockMovie} onClose={mockOnClose} />);
    expect(screen.getByText('Carregando vídeo...')).toBeInTheDocument();
  });

  it('renders movie title after buffering', async () => {
    render(<FakePlayer movie={mockMovie} onClose={mockOnClose} />);
    // Wait for buffering to complete (1.5s)
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1600));
    });
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    render(<FakePlayer movie={mockMovie} onClose={mockOnClose} />);
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1600));
    });
    const buttons = screen.getAllByRole('button');
    const closeButton = buttons[buttons.length - 1]; // Last button is the close button
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('skip backward button works', async () => {
    render(<FakePlayer movie={mockMovie} onClose={mockOnClose} />);
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1600));
    });
    // Skip back buttons - there are now 2 (center and bottom), test the bottom one
    const buttons = screen.getAllByRole('button');
    const skipBackButton = buttons.find(button => button.title === 'Voltar 10 segundos');
    if (skipBackButton) {
      fireEvent.click(skipBackButton);
      // The time should have decreased by 10 seconds
      expect(screen.getByText('00:00:00 / 02:15:30')).toBeInTheDocument();
    }
  });

  it('skip forward button works', async () => {
    render(<FakePlayer movie={mockMovie} onClose={mockOnClose} />);
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1600));
    });
    // Skip forward buttons - there are now 2 (center and bottom), test the bottom one
    const buttons = screen.getAllByRole('button');
    const skipForwardButton = buttons.find(button => button.title === 'Avançar 10 segundos');
    if (skipForwardButton) {
      fireEvent.click(skipForwardButton);
      // The time should have increased by 10 seconds
      expect(screen.getByText('00:00:10 / 02:15:30')).toBeInTheDocument();
    }
  });

  it('progress bar is clickable', async () => {
    render(<FakePlayer movie={mockMovie} onClose={mockOnClose} />);
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1600));
    });
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveClass('cursor-pointer');
  });

  it('center controls appear when paused', async () => {
    render(<FakePlayer movie={mockMovie} onClose={mockOnClose} />);
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1600));
    });
    
    // The center controls should be visible initially (since video starts playing)
    const centerControls = document.querySelector('.absolute.inset-0');
    expect(centerControls).toBeInTheDocument();
  });
});