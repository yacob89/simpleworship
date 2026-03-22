import type { IDisplayState } from '../models/display-state';

/**
 * Interface for the communication service.
 * Supports sending and receiving display states across tabs.
 */
export interface ICommunicationService {
  broadcast(state: IDisplayState): void;
  onReceive(callback: (state: IDisplayState) => void): () => void;
  close(): void;
}

/**
 * Implementation using the native BroadcastChannel API.
 * Ensures cross-tab synchronization on the same origin.
 */
export class BroadcastChannelService implements ICommunicationService {
  private readonly channel: BroadcastChannel;
  private readonly CHANNEL_NAME = 'worship_display_channel';

  constructor() {
    this.channel = new BroadcastChannel(this.CHANNEL_NAME);
  }

  /**
   * Broadcasts the display state to all other tabs.
   */
  public broadcast(state: IDisplayState): void {
    this.channel.postMessage(state);
  }

  /**
   * Subscribes to display state changes from other tabs.
   * Returns a cleanup function.
   */
  public onReceive(callback: (state: IDisplayState) => void): () => void {
    const handler = (event: MessageEvent<IDisplayState>) => {
      callback(event.data);
    };

    this.channel.addEventListener('message', handler);
    return () => this.channel.removeEventListener('message', handler);
  }

  /**
   * Closes the communication channel.
   */
  public close(): void {
    this.channel.close();
  }
}

// Export a singleton instance.
export const communicationService = new BroadcastChannelService();
