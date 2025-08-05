export interface IConnector {
  name: string;
  execute(action: string, params?: Record<string, any>): Promise<any>;
}