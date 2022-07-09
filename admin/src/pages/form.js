import { FastField, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';
import AccountApi from '../../../../../api/AccountApi';
import ButtonCustom from '../../../../../components/ButtonCustom';
import InputFieldUI from '../../../../../components/InputFieldUI';
import { isLogin } from '../../../userSlice';
function LoginForm() {
  const [loginErrors, setLoginErrors] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const initialValues = {
    username: '',
    password: ''
  };
  let validationSchema = yup.object().shape({
    username: yup
      .string()
      .email('Đây chưa phải là một email!')
      .required('Vui lòng kiểm tra email của bạn!'),
    password: yup
      .string()
      .min(6, 'Mật khẩu phải ít nhất 6 kí tự')
      .required('Vui lòng kiểm tra mật khẩu của bạn!')
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (value) => {
        try {
          const response = await AccountApi.login(value);

          localStorage.setItem('userCurrent', JSON.stringify(response));

          setLoginErrors(false);

          dispatch(isLogin());

          history.goBack();
        } catch (error) {
          setLoginErrors(true);
        }
      }}
    >
      {() => {
        return (
          <ContainerLogin>
            <Form>
              <LoginFormCustom>
                {loginErrors && <MessageError>Tài khoản hoặc mật khẩu không đúng!</MessageError>}

                <FastField
                  name="username"
                  component={InputFieldUI}
                  label="Email*"
                  type="email"
                  loginErrors={loginErrors}
                />
                <FastField
                  name="password"
                  component={InputFieldUI}
                  label="Mật Khẩu*"
                  type="password"
                  loginErrors={loginErrors}
                />
                <NavLink to="">Bạn đã quên mật khẩu ?</NavLink>
              </LoginFormCustom>

              <ButtonLogin>
                <ButtonCustom type="submit" content="ĐĂNG NHẬP" />
              </ButtonLogin>
            </Form>
          </ContainerLogin>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
const ContainerLogin = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
const LoginFormCustom = styled.div`
  background: #fff;
  padding: 2rem;

  > a {
    font-size: 0.875rem;
    color: #19110b;
    line-height: 1.25;
    letter-spacing: 0.4px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
const ButtonLogin = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 10px;
  margin-top: 2.5rem;
`;
const MessageError = styled.span`
  display: block;
  color: #c53929;
  font-size: 15px;
  font-weight: 300;
  letter-spacing: 0.4px;
  line-height: 32px;
`;
