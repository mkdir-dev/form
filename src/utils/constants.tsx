interface FormFields {
  name: string;
  type: 'inputText' | 'inputEmail' | 'inputPassword';
  label: string;
  defaultValue?: string;
  required?: boolean;
}

export const formFields: FormFields[] = [
  {
    name: 'first_name',
    type: 'inputText',
    label: 'First Name',
    defaultValue: 'Some first name',
  },
  {
    name: 'last_name',
    type: 'inputText',
    label: 'Last Name',
  },
  {
    name: 'email',
    type: 'inputEmail',
    label: 'Email',
    required: true,
  },
  {
    name: 'password',
    type: 'inputPassword',
    label: 'Password',
    required: true,
  },
];

export const typesInput = {
  inputText: 'text',
  inputEmail: 'email',
  inputPassword: 'password',
};
