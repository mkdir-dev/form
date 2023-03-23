import React, {
  Children,
  createElement,
  isValidElement,
  ReactNode,
  useEffect,
} from 'react';
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { Stack, Typography } from '@mui/material';
import { StackProps } from '@mui/material/Stack';

type FormProps<T extends FieldValues> = Omit<StackProps<'form'>, 'onSubmit'> & {
  defaultValues?: T;
  title: string;
  subtitle?: string;
  onSubmit: SubmitHandler<T>;
  handleDisabled: (value: boolean) => void;
};

export const Form = <T extends FieldValues>(props: FormProps<T>) => {
  const {
    children,
    onSubmit,
    defaultValues,
    title,
    subtitle,
    handleDisabled,
    ...rest
  } = props;

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm<T>({
    values: defaultValues,
    mode: 'all',
    reValidateMode: 'onBlur',
  });

  const renderChildren = (child: ReactNode): ReactNode => {
    if (!isValidElement(child)) return child;

    const { name, children, ...rest } = child.props;

    if (name) {
      return createElement(child.type, {
        name,
        control,
        error: !!errors[name as keyof FieldErrors<T>],
        helperText: errors[name as keyof FieldErrors<T>]?.message,
        ...rest,
      });
    }

    if (children) {
      return createElement(
        child.type,
        child.props,
        Children.map(children, renderChildren)
      );
    }

    return child;
  };

  useEffect(() => {
    handleDisabled(!isValid || !isDirty);
  }, [isValid, isDirty]);

  return (
    <Stack
      component={'form'}
      alignItems="center"
      gap={2}
      p={2}
      sx={{
        bgcolor: '#fff',
        borderRadius: 3,
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      }}
      onSubmit={handleSubmit(onSubmit)}
      {...rest}
    >
      <Stack gap={1}>
        <Typography variant="h2">{title}</Typography>
        {subtitle && <Typography variant="subtitle1">{subtitle}</Typography>}
      </Stack>
      {Children.map(children, renderChildren)}
    </Stack>
  );
};
