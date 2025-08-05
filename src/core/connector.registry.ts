import { IConnector } from './base-connector.js';

const registry = new Map<string, IConnector>();

export function registerConnector(connector: IConnector) {
  if (registry.has(connector.name)) {
    throw new Error(`Connector with name '${connector.name}' is already registered.`);
  }
  registry.set(connector.name, connector);
}

export function getConnector(name: string): IConnector | undefined {
  return registry.get(name);
}