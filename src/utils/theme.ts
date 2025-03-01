'use client'
//import { green, purple, red, } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';


// Augment the palette to include an ochre color
declare module '@mui/material/styles' {
    interface Palette {
      paper: Palette['primary'];
      custombg:Palette['primary'];
    }
  
    interface PaletteOptions {
      paper: PaletteOptions['primary'];
      custombg:Palette['primary'];
    }
  }
  
  // Update the Button's color options to include an ochre option
  declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
      paper: true;
      custombg: true;
    }
  }

  declare module '@mui/material/AppBar' {
    interface AppBarPropsColorOverrides {
      paper: true;
      custombg: true;
    }
  }


export const theme = createTheme({
    cssVariables:false,
    colorSchemes:{
        dark: {
            palette:{
                primary:{
                    main:'#e85e71'
                },
                secondary:{
                    main:'#555c6a'
                },
                paper:{
                    main:'#212121',
                    light: '#E9DB5D',
                    dark: '#E9DB5D',
                    contrastText: '#242105',
                },
                custombg:{
                    main:'#212121',
                    light: '#fff',
                    dark: '#fff',
                    contrastText: '#212121',
                }
            }}, 
            light: true,
    },
    palette:{
        primary:{
            main:'#E3364E',
        },
        secondary:{
            main:'#2B3445'
            
        },
        paper:{
            main: '#FBFBFB',
            light: '#FBFBFB',
            dark: '#FBFBFB',
            contrastText: '#FBFBFB',
        },
        custombg:{
            main:'#fff',
            light: '#fff',
            dark: '#fff',
            contrastText: '#212121',
        }

    }
    });
