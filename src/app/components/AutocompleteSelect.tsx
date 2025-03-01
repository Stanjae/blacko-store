'use client'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress } from '@mui/material';


function sleep(duration: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  }

export default function AutocompleteSelection({label, value, states, setValue, }:{ value:string | null; label:string; states:string[]; setValue: React.Dispatch<React.SetStateAction<string | null>>}) {

  const [inputValue, setInputValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const [options, setOptions] = React.useState<readonly string[]>([]);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    (async () => {
      setLoading(true);
      await sleep(1e3); // For demo purposes.
      setLoading(false);

      setOptions([...states]);
    })();
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };


  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue: string | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        open={open}
        isOptionEqualToValue={(option, value) => option === value}
        getOptionLabel={(option) => option}
        options={options}
        loading={loading}
        onOpen={handleOpen}
        onClose={handleClose}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        sx={{ width: '100%' }}
        renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              slotProps={{
                input: {
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                },
              }}
            />
          )}
      />
    </div>
  );
}
