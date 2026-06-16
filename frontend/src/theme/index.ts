import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary:   { main: '#F59E0B', contrastText: '#0F172A' },
    secondary: { main: '#8B5CF6', contrastText: '#fff' },
    error:     { main: '#EF4444' },
    success:   { main: '#10B981' },
    warning:   { main: '#FBBF24' },
    background: {
      default: '#050508',
      paper:   'rgba(255,255,255,0.05)',
    },
    text: {
      primary:   '#F8FAFC',
      secondary: '#8A8F98',
    },
    divider: 'rgba(255,255,255,0.1)',
  },
  typography: {
    fontFamily: '"Inter", system-ui, sans-serif',
    h1: { fontFamily: '"Calistoga", serif' },
    h2: { fontFamily: '"Calistoga", serif' },
    h3: { fontFamily: '"Calistoga", serif' },
    h4: { fontFamily: '"Calistoga", serif' },
    h5: { fontFamily: '"Calistoga", serif' },
    h6: { fontFamily: '"Calistoga", serif' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { background: '#050508' }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.08)',
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.08)',
          transition: 'all 250ms cubic-bezier(0.16,1,0.3,1)',
          '&:hover': {
            borderColor: 'rgba(245,158,11,0.3)',
            boxShadow: '0 0 40px rgba(245,158,11,0.1)',
            transform: 'translateY(-2px)',
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 50,
          transition: 'all 200ms cubic-bezier(0.16,1,0.3,1)',
        },
        contained: {
          background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
          color: '#0F172A',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 0 30px rgba(245,158,11,0.3)',
            transform: 'translateY(-1px)',
          }
        },
        outlined: {
          borderColor: 'rgba(255,255,255,0.15)',
          '&:hover': {
            borderColor: '#F59E0B',
            color: '#F59E0B',
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          background: 'rgba(255,255,255,0.05)',
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: 1,
          textTransform: 'uppercase',
          color: '#8A8F98',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        },
        body: {
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          fontSize: 14,
        }
      }
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: 11,
          letterSpacing: 0.5,
          borderRadius: 50,
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'rgba(255,255,255,0.04)',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
            '&:hover fieldset': { borderColor: '#F59E0B' },
            '&.Mui-focused fieldset': {
              borderColor: '#F59E0B',
              boxShadow: '0 0 0 3px rgba(245,158,11,0.12)',
            }
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(5,5,10,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          boxShadow: 'none',
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'rgba(5,5,10,0.9)',
          backdropFilter: 'blur(20px)',
          border: 'none',
          borderRight: '1px solid rgba(255,255,255,0.08)',
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          marginBottom: 4,
          transition: 'all 150ms ease',
          '&:hover': {
            background: 'rgba(255,255,255,0.05)',
          }
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: { color: '#8A8F98', minWidth: 40 }
      }
    },
  },
});

export default theme;
