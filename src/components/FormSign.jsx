import Cookies from 'js-cookie';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../App';

const defaultValue = {
  name: '',
  email: '',
  password: '',
  form: ''
}

function Form({ isSignUp }) {
  const [fieldError, setFieldError] = useState(defaultValue);
  const [loading, setLoading] = useState(false);

  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = inputNameRef.current?.value;
    const email = inputEmailRef.current.value;
    const password = inputPasswordRef.current.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gi

    setFieldError(defaultValue);

    let isValid = true;

    if (isSignUp && name.length < 3) {
      setFieldError((prev) => ({ ...prev, name: 'Name is too short' }));
      isValid = false;
    };
    if (!emailRegex.test(email)) {
      setFieldError((prev) => ({ ...prev, email: 'Email not valid' }));
      isValid = false;
    };
    if (password.length < 3) {
      setFieldError((prev) => ({ ...prev, password: 'Password is too short' }));
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);
    if (isSignUp) {
      api({
        method: 'POST',
        url: '/auth/register',
        data: { name, email, password }
      })
        .then((res) => {
          navigate('/login');
        })
        .catch((error) => {
          const { response: { data, status } } = error;
          if (status === 422) {
            setFieldError((prev) => ({
              ...prev,
              form: data.detail[0].msg
            }))
          }
        })
        .finally(() => {
          setLoading(false);
        })
    } else {
      api({
        method: 'POST',
        url: 'https://cms-admin-v2.ihsansolusi.co.id/testapi/auth/login',
        data: { email, password }
      })
        .then((res) => {
          const { token } = res.data;
          Cookies.set('token', token, { expires: 1 });
          navigate('/dashboard');
        })
        .catch((error) => {
          const { response: { data, status } } = error;
          if (status === 401) {
            return setFieldError((prev) => ({
              ...prev,
              form: 'Kata sandi atau email salah.'
            }))
          }
          if (status === 422) {
            return setFieldError((prev) => ({
              ...prev,
              form: data.detail[0].msg
            }))
          }
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full flex flex-col items-center justify-center rounded-b-md sm:rounded-b-none sm:rounded-l-md bg-emerald-400 lg:aspect-[4/3] py-10 px-4 sm:px-10"
    >
      <h3 className="text-xl mb-2 font-semibold text-center text-white">
        Welcome
      </h3>
      {isSignUp && (
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Enter your name</span>
            <Link
              to="/login"
              className="btn-already-signup"
            >
              Already sign up?
            </Link>
          </label>
          <input
            ref={inputNameRef}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
          {fieldError.name && (
            <label className="label">
              <span className="label-text-alt text-rose-600">
                {fieldError.name}
              </span>
            </label>
          )}
        </div>
      )}
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text text-white">Email</span>
        </label>
        <input
          ref={inputEmailRef}
          type="email"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        {fieldError.email && (
          <label className="label">
            <span className="label-text-alt text-rose-600">
              {fieldError.email}
            </span>
          </label>
        )}
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text text-white">Password</span>
        </label>
        <input
          ref={inputPasswordRef}
          type="password"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        {fieldError.password && (
          <label className="label">
            <span className="label-text-alt text-rose-600">
              {fieldError.password}
            </span>
          </label>
        )}

        {fieldError.form && (
          <span className="capitalize label-text-alt text-rose-600 mt-2">
            {fieldError.form}
          </span>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className={`${fieldError.password ? '' : 'mt-4'} ${loading ? 'loading' : ''} btn`}
      >
        {isSignUp ? 'Sign Up' : 'Login'}
      </button>
      {!isSignUp && (
        <Link
          to="/signup"
          className="btn-already-signup mt-2"
        >
          Register
        </Link>
      )}
    </form>
  )
}

export default Form;
