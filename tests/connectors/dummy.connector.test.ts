import { describe, it, expect } from 'vitest';
import { DummyConnector } from '../../src/connectors/dummy.connector.js';

describe('DummyConnector', () => {
  const connector = new DummyConnector();

  it('should return "pong" for ping action', async () => {
    const result = await connector.execute('ping');
    expect(result).toBe('pong');
  });

  it('should echo the provided message', async () => {
    const message = 'Hello, Vitest!';
    const result = await connector.execute('echo', { message });
    expect(result).toEqual({ received_message: message });
  });

  it('should throw an error if message is missing for echo action', async () => {
    await expect(connector.execute('echo')).rejects.toThrow(
      "Parameter 'message' is required for echo action."
    );
  });

  it('should throw an error for an unknown action', async () => {
    await expect(connector.execute('unknown_action')).rejects.toThrow(
      "Action 'unknown_action' not found in DummyConnector."
    );
  });
});