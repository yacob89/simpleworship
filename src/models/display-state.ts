/**
 * Interface representing the current state of the display.
 * Used for synchronization between tabs.
 */
export interface IDisplayState {
  songId: string | null
  paragraphIndex: number | null
  title: string | null
  artist: string | null
  content: string | null
}

/**
 * Value object representing the live display state.
 * Implements IDisplayState to ensure type safety.
 */
export class DisplayState implements IDisplayState {
  constructor(
    public readonly songId: string | null = null,
    public readonly paragraphIndex: number | null = null,
    public readonly title: string | null = null,
    public readonly artist: string | null = null,
    public readonly content: string | null = null,
  ) {}

  /**
   * Helper to create an empty/cleared state.
   */
  static empty(): DisplayState {
    return new DisplayState()
  }
}
