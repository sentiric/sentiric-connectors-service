import { registerConnector } from '../core/connector.registry.js';
import { DummyConnector } from './dummy.connector.js';
// import { GoogleCalendarConnector } from './google-calendar.connector.js';

export function registerConnectors() {
  registerConnector(new DummyConnector());
  // Yeni konektörler buraya eklenecek:
  // registerConnector(new GoogleCalendarConnector());
}