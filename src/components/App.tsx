import React from 'react';
import { Container, Box, Button } from '@mui/material';
import { Form } from 'common/Form';
import { Input } from 'common/Input';
import { formFields } from 'utils/constants';

export const App: React.FC = () => {
  const onSubmit = ({ ...data }) => {
    console.log('onSubmit', data);
  };

  const defaultValues = formFields.reduce((obj, item) => {
    obj[item.name] = item.defaultValue ?? '';

    return obj;
  }, {});

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Form
          title="Авторизация"
          subtitle="Для доступа к личному кабинету вашей компании авторизируйтесь на сайте"
          onSubmit={onSubmit}
          defaultValues={defaultValues}
        >
          {formFields.length > 0 &&
            formFields.map((field) => <Input key={field.name} {...field} />)}
          <Button type="submit" variant="contained">
            Войти
          </Button>
        </Form>
      </Box>
    </Container>
  );
};
