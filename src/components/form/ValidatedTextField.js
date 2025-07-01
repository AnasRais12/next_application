'use client';
import React, { useState } from 'react';
import {
  TextField,
  FormControl,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';
import {
  CheckCircle,
  Error,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

const ValidatedTextField = ({
  label,
  placeholder,
  register,
  name,
  errors,
  isValid,
  type = 'text',
  theme,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === 'password';
  const inputType = isPasswordField && !showPassword ? 'password' : 'text';

  return (
    <FormControl fullWidth error={!!errors[name]}>
      <label className="block text-lg lg:text-sm font-medium  mb-1 ">
        {label}
      </label>
      <TextField
        placeholder={placeholder}
        type={inputType}
        {...register(name)}
        variant="outlined"
        fullWidth
        sx={(theme) => ({
          '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: errors[name]
                ? theme.palette.error.main
                : isValid
                  ? '#4caf50'
                  : theme.palette.borderColor,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: errors[name]
                ? theme.palette.error.main
                : isValid
                  ? '#4caf50'
                  : theme.palette.borderColor,
            },
          },
        })}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {/* Password Visibility Toggle */}
              {isPasswordField && !isValid && !errors[name] && (
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <VisibilityOff className="text-gray-500" />
                  ) : (
                    <Visibility className="text-primary" />
                  )}
                </IconButton>
              )}

              {/* Error / Success Icons */}
              {errors[name] && (
                <span
                  style={{
                    color: '#ef4444',
                    fontSize: '1rem',
                    marginLeft: '4px',
                    fontFamily: theme?.typography?.fontFamily,
                    fontWeight: 'bold',
                  }}
                >
                  <Error />
                </span>
              )}
              {!errors[name] && isValid && (
                <span
                  style={{
                    color: '#4caf50',
                    fontSize: '1rem',
                    marginLeft: '4px',
                    fontFamily: theme?.typography?.fontFamily,
                    fontWeight: 'bold',
                  }}
                >
                  <CheckCircle />
                </span>
              )}
            </InputAdornment>
          ),
        }}
      />
      {errors[name]?.message && (
        <FormHelperText sx={{ fontWeight: '700', marginLeft: '4px' }}>
          {errors[name]?.message?.toString()}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default ValidatedTextField;
