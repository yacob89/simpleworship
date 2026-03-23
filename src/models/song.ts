/**
 * Interface representing a song structure.
 * Follows SRP by focusing only on data structure.
 */
export interface ISong {
  id: string
  title: string
  artist: string
  rawText: string
}

/**
 * Domain model for a Song.
 * Encapsulates the logic for parsing raw text into paragraphs.
 */
export class Song implements ISong {
  public readonly paragraphs: string[]

  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly artist: string,
    public readonly rawText: string,
  ) {
    this.paragraphs = this.parseText(rawText)
  }

  /**
   * Splits the raw text into paragraphs based on double newlines.
   * Ensures no empty paragraphs are included.
   */
  private parseText(text: string): string[] {
    return text
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0)
  }
}
