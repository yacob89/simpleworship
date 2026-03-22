import { Song } from '../models/song';

/**
 * Interface for Song data access.
 * Follows Dependency Inversion Principle.
 */
export interface ISongRepository {
  getAll(): Song[];
  getById(id: string): Song | null;
}

/**
 * Static implementation of Song repository.
 * Stores songs in memory as requested (no API).
 */
export class StaticSongRepository implements ISongRepository {
  private readonly songs: Song[];

  constructor() {
    this.songs = [
      new Song(
        '1',
        'Amazing Grace',
        'John Newton',
        `Amazing grace! How sweet the sound
That saved a wretch like me!
I once was lost, but now am found;
Was blind, but now I see.

'Twas grace that taught my heart to fear,
And grace my fears relieved;
How precious did that grace appear
The hour I first believed.

Through many dangers, toils and snares,
I have already come;
'Tis grace hath brought me safe thus far,
And grace will lead me home.`
      ),
      new Song(
        '2',
        'How Great Thou Art',
        'Carl Boberg',
        `O Lord my God, when I in awesome wonder
Consider all the worlds Thy hands have made;
I see the stars, I hear the rolling thunder
Thy power throughout the universe displayed.

Then sings my soul, My Saviour God, to Thee
How great Thou art, How great Thou art.
Then sings my soul, My Saviour God, to Thee
How great Thou art, How great Thou art!

And when I think, that God, His Son not sparing;
Sent Him to die, I scarce can take it in;
That on the Cross, my burden gladly bearing,
He bled and died to take away my sin.`
      ),
    ];
  }

  getAll(): Song[] {
    return this.songs;
  }

  getById(id: string): Song | null {
    return this.songs.find((s) => s.id === id) || null;
  }
}

// Export a singleton instance for simplicity in this base version.
export const songRepository = new StaticSongRepository();
