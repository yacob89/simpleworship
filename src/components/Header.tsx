import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  alpha,
} from '@mui/material'
import { Link, useLocation } from '@tanstack/react-router'
import { Settings, AccountCircle } from '@mui/icons-material'

export default function Header() {
  const location = useLocation()

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Library', to: '/' }, // Library is integrated into Home in this design
    { label: 'Docs', to: '/about' },
  ]

  return (
    <AppBar position="fixed" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ height: 64, justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                fontWeight: 800,
                color: 'black',
                textDecoration: 'none',
                fontFamily: '"Manrope", sans-serif',
                fontSize: '1.25rem',
              }}
            >
              SimpleWorship
            </Typography>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
              {navItems.map((item) => {
                const isActive = location.pathname === item.to
                return (
                  <Button
                    key={item.label}
                    component={Link}
                    to={item.to}
                    sx={{
                      color: isActive ? 'black' : 'text.secondary',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      fontFamily: '"Manrope", sans-serif',
                      padding: '4px 0',
                      minWidth: 0,
                      borderRadius: 0,
                      borderBottom: isActive ? '2px solid' : 'none',
                      borderColor: 'primary.main',
                      '&:hover': {
                        color: 'black',
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                )
              })}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton size="small" sx={{ color: 'primary.main' }}>
              <Settings />
            </IconButton>
            <IconButton size="small" sx={{ color: 'primary.main' }}>
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
