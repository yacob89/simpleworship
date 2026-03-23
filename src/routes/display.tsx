import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { communicationService } from '../services/communication.service'
import { DisplayState } from '../models/display-state'
import type { IDisplayState } from '../models/display-state'
import { Box, Typography, Fade } from '@mui/material'

export const Route = createFileRoute('/display')({
  component: LiveDisplay,
})

/**
 * Live Display Screen for projection.
 * Redesigned with premium typography and clean layout.
 */
function LiveDisplay() {
  const [state, setState] = useState<IDisplayState>(DisplayState.empty())
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const cleanup = communicationService.onReceive((newState) => {
      // Simple fade out/in effect when content changes
      setVisible(false)
      setTimeout(() => {
        setState(newState)
        setVisible(true)
      }, 200)
    })

    return cleanup
  }, [])

  if (!state.content) {
    return (
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          backgroundColor: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: 'rgba(255, 255, 255, 0.2)',
            fontStyle: 'italic',
            fontFamily: '"Manrope", sans-serif',
          }}
        >
          SimpleWorship
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        p: 8,
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Fade in={visible} timeout={400}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', md: '5rem', lg: '7rem' },
              fontWeight: 700,
              lineHeight: 1.2,
              whiteSpace: 'pre-wrap',
              textShadow: '0 4px 12px rgba(0,0,0,0.5)',
              fontFamily: '"Inter", sans-serif',
              color: 'white',
            }}
          >
            {state.content}
          </Typography>
        </Fade>
      </Box>

      {/* Footer with metadata */}
      <Box
        sx={{
          mt: 4,
          pt: 4,
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'flex-end',
          opacity: 0.6,
        }}
      >
        <Box sx={{ textAlign: 'right' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              fontFamily: '"Manrope", sans-serif',
              fontSize: '1.5rem',
              color: 'white',
            }}
          >
            {state.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: '"Inter", sans-serif',
              color: 'white',
            }}
          >
            {state.artist}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
