import * as Yup from 'yup';
import { Formik } from 'formik';

import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/slices/authSlice';
import {
  useLoginMutation,
  useSetPasswordMutation,
} from '../../store/slices/api/templateApi';

import { Form, FormButton, Input, Title } from './AuthPages.styled'; // TODO: Make these non login specific styled components

const setPasswordSchema = Yup.object({
  password: Yup.string()
    .required('Please enter a password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
});

const SetPassword = () => {
  // Grab user from redux store to get their _id
  const user = useAppSelector(selectUser);

  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [setPassword, { isLoading }] = useSetPasswordMutation();

  const handleSetPassword = async (values) => {
    try {
      const { password } = values;

      // Wait until the users password is set
      await setPassword({
        body: { userId: user?._id, password },
      }).unwrap();

      // Log the user in with their new password
      await login({ body: { email: user?.email, password } }).unwrap();
    } catch (error) {
      console.log('Error setting password or logging in');
    }
  };

  return (
    <>
      <Title>Set Your Password</Title>

      <Formik
        validationSchema={setPasswordSchema}
        onSubmit={handleSetPassword}
        initialValues={{
          password: '',
          passwordConfirmation: '',
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          isValid,
          touched,
          errors,
          dirty,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId='password'>
              <Input
                type='password'
                placeholder='Set Password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                name='password'
                size='lg'
                isInvalid={!!errors.password && !!touched.password}
              />
              <Form.Control.Feedback className='FeedBack' type='invalid'>
                {errors.password?.toString()}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='passwordConfirmation'>
              <Input
                type='password'
                placeholder='Confirm Password'
                value={values.passwordConfirmation}
                onChange={handleChange}
                onBlur={handleBlur}
                name='passwordConfirmation'
                size='lg'
                isInvalid={
                  !!errors.passwordConfirmation &&
                  !!touched.passwordConfirmation &&
                  !!values.passwordConfirmation
                }
              />
              <Form.Control.Feedback className='FeedBack' type='invalid'>
                {errors.passwordConfirmation?.toString()}
              </Form.Control.Feedback>
            </Form.Group>

            <FormButton
              // Start out disabled on initial load and until all fields valid
              disabled={!isValid || !dirty || !values.passwordConfirmation}
              loading={isLoading || loginLoading}
              variant='primary'
              className='SignUpButton'
              type='submit'
            >
              Set Password
            </FormButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SetPassword;
