import React, { useState } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { TextField, TextFieldProps, IconButton } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { typesInput } from 'utils/constants';

type InputProps<T extends FieldValues = FieldValues> = Omit<
  TextFieldProps,
  'select'
> & {
  control?: Control<T>;
  name: Path<T>;
};

export const Input = (props: InputProps) => {
  const { name, label, control, type, required, ...rest } = props;

  const [showPass, setShowPass] = useState(false);

  const rules = {
    required: required ? { value: true, message: 'Обязательное поле' } : false,
    pattern:
      type === 'inputEmail'
        ? {
            value: /\S+@\S+\.\S+/,
            message: 'Неверный формат E-mail',
          }
        : undefined,
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          label={label}
          type={type && !showPass ? typesInput[type] : 'text'}
          required={required}
          placeholder={type === 'inputEmail' ? 'someemail@example.com' : ''}
          {...rest}
          {...field}
          fullWidth
          InputProps={{
            endAdornment: (
              <>
                {type === 'inputPassword' && (
                  <IconButton onClick={() => setShowPass(!showPass)}>
                    {showPass ? (
                      <VisibilityOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </IconButton>
                )}
              </>
            ),
          }}
        />
      )}
    />
  );
};
