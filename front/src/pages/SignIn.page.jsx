import React from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login } from '../stores/slices/User.slice'
import { useNavigate } from 'react-router-dom'
import { apiHandler, notify } from '../App'

export default function SignIn(props) {
  const { setIsLogged } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Veuillez renseigner un email valide').required('Veuillez renseigner un email'),
      password: Yup.string().required('Veuillez renseigner un mot de passe'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await apiHandler.user.SignIn(values);
        console.log('Response:', response);

        if (response.error) throw response.message;

        notify('success', response.message);

        dispatch(login({ ...response.userData, isLogged: true }));
        
        await apiHandler.setAccessToken(response.userData.accessToken);

        setIsLogged(true);

        navigate('/account', { replace: true });

        formik.resetForm();
      } catch (error) {
        console.error('Error:', error);
        notify('error', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container">
      <div className="columns is-centered mt-4">
        <div className="column is-half">
          <h3 className="title is-3">Connexion</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <p className="help is-danger">{formik.errors.email}</p>
              ) : null}
            </div>

            <div className="field">
              <label className="label">Mot de passe</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <p className="help is-danger">{formik.errors.password}</p>
              ) : null}
            </div>

            <div className="field">
              <div className="control">
                <button
                  className={`button is-primary ${formik.isSubmitting && 'is-loading'}`}
                  type="submit"
                >
                  Connexion
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}