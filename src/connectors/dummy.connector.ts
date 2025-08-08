import { IConnector } from '../core/base-connector.js';

export class DummyConnector implements IConnector {
  name = 'dummy';

  async execute(action: string, params?: Record<string, any>): Promise<any> {
    switch (action) {
      case 'ping':
        return this.ping(params);
      case 'echo':
        return this.echo(params);
      default:
        throw new Error(`Action '${action}' not found in DummyConnector.`);
    }
  }

  private async ping(params?: Record<string, any>): Promise<string> {
    return 'pong';
  }

  private async echo(params?: Record<string, any>): Promise<any> {
    if (!params || !params.message) {
      throw new Error("Parameter 'message' is required for echo action.");
    }
    return { received_message: params.message };
  }
}