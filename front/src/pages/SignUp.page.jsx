import React from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { apiHandler, notify } from '../App';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Veuillez renseigner un nom'),
      email: Yup.string().email('Veuillez renseigner un email valide').required('Veuillez renseigner un email'),
      password: Yup.string()
        .min(8, 'Votre mot de passe doit contenir au moins 8 caractères')
        .required('Veuillez renseigner un mot de passe'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await apiHandler.user.SignUp(values);
        if (response.error) throw response.message;
        console.log('Response:', response);
        notify('success', response.message);
        navigate('/signin', { replace: true });
        resetForm();
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
          <h3 className="title is-3">Inscription</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="field">
              <label className="label">Nom</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
              </div>
              {formik.touched.name && formik.errors.name ? (
                <p className="help is-danger">{formik.errors.name}</p>
              ) : null}
            </div>

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
                  S'inscrire
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
