import React from "react";
import { AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Auth.module.css";
import Modal from "react-modal";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField, Button, CircularProgress } from "@material-ui/core";

import {
  selectIsLoadingAuth,
  selectOpenSignIn,
  selectOpenSignUp,
  setOpenSignIn,
  resetOpenSignIn,
  setOpenSignUp,
  resetOpenSignUp,
  fetchCredStart,
  fetchCredEnd,
  fetchAsyncLogin,
  fetchAsyncRegister,
  fetchAsyncGetEvents,
  fetchAsyncGetMyAccount,
  fetchAsynCreateEvents,
} from "./authSlice";

const customStyles = {
  overlay: {
    backgroundColor: "#777777",
  },
  content: {
    top: "55%",
    left: "50%",

    width: 280,
    height: 350,
    padding: "50px",

    transform: "transform(-50%, -50%)",
  },
};

const Auth: React.FC = () => {
  Modal.setAppElement("#root");
  const openSignIn = useSelector(selectOpenSignIn);
  const openSignUp = useSelector(selectOpenSignUp);
  const isLoadingAuth = useSelector(selectIsLoadingAuth);
  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      <Modal
        isOpen={openSignUp}
        onRequestClose={async () => {
          await dispatch(resetOpenSignUp());
        }}
        style={customStyles}
      >
        <Formik
          initialErrors={{ email: "required" }}
          initialValues={{
            email: "",
            password: "",
            username: "",
            last_name: "",
            first_name: "",
            zip_code: "",
            address1: "",
            address2: "",
            address3: "",
            phone_number: "",
            // user_icon: null,
            // self_introduction: "",
          }}
          onSubmit={async (values) => {
            await dispatch(fetchCredStart());
            const resultReg = await dispatch(fetchAsyncRegister(values));
            if (fetchAsyncRegister.fulfilled.match(resultReg)) {
              await dispatch(fetchAsyncLogin(values));
              //   await dispatch(fetchAsynCreateEvents());
              await dispatch(fetchAsyncGetMyAccount());
              //   await dispatch(fetchAsyncGetEvents());
              await dispatch(fetchAsyncGetMyAccount());
            }
            await dispatch(fetchCredEnd());
            await dispatch(resetOpenSignUp());
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("メールアドレスを入力してください")
              .required("メールアドレスは必須です"),
            password: Yup.string().required("パスワードは必須です").min(8),
          })}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <div>
              <form onSubmit={handleSubmit}>
                <div className={styles.auth_signUp}>
                  <h1 className={styles.auth_title}>Events</h1>
                  <br />
                  <div className={styles.auth_progress}>
                    {isLoadingAuth && <CircularProgress />}
                  </div>
                  <br />
                  <TextField
                    placeholder="ユーザー名"
                    type="input"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                  <br />
                  {touched.username && errors.username ? (
                    <div className={styles.auth_error}>{errors.username}</div>
                  ) : null}

                  <TextField
                    placeholder="メールアドレス"
                    type="input"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <br />
                  {touched.email && errors.email ? (
                    <div className={styles.auth_error}>{errors.email}</div>
                  ) : null}

                  <TextField
                    placeholder="姓"
                    type="input"
                    name="last_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.last_name}
                  />
                  <br />
                  {touched.last_name && errors.last_name ? (
                    <div className={styles.auth_error}>{errors.last_name}</div>
                  ) : null}

                  <TextField
                    placeholder="名"
                    type="input"
                    name="first_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.first_name}
                  />
                  <br />
                  {touched.first_name && errors.first_name ? (
                    <div className={styles.auth_error}>{errors.first_name}</div>
                  ) : null}

                  <TextField
                    placeholder="パスワード"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <br />
                  {touched.password && errors.password ? (
                    <div className={styles.auth_error}>{errors.password}</div>
                  ) : null}

                  <TextField
                    placeholder="郵便番号"
                    type="input"
                    name="zip_code"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.zip_code}
                  />
                  <br />
                  {touched.zip_code && errors.zip_code ? (
                    <div className={styles.auth_error}>{errors.zip_code}</div>
                  ) : null}

                  <TextField
                    placeholder="都道府県"
                    type="input"
                    name="address1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address1}
                  />
                  <br />
                  {touched.address1 && errors.address1 ? (
                    <div className={styles.auth_error}>{errors.address1}</div>
                  ) : null}

                  <TextField
                    placeholder="市区町村"
                    type="input"
                    name="address2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address2}
                  />
                  <br />
                  {touched.address2 && errors.address2 ? (
                    <div className={styles.auth_error}>{errors.address2}</div>
                  ) : null}

                  <TextField
                    placeholder="町域・番地"
                    type="input"
                    name="address3"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address3}
                  />
                  <br />
                  {touched.address3 && errors.address3 ? (
                    <div className={styles.auth_error}>{errors.address3}</div>
                  ) : null}
                  
                  <br />
                  {touched.address3 && errors.address3 ? (
                    <div className={styles.auth_error}>{errors.address3}</div>
                  ) : null}

                  <TextField
                    placeholder="電話番号"
                    type="input"
                    name="phone_number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone_number}
                  />
                  <br />
                  {touched.phone_number && errors.phone_number ? (
                    <div className={styles.auth_error}>
                      {errors.phone_number}
                    </div>
                  ) : null}

                  {/* <TextField
                    placeholder="user_icon"
                    type="input"
                    name="user_icon"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.user_icon}
                  />
                  <br />
                  {touched.user_icon && errors.user_icon ? (
                    <div className={styles.auth_error}>{errors.user_icon}</div>
                  ) : null} */}

                  {/* <TextField
                    placeholder="self_introduction"
                    type="input"
                    name="self_introduction"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.self_introduction}
                  />
                  <br />
                  {touched.self_introduction && errors.self_introduction ? (
                    <div className={styles.auth_error}>
                      {errors.self_introduction}
                    </div>
                  ) : null} */}
                  <br />
                  <br />

                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!isValid}
                    type="submit"
                  >
                    登録
                  </Button>
                  <br />
                  <br />
                  <span
                    className={styles.auth_text}
                    onClick={async () => {
                      await dispatch(setOpenSignIn());
                      await dispatch(resetOpenSignUp());
                    }}
                  >
                    既にアカウントを持っている場合
                  </span>
                </div>
              </form>
            </div>
          )}
        </Formik>
      </Modal>

      <Modal
        isOpen={openSignIn}
        onAfterClose={async () => {
          await dispatch(resetOpenSignIn());
        }}
        style={customStyles}
      >
        <Formik
          initialErrors={{ email: "required" }}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            await dispatch(fetchCredStart());
            const result = await dispatch(fetchAsyncLogin(values));
            if (fetchAsyncLogin.fulfilled.match(result)) {
              await dispatch(fetchAsyncGetEvents());
              await dispatch(fetchAsyncGetMyAccount());
            }
            await dispatch(fetchCredEnd());
            await dispatch(resetOpenSignIn());
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("メールアドレスは必須です")
              .required("メールアドレスは必須です"),
            password: Yup.string().required("パスワードは必須です").min(8),
          })}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <div>
              <form onSubmit={handleSubmit}>
                <div className={styles.auth_signUp}>
                  <h1 className={styles.auth_title}>Events</h1>
                  <br />
                  <div className={styles.auth_progress}>
                    {isLoadingAuth && <CircularProgress />}
                  </div>
                  <br />
                  <TextField
                    placeholder="email"
                    type="input"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <br />
                  {touched.email && errors.email ? (
                    <div className={styles.auth_error}>{errors.email}</div>
                  ) : null}

                  <TextField
                    placeholder="password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <br />
                  {touched.password && errors.password ? (
                    <div className={styles.auth_error}>{errors.password}</div>
                  ) : null}
                  <br />
                  <br />

                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!isValid}
                    type="submit"
                  >
                    ログイン
                  </Button>
                  <br />
                  <br />
                  <span
                    className={styles.auth_text}
                    onClick={async () => {
                      await dispatch(resetOpenSignIn());
                      await dispatch(setOpenSignUp());
                    }}
                  >
                    新規アカウント作成
                  </span>
                </div>
              </form>
            </div>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default Auth;
