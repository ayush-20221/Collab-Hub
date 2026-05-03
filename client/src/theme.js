import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles = {
  global: {
    "html, body": {
      backgroundColor: "#050505",
      backgroundImage: "radial-gradient(circle at 50% 0%, #151520 0%, #050505 60%)",
      backgroundAttachment: "fixed",
      color: "whiteAlpha.900",
      minHeight: "100vh",
      fontFamily: "'Outfit', sans-serif"
    },
    "#root": {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }
  },
};

const theme = extendTheme({ 
  config, 
  styles,
  fonts: {
    heading: `'Outfit', sans-serif`,
    body: `'Outfit', sans-serif`,
  },
  colors: {
    brand: {
      50: "#fcfcff",
      100: "#e0e0ec",
      200: "#c7c7da",
      300: "#a9a9c9",
      400: "#9191bb",
      500: "#7c7caa",
      600: "#60608f",
      700: "#494970",
      800: "#323250",
      900: "#222233",
    },
    premium: {
      900: "#0A0A0A",
      800: "#121212",
      700: "#1A1A1A",
      glass: "rgba(255, 255, 255, 0.03)",
      glassStrong: "rgba(255, 255, 255, 0.08)"
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "semibold",
        borderRadius: "lg",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      variants: {
        solid: {
          bg: "whiteAlpha.100",
          color: "white",
          border: "1px solid",
          borderColor: "whiteAlpha.200",
          _hover: {
            bg: "whiteAlpha.200",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 20px rgba(255,255,255,0.06)"
          },
          _active: {
            transform: "translateY(0px)",
            bg: "whiteAlpha.300"
          }
        },
        outline: {
          color: "whiteAlpha.800",
          borderColor: "whiteAlpha.200",
          _hover: {
            bg: "whiteAlpha.100",
            borderColor: "whiteAlpha.300",
            transform: "translateY(-1px)",
          }
        }
      }
    },
    Input: {
      variants: {
        outline: {
          field: {
            bg: "rgba(0,0,0,0.3)",
            borderColor: "whiteAlpha.100",
            color: "white",
            _hover: {
              borderColor: "whiteAlpha.300",
            },
            _focus: {
              borderColor: "whiteAlpha.600",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.2)",
            }
          }
        }
      }
    },
    Select: {
      variants: {
        outline: {
          field: {
            bg: "rgba(0,0,0,0.3)",
            borderColor: "whiteAlpha.100",
            color: "white",
            _hover: {
              borderColor: "whiteAlpha.300",
            },
            _focus: {
              borderColor: "whiteAlpha.600",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.2)",
            }
          }
        }
      }
    }
  }
});

export default theme;
