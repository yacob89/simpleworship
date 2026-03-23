import { createFileRoute } from '@tanstack/react-router'
import { Box, Container, Typography, Card } from '@mui/material'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <Box
      sx={{
        pt: 12,
        pb: 8,
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="md">
        <Card sx={{ p: { xs: 4, md: 8 } }}>
          <Typography
            variant="overline"
            sx={{
              display: 'block',
              mb: 2,
              color: 'primary.main',
              fontWeight: 800,
            }}
          >
            About
          </Typography>
          <Typography
            variant="h2"
            sx={{
              mb: 4,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              lineHeight: 1.1,
            }}
          >
            A high-end, editorial foundation for worship.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: '1.25rem',
              lineHeight: 1.8,
              maxWidth: '800px',
            }}
          >
            SimpleWorship is built upon "The Editorial Archive" design
            philosophy. Utilizing Material UI and TanStack Start, we've created
            a gallery-like experience that prioritizes white space, typography,
            and tonal depth. This provides a clean, authoritative environment
            for managing and presenting worship content.
          </Typography>
        </Card>
      </Container>
    </Box>
  )
}
