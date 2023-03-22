import React, {
  Children,
  createElement,
  isValidElement,
  ReactNode,
  useEffect,
} from 'react';
import {
  FieldErrors,
  FieldValue,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { Stack, Typography } from '@mui/material';
import { StackProps } from '@mui/material/Stack';

type FormProps<T extends FieldValues> = Omit<StackProps<'form'>, 'onSubmit'> & {
  onSubmit: SubmitHandler<T>;
  defaultValues?: T;
  setValues?: Array<[Path<T>, FieldValue<T>]>;
  title: string;
  subtitle?: string;
};

export const Form = <T extends FieldValues>(props: FormProps<T>) => {
  const {
    setValues,
    children,
    onSubmit,
    defaultValues,
    title,
    subtitle,
    ...rest
  } = props;

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<T>({
    values: defaultValues,
    mode: 'all',
    reValidateMode: 'onBlur',
  });

  useEffect(() => {
    if (setValues) {
      setValues.forEach((pair) => {
        setValue(...pair);
      });
    }
  }, [setValues, setValue]);

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
