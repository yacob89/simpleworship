import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { songRepository } from '../repositories/song.repository'
import { communicationService } from '../services/communication.service'
import { DisplayState } from '../models/display-state'
import { Song } from '../models/song'
import { Monitor, Music, ExternalLink, Play, Trash2 } from 'lucide-react'

export const Route = createFileRoute('/')({ component: Controller })

/**
 * Controller Dashboard.
 * Allows users to select songs and manage live display.
 */
function Controller() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const [liveIndex, setLiveIndex] = useState<number | null>(null)
  const songs = useMemo(() => songRepository.getAll(), [])

  /**
   * Updates the live display state and broadcasts it.
   */
  const setLive = (index: number | null) => {
    setLiveIndex(index)
    
    if (selectedSong && index !== null) {
      const newState = new DisplayState(
        selectedSong.id,
        index,
        selectedSong.title,
        selectedSong.artist,
        selectedSong.paragraphs[index]
      )
      communicationService.broadcast(newState)
    } else {
      communicationService.broadcast(DisplayState.empty())
    }
  }

  /**
   * Opens the display window in a new tab.
   */
  const openDisplay = () => {
    window.open('/display', '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="grid h-[calc(100vh-64px)] grid-cols-12 gap-4 p-4 lg:p-6">
      {/* Sidebar: Song Library */}
      <aside className="island-shell col-span-12 flex flex-col overflow-hidden rounded-2xl md:col-span-4 lg:col-span-3">
        <header className="flex items-center justify-between border-b border-gray-100 p-4 bg-gray-50/50">
          <div className="flex items-center gap-2 font-bold text-[var(--sea-ink)]">
            <Music size={18} className="text-[var(--lagoon-deep)]" />
            <span>Song Library</span>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-2">
          {songs.map((song) => (
            <button
              key={song.id}
              onClick={() => {
                setSelectedSong(song)
                setLiveIndex(null)
              }}
              className={`w-full rounded-xl p-3 text-left transition ${
                selectedSong?.id === song.id
                  ? 'bg-[var(--lagoon-deep)] text-white shadow-md shadow-cyan-900/20'
                  : 'hover:bg-gray-100 text-[var(--sea-ink-soft)]'
              }`}
            >
              <p className="font-semibold">{song.title}</p>
              <p className={`text-xs ${selectedSong?.id === song.id ? 'text-cyan-100' : 'text-gray-400'}`}>
                {song.artist}
              </p>
            </button>
          ))}
        </div>
      </aside>

      {/* Main: Control Panel */}
      <section className="island-shell col-span-12 flex flex-col overflow-hidden rounded-2xl md:col-span-8 lg:col-span-9">
        <header className="flex items-center justify-between border-b border-gray-100 p-4 bg-gray-50/50">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-[var(--sea-ink)]">
              {selectedSong ? selectedSong.title : 'Select a Song'}
            </h2>
            <p className="text-sm text-[var(--sea-ink-soft)]">
              {selectedSong?.artist || 'Choose from the library to start'}
            </p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setLive(null)}
              className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 transition"
              title="Clear Display"
            >
              <Trash2 size={16} />
              <span className="hidden sm:inline">Clear</span>
            </button>
            <button
              onClick={openDisplay}
              className="flex items-center gap-2 rounded-lg bg-[rgba(79,184,178,0.14)] px-3 py-2 text-sm font-medium text-[var(--lagoon-deep)] hover:bg-[rgba(79,184,178,0.24)] border border-[rgba(50,143,151,0.3)] transition"
            >
              <Monitor size={16} />
              <span className="hidden sm:inline">Open Display</span>
              <ExternalLink size={14} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gray-50/30">
          {!selectedSong ? (
            <div className="flex h-full flex-col items-center justify-center text-center opacity-40">
              <div className="mb-4 rounded-full bg-gray-200 p-6">
                <Play size={48} className="text-gray-400" />
              </div>
              <p className="text-lg">No song selected</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {selectedSong.paragraphs.map((paragraph, index) => (
                <button
                  key={index}
                  onClick={() => setLive(index)}
                  className={`relative flex min-h-[140px] flex-col rounded-2xl border-2 p-5 text-left transition-all ${
                    liveIndex === index
                      ? 'border-[var(--lagoon-deep)] bg-cyan-50 shadow-lg ring-1 ring-[var(--lagoon-deep)]'
                      : 'border-white bg-white hover:border-gray-200 hover:shadow-md'
                  }`}
                >
                  <span className={`mb-3 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                    liveIndex === index ? 'bg-[var(--lagoon-deep)] text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {index + 1}
                  </span>
                  <p className={`whitespace-pre-wrap text-sm leading-relaxed ${
                    liveIndex === index ? 'text-[var(--sea-ink)] font-medium' : 'text-[var(--sea-ink-soft)]'
                  }`}>
                    {paragraph}
                  </p>
                  {liveIndex === index && (
                    <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-[var(--lagoon-deep)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white animate-pulse">
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                      Live
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
