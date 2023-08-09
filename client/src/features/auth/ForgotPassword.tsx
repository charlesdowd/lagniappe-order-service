import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Form,
  FormButton,
  InfoText,
  Input,
  LinkText,
  Title,
} from './AuthPages.styled';
import { useForgotPasswordMutation } from '../../store/slices/api/templateApi';

const forgotPasswordSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
});

const ForgotPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  return (
    <>
      <Title>Password Reset</Title>

      <Formik
        validationSchema={forgotPasswordSchema}
        onSubmit={async (values, { resetForm }) => {
          const { email } = values;
          // Send reset link to email
          forgotPassword({ body: { email } });
          resetForm();
        }}
        initialValues={{
          email: '',
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
            <Form.Group controlId='email'>
              <Input
                type='email'
                placeholder='Email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                name='email'
                size='lg'
                isInvalid={!!errors.email && !!touched.email}
              />
              <Form.Control.Feedback className='FeedBack' type='invalid'>
                {errors.email?.toString()}
              </Form.Control.Feedback>
            </Form.Group>

            <FormButton
              // Start out disabled on initial load and until all fields valid
              disabled={!(isValid && dirty)}
              variant='primary'
              type='submit'
            >
              Send Reset Link
            </FormButton>
            <InfoText>
              Haven&apos;t signed up yet?{'  '}
              <LinkText to='/signup'>Sign up Here</LinkText>
            </InfoText>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ForgotPassword;
