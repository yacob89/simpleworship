import { createTheme, alpha } from '@mui/material/styles'

// Design System Colors from DESIGN.md
const colors = {
  background: '#f8f9fa',
  surface: '#f8f9fa',
  primary: '#076968',
  primaryContainer: '#a2f0ee',
  onSurface: '#000000',
  onSurfaceVariant: '#586064',
  surfaceContainerLow: '#f1f4f6',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerHigh: '#e3e9ec',
  surfaceContainer: '#eaeff1',
  outlineVariant: '#abb3b7',
  onPrimary: '#dafffd',
}

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      contrastText: colors.onPrimary,
    },
    background: {
      default: colors.background,
      paper: colors.surfaceContainerLowest,
    },
    text: {
      primary: colors.onSurface,
      secondary: colors.onSurfaceVariant,
    },
    divider: alpha(colors.outlineVariant, 0.15),
  },
  typography: {
    fontFamily: '"Inter", "Manrope", sans-serif',
    h1: {
      fontFamily: '"Manrope", sans-serif',
      fontWeight: 800,
      color: colors.onSurface,
    },
    h2: {
      fontFamily: '"Manrope", sans-serif',
      fontWeight: 800,
      color: colors.onSurface,
    },
    h3: {
      fontFamily: '"Manrope", sans-serif',
      fontWeight: 700,
      color: colors.onSurface,
    },
    h4: {
      fontFamily: '"Manrope", sans-serif',
      fontWeight: 700,
      color: colors.onSurface,
    },
    h5: {
      fontFamily: '"Manrope", sans-serif',
      fontWeight: 700,
      color: colors.onSurface,
    },
    h6: {
      fontFamily: '"Manrope", sans-serif',
      fontWeight: 700,
      color: colors.onSurface,
    },
    button: {
      fontFamily: '"Manrope", sans-serif',
      fontWeight: 700,
      textTransform: 'none',
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      lineHeight: 1.5,
    },
    overline: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 700,
      letterSpacing: '0.2em',
      fontSize: '0.625rem',
    },
  },
  shape: {
    borderRadius: 8, // 0.5rem
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24, // xl (1.5rem) or pill
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          backgroundColor: colors.primary,
          color: colors.onPrimary,
          '&:hover': {
            backgroundColor: alpha(colors.primary, 0.9),
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16, // xl (1rem approx)
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.04)',
          border: 'none',
          backgroundColor: colors.surfaceContainerLowest,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(colors.surfaceContainerLowest, 0.8),
          backdropFilter: 'blur(12px)',
          color: colors.onSurface,
          boxShadow: 'none',
          borderBottom: `1px solid ${alpha(colors.outlineVariant, 0.1)}`,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.background,
          color: colors.onSurface,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: colors.background,
          },
          '&::-webkit-scrollbar-thumb': {
            background: colors.outlineVariant,
            borderRadius: '4px',
          },
        },
      },
    },
  },
})
