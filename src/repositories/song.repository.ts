import { Song } from '../models/song'
import { songs as data } from '../data/songs'

/**
 * Interface for Song data access.
 * Follows Dependency Inversion Principle.
 */
export interface ISongRepository {
  getAll: () => Song[]
  getById: (id: string) => Song | null
}

/**
 * Static implementation of Song repository.
 * Stores songs in memory as requested (no API).
 */
export class StaticSongRepository implements ISongRepository {
  private readonly songs: Song[]

  constructor() {
    this.songs = data.map(
      (s) => new Song(s.id, s.title, s.artist, s.rawText),
    )
  }

  getAll(): Song[] {
    return this.songs
  }

  getById(id: string): Song | null {
    return this.songs.find((s) => s.id === id) || null
  }
}

// Export a singleton instance for simplicity in this base version.
export const songRepository = new StaticSongRepository()
