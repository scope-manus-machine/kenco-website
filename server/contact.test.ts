import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock AWS SES before importing the email module
const mockSend = vi.fn();
vi.mock('@aws-sdk/client-ses', () => {
  return {
    SESClient: vi.fn(() => ({
      send: mockSend,
    })),
    SendEmailCommand: vi.fn((params) => params),
  };
});

// Import after mocking
const { sendContactEmail } = await import('./email');

describe('Contact Form Email', () => {
  beforeEach(() => {
    mockSend.mockClear();
  });

  it('should send email successfully with all contact data', async () => {
    mockSend.mockResolvedValue({ MessageId: 'test-message-id-123' });

    const contactData = {
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+64 21 123 4567',
      message: 'I am interested in your Endurocide curtains for our hospital.',
    };

    const result = await sendContactEmail(contactData);

    expect(result).toBe(true);
    expect(mockSend).toHaveBeenCalledTimes(1);
    
    // Verify the command parameters
    const commandParams = mockSend.mock.calls[0][0];
    expect(commandParams.Destination.ToAddresses).toContain('web@kenco.nz');
    expect(commandParams.Destination.ToAddresses).toContain('peter.carikas@kenco.nz');
    expect(commandParams.Message.Subject.Data).toContain('John Smith');
    expect(commandParams.Message.Body.Text.Data).toContain('John Smith');
    expect(commandParams.Message.Body.Text.Data).toContain('john@example.com');
    expect(commandParams.Message.Body.Text.Data).toContain('+64 21 123 4567');
    expect(commandParams.Message.Body.Text.Data).toContain('Endurocide curtains');
  });

  it('should handle missing phone number gracefully', async () => {
    mockSend.mockResolvedValue({ MessageId: 'test-message-id-456' });

    const contactData = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Please send me more information about ShadeCare blinds.',
    };

    const result = await sendContactEmail(contactData);

    expect(result).toBe(true);
    expect(mockSend).toHaveBeenCalledTimes(1);
    
    const commandParams = mockSend.mock.calls[0][0];
    expect(commandParams.Message.Body.Text.Data).toContain('Not provided');
  });

  it('should return false when email sending fails', async () => {
    mockSend.mockRejectedValue(new Error('SES service unavailable'));

    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message',
    };

    const result = await sendContactEmail(contactData);

    expect(result).toBe(false);
    expect(mockSend).toHaveBeenCalledTimes(1);
  });

  it('should send to both recipient email addresses', async () => {
    mockSend.mockResolvedValue({ MessageId: 'test-message-id-789' });

    const contactData = {
      name: 'Hospital Admin',
      email: 'admin@hospital.nz',
      message: 'Bulk order inquiry',
    };

    await sendContactEmail(contactData);

    const commandParams = mockSend.mock.calls[0][0];
    const recipients = commandParams.Destination.ToAddresses;
    
    expect(recipients).toHaveLength(2);
    expect(recipients).toContain('web@kenco.nz');
    expect(recipients).toContain('peter.carikas@kenco.nz');
  });
});
