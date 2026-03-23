import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { songRepository } from '../repositories/song.repository'
import { communicationService } from '../services/communication.service'
import { DisplayState } from '../models/display-state'
import type { Song } from '../models/song'
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Card,
  IconButton,
  InputAdornment,
  Stack,
  alpha,
  Divider,
  Grid,
} from '@mui/material'
import { Search, Add, OpenInNew, DragIndicator } from '@mui/icons-material'

export const Route = createFileRoute('/')({ component: Controller })

/**
 * Controller Dashboard.
 * Redesigned with Material UI following "The Editorial Archive" design system.
 */
function Controller() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(
    songRepository.getAll()[0] || null,
  )
  const [liveIndex, setLiveIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const songs = useMemo(() => songRepository.getAll(), [])

  const filteredSongs = useMemo(() => {
    return songs.filter(
      (s) =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.artist.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [songs, searchQuery])

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
        selectedSong.paragraphs[index],
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
    <Box
      sx={{
        display: 'flex',
        minHeight: 'calc(100vh - 64px)',
        mt: '64px',
        backgroundColor: 'background.default',
      }}
    >
      {/* Sidebar: Song Library */}
      <Box
        component="aside"
        sx={{
          width: { lg: 320, xl: 360 },
          display: { xs: 'none', lg: 'flex' },
          flexDirection: 'column',
          backgroundColor: '#f1f4f6', // surface-container-low
          p: 4,
          position: 'sticky',
          top: 64,
          height: 'calc(100vh - 64px)',
          overflowY: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Song Library
          </Typography>
          <IconButton color="primary" size="small">
            <Add />
          </IconButton>
        </Box>

        {/* Search Bar */}
        <TextField
          fullWidth
          variant="filled"
          placeholder="Search songs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: 'text.secondary', fontSize: 20 }} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 3,
              backgroundColor: '#ffffff',
              '&:hover': {
                backgroundColor: '#ffffff',
              },
              '&.Mui-focused': {
                backgroundColor: '#ffffff',
              },
            },
          }}
          sx={{ mb: 3 }}
        />

        {/* Song List */}
        <Stack spacing={1} sx={{ flex: 1 }}>
          {filteredSongs.map((song) => {
            const isSelected = selectedSong?.id === song.id
            return (
              <Box
                key={song.id}
                onClick={() => {
                  setSelectedSong(song)
                  setLiveIndex(null)
                }}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: isSelected
                    ? alpha('#076968', 0.1)
                    : 'transparent',
                  borderLeft: isSelected
                    ? '4px solid #076968'
                    : '4px solid transparent',
                  '&:hover': {
                    backgroundColor: isSelected
                      ? alpha('#076968', 0.15)
                      : alpha('#000', 0.04),
                  },
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, color: 'black' }}
                >
                  {song.title}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {song.artist}
                </Typography>
              </Box>
            )
          })}
        </Stack>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          p: { xs: 4, md: 6, lg: 8 },
          backgroundColor: 'background.default',
          overflowY: 'auto',
        }}
      >
        {selectedSong ? (
          <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
            {/* Header Section */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { md: 'flex-end' },
                justifyContent: 'space-between',
                mb: 6,
                gap: 3,
              }}
            >
              <Box>
                <Typography
                  variant="overline"
                  sx={{
                    display: 'inline-block',
                    px: 1.5,
                    py: 0.5,
                    backgroundColor: '#eaeff1',
                    borderRadius: 10,
                    mb: 2,
                    color: 'text.secondary',
                  }}
                >
                  Now Presenting
                </Typography>
                <Typography
                  variant="h2"
                  sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 1 }}
                >
                  {selectedSong.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: 'text.secondary', fontSize: '1.125rem' }}
                >
                  {selectedSong.artist} •{' '}
                  <Box
                    component="span"
                    sx={{ fontStyle: 'italic', fontWeight: 600 }}
                  >
                    Hymns of Faith
                  </Box>
                </Typography>
              </Box>

              <Stack direction="row" spacing={2}>
                <Button
                  onClick={() => setLive(null)}
                  sx={{
                    color: 'primary.main',
                    '&:hover': { backgroundColor: alpha('#076968', 0.05) },
                  }}
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  onClick={openDisplay}
                  startIcon={<OpenInNew />}
                >
                  Open Display
                </Button>
              </Stack>
            </Box>

            {/* Lyrics Grid */}
            <Grid container spacing={4} sx={{ mb: 8 }}>
              {selectedSong.paragraphs.map((paragraph, index) => {
                const isLive = liveIndex === index
                return (
                  <Grid item xs={12} md={isLive ? 12 : 6} key={index}>
                    <Card
                      onClick={() => setLive(index)}
                      sx={{
                        p: 4,
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        position: 'relative',
                        borderLeft: isLive ? '4px solid #076968' : 'none',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.06)',
                        },
                        backgroundColor: isLive
                          ? alpha('#076968', 0.02)
                          : 'background.paper',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mb: 3,
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{
                            fontStyle: 'italic',
                            color: isLive
                              ? 'primary.main'
                              : alpha('#abb3b7', 0.4),
                            fontWeight: 800,
                          }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </Typography>
                        {isLive ? (
                          <Box
                            sx={{
                              px: 1.5,
                              py: 0.5,
                              backgroundColor: 'primary.main',
                              color: 'primary.contrastText',
                              borderRadius: 10,
                              fontSize: '0.625rem',
                              fontWeight: 900,
                              letterSpacing: '0.1em',
                              animation: 'pulse 2s infinite',
                            }}
                          >
                            LIVE
                          </Box>
                        ) : (
                          <DragIndicator
                            sx={{ color: alpha('#abb3b7', 0.4) }}
                          />
                        )}
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: isLive ? '1.5rem' : '1.25rem',
                          whiteSpace: 'pre-line',
                          fontWeight: isLive ? 500 : 400,
                          color: 'black',
                        }}
                      >
                        {paragraph}
                      </Typography>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>

            <Divider sx={{ mb: 6, opacity: 0.1 }} />

            {/* Metadata Section */}
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  Performance Notes
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary' }}
                >
                  Traditional arrangement. Recommended tempo: 72 BPM. Lead
                  with acoustic guitar or piano for a warm, intimate
                  opening. The transition between Stanza 2 and 3 should
                  swell in intensity.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  {[
                    { label: 'Key Signature', value: 'G Major' },
                    { label: 'Time Sig', value: '3/4' },
                    { label: 'Language', value: 'English' },
                    { label: 'Tags', value: 'Hymn' },
                  ].map((meta) => (
                    <Grid item xs={6} key={meta.label}>
                      <Box
                        sx={{
                          p: 2,
                          backgroundColor: '#f1f4f6',
                          borderRadius: 3,
                        }}
                      >
                        <Typography
                          variant="overline"
                          sx={{
                            display: 'block',
                            mb: 0.5,
                            color: 'text.secondary',
                          }}
                        >
                          {meta.label}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ fontSize: '1rem', fontWeight: 800 }}
                        >
                          {meta.value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box
            sx={{
              height: '60vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.3,
            }}
          >
            <Typography variant="h4">Select a song to begin</Typography>
          </Box>
        )}
      </Box>

      {/* Pulse Animation for LIVE indicator */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.6; }
          100% { opacity: 1; }
        }
      `,
        }}
      />
    </Box>
  )
}
