import { Box, Container, Typography, IconButton } from '@mui/material'
import { X, GitHub } from '@mui/icons-material'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        pt: 6,
        pb: 8,
        backgroundColor: 'transparent',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
            pt: 4,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            &copy; {year} SimpleWorship. All rights reserved.
          </Typography>

          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontWeight: 800,
            }}
          >
            Built with TanStack Start & MUI
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          <IconButton
            href="https://x.com/tan_stack"
            target="_blank"
            rel="noreferrer"
            size="large"
            sx={{ color: 'text.secondary', '&:hover': { color: 'black' } }}
          >
            <X fontSize="inherit" />
          </IconButton>
          <IconButton
            href="https://github.com/TanStack"
            target="_blank"
            rel="noreferrer"
            size="large"
            sx={{ color: 'text.secondary', '&:hover': { color: 'black' } }}
          >
            <GitHub fontSize="inherit" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  )
}
