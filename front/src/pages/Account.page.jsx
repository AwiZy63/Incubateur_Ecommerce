import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { apiHandler, notify } from '../App';
import { login, logout } from '../stores/slices/User.slice';
import { useNavigate } from 'react-router-dom';

export default function Account() {

  const userData = useSelector(state => state.user.userData);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const profileFormik = useFormik({
    initialValues: {
      name: name,
      email: email,
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      email: Yup.string().email('Invalid email address'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log(name, email, values.name, values.email)
        const response = await apiHandler.user.UpdateUserData({
          name: values.name?.length > 0 ? values.name : name,
          email: values.email?.length > 0 ? values.email : email,
        });
        console.log('Profile Update Response:', response);

        notify("success", "Votre profil a bien été mis à jour");
      } catch (error) {
        console.error('Profile Update Error:', error);
        const isTokenValid = await apiHandler.user.CheckAccessToken(apiHandler.accessToken);
        notify("error", error);

        if (!isTokenValid || isTokenValid?.error) {
          dispatch(logout());
          navigate('/', { replace: true });
        }
      } finally {
        dispatch(login({ ...userData, name: values.name, email: values.email }));
        setSubmitting(false);
      }
    },
  });

  // Password Formik configuration
  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('Veuillez renseigner votre mot de passe actuel'),
      newPassword: Yup.string().min(8, 'Votre mot de passe doit contenir au moins 8 caractères').required('Veuillez renseigner un nouveau mot de passe'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await apiHandler.user.UpdateUserPassword(values);
        console.log('Password Change Response:', response);

        if (response.error) throw response.message;

        notify("success", "Votre mot de passe a bien été mis à jour");

        passwordFormik.resetForm();
      } catch (error) {
        console.error('Password Change Error:', error);

        const isTokenValid = await apiHandler.user.CheckAccessToken(apiHandler.accessToken);

        if (!isTokenValid || isTokenValid?.error) {
          dispatch(logout());
          navigate('/', { replace: true });
        }
        notify("error", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (userData?.isLogged) {
      setName(userData?.name);
      setEmail(userData?.email);
      profileFormik.setValues({ name: userData?.name, email: userData?.email });
    }

    const fetchUserData = async () => {
      try {
        const response = await apiHandler.user.GetUserData();

        if (response.error) throw response.message;

        const { name, email } = response.userData;

        setName(name);
        setEmail(email);

        profileFormik.setValues({ name, email });
      } catch (error) {
        notify("error", error);
        const isTokenValid = await apiHandler.user.CheckAccessToken(apiHandler.accessToken);

        if (!isTokenValid || isTokenValid?.error) {
          dispatch(logout());
          navigate('/', { replace: true });
        }
      }
    };

    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <div className="container">
      <div className="columns is-centered mt-4">
        <div className="column is-half">
          <h3 className="title is-3">Mon profil</h3>
          {/* Profile Form */}
          <form onSubmit={profileFormik.handleSubmit}>
            <div className="field">
              <label className="label">Nom</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="name"
                  onChange={profileFormik.handleChange}
                  onBlur={profileFormik.handleBlur}
                  value={profileFormik.values.name}
                />
              </div>
              {profileFormik.touched.name && profileFormik.errors.name ? (
                <p className="help is-danger">{profileFormik.errors.name}</p>
              ) : null}
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  name="email"
                  onChange={profileFormik.handleChange}
                  onBlur={profileFormik.handleBlur}
                  value={profileFormik.values.email}
                />
              </div>
              {profileFormik.touched.email && profileFormik.errors.email ? (
                <p className="help is-danger">{profileFormik.errors.email}</p>
              ) : null}
            </div>

            <div className="field">
              <div className="control">
                <button
                  className={`button is-primary ${profileFormik.isSubmitting && 'is-loading'}`}
                  type="submit"
                >
                  Mettre à jour mon profil
                </button>
              </div>
            </div>
          </form>

          <h3 className="title is-3 mt-6">Changer mon mot de passe</h3>
          {/* Change Password Form */}
          <form onSubmit={passwordFormik.handleSubmit}>
            <div className="field">
              <label className="label">Mot de passe actuel</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name="currentPassword"
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  value={passwordFormik.values.currentPassword}
                />
              </div>
              {passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword ? (
                <p className="help is-danger">{passwordFormik.errors.currentPassword}</p>
              ) : null}
            </div>

            <div className="field">
              <label className="label">Nouveau mot de passe</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name="newPassword"
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  value={passwordFormik.values.newPassword}
                />
              </div>
              {passwordFormik.touched.newPassword && passwordFormik.errors.newPassword ? (
                <p className="help is-danger">{passwordFormik.errors.newPassword}</p>
              ) : null}
            </div>

            <div className="field">
              <div className="control">
                <button
                  className={`button is-primary ${passwordFormik.isSubmitting && 'is-loading'}`}
                  type="submit"
                >
                  Mettre à jour mon mot de passe
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}