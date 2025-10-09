import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFormStatus } from 'react-dom';
import SubmitButton from './SubmitButton';

vi.mock('react-dom', async (importOriginal) => {
  const originalModule = await importOriginal<typeof import('react-dom')>();
  return {
    ...originalModule,
    useFormStatus: vi.fn(),
  };
});

const mockedUseFormStatus = vi.mocked(useFormStatus);

describe('SubmitButton', () => {
  beforeEach(() => {
    mockedUseFormStatus.mockClear();
  });

  it('should render the button with default text and not disabled', () => {
    mockedUseFormStatus.mockReturnValue({ 
		pending: false,
      	data: null,
      	method: null,
      	action: null,
	 });

    render(
      <SubmitButton text='Enviar' pendingText="Enviando..." />
    );
    const button = screen.getByRole('button', { name: /Enviar/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('should render the button with pending text and should be disabled', () => {
    mockedUseFormStatus.mockReturnValue({ 
		pending: true,
		data: new FormData(),
		method: 'null',
		action: 'null',
	 });

    render(
      <SubmitButton text='Enviar' pendingText="Enviando..." />
    );

    const button = screen.getByRole('button', { name: /Enviando.../i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});