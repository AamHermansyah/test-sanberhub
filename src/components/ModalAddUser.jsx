import { useState } from "react";
import { motion as m } from "framer-motion";
import { api } from "../App";
import Cookies from "js-cookie";

const defaultValues = {
  gender: 'l',
}

const defaultFieldError = {
  name: '',
  address: '',
  born_date: ''
}

function ModalAddUser({
  display,
  onSuccessSubmit,
  dataEdit,
  onCancelButtonClick
}) {
  const [fetchStatus, setFetchStatus] = useState(false);
  const [formInput, setFormInput] = useState(dataEdit || defaultValues);
  const [fieldError, setFieldError] = useState(defaultFieldError);

  const validateForm = (data) => {
    const { name, address, born_date } = data;

    setFieldError(defaultFieldError);
    const regexBornDate = /^(19[7-9][0-9]|200[0-6])-(\d+)-(\d+)$/gi;

    if (!name || name.length < 8 ) {
      setFieldError((prev) => ({
        ...prev,
        name: 'Name must be 8 letters or more'
      }));
      return false;
    }

    if (!address || address.length < 5 ) {
      setFieldError((prev) => ({
        ...prev,
        address: 'Address must be 5 letters or more'
      }));
      return false;
    }

    if (!regexBornDate.test(born_date)) {
      setFieldError((prev) => ({
        ...prev,
        born_date: 'Date must be valid. Valid range years: 1970 - 2006.'
      }));
      return false;
    }

    return true;
  }

  const handleAddUser = (data) => {
    if (!validateForm(data)) return;

    setFetchStatus(true);
    api({
      url: '/user',
      method: 'POST',
      data,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + Cookies.get('token')
      }
    })
      .then((res) => {
        onSuccessSubmit();
        setFormInput(defaultValues);
      })
      .catch((error) => {
        const { response } = error;
        if (Array.isArray(response?.data?.detail)) {
          return alert(response.data.detail[0]?.msg);
        }
        alert(response.data?.detail || error.message);
      })
      .finally(() => {
        setFetchStatus(false);
      })
  }

  const handleEditUser = (data) => {

    if (!validateForm(data)) return;

    setFetchStatus(true);
    api({
      url: `/user/${dataEdit.id}`,
      method: 'PUT',
      data,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + Cookies.get('token')
      }
    })
      .then((res) => {
        onSuccessSubmit();        
        setFormInput(defaultValues);
      })
      .catch((error) => {
        const { response } = error;
        if (Array.isArray(response?.data?.detail)) {
          return alert(response.data.detail[0]?.msg || response.data.detail[0]?.msg);
        }
        alert(response.data?.detail || error.message);
      })
      .finally(() => {
        setFetchStatus(false);
      });
  }

  if (!display) return null;

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: .3, stiffness: 200, ease: 'easeOut' }}
      className="fixed inset-0 bg-[#2A303C] flex items-center justify-center z-[999]"
    >
      <form className="w-full max-w-[500px] mx-auto p-4 sm:p-10 flex flex-col items-center justify-center gap-4">
        <div className="form-control w-full -mt-2">
          <label className="label">
            <span className="label-text text-white">Enter name</span>
          </label>
          <input
            type="text"
            name="name"
            defaultValue={dataEdit?.name || ''}
            placeholder="Type here"
            className="input input-bordered w-full border-emerald-400"
            onChange={(e) => setFormInput(prev => (
              { ...prev, [e.target.name]: e.target.value }
            ))}
          />
          {fieldError.name && (
            <label className="label">
              <span className="label-text-alt text-rose-600">
                {fieldError.name}
              </span>
            </label>
          )}
        </div>

        <div className="form-control w-full -mt-2">
          <label className="label">
            <span className="label-text text-white">Enter address</span>
          </label>
          <input
            type="text"
            name="address"
            defaultValue={dataEdit?.address || ''}
            placeholder="Type here"
            className="input input-bordered w-full border-emerald-400"
            onChange={(e) => setFormInput(prev => (
              { ...prev, [e.target.name]: e.target.value }
            ))}
          />
          {fieldError.address && (
            <label className="label">
              <span className="label-text-alt text-rose-600">
                {fieldError.address}
              </span>
            </label>
          )}
        </div>

        <fieldset className="self-start">
          <legend>Gender</legend>

          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="laki-laki"
              name="gender"
              value="l"
              className="radio radio-success w-[20px] h-[20px]"
              defaultChecked={dataEdit ? dataEdit.gender === 'l' : formInput.gender}
              onChange={(e) => setFormInput(prev => (
                { ...prev, [e.target.name]: e.target.value }
              ))}
            />
            <label htmlFor="laki-laki">Laki laki</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="perempuan"
              name="gender"
              value="p"
              className="radio radio-success w-[20px] h-[20px]"
              defaultChecked={dataEdit ? dataEdit.gender === 'p' : false}
              onChange={(e) => setFormInput(prev => (
                { ...prev, [e.target.name]: e.target.value }
              ))}
            />
            <label htmlFor="perempuan">Perempuan</label>
          </div>
        </fieldset>

        <div className="form-control w-full -mt-2">
          <label className="label">
            <span className="label-text text-white">Born Date</span>
          </label>
          <input
            type="date"
            name="born_date"
            defaultValue={dataEdit?.born_date || ''}
            placeholder="Type here"
            className="input input-bordered w-full border-emerald-400"
            onChange={(e) => setFormInput(prev => (
              { ...prev, [e.target.name]: e.target.value }
            ))}
          />
          {fieldError.born_date && (
            <label className="label">
              <span className="label-text-alt text-rose-600">
                {fieldError.born_date}
              </span>
            </label>
          )}
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onCancelButtonClick}
            disabled={fetchStatus}
            className="px-4 py-2 rounded bg-red-500 text-white disabled:opacity-50 disabled:cursor-wait"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={fetchStatus}
            onClick={() => {
              if (dataEdit) {
                const { id, gender, ...otherData } = dataEdit;
                return handleEditUser({ ...otherData, ...formInput });
              }
              handleAddUser(formInput)
            }}
            className="px-4 py-2 rounded bg-sky-500 text-white disabled:opacity-50 disabled:cursor-wait"
          >
            {dataEdit && !fetchStatus && 'Edit'}
            {!dataEdit && !fetchStatus && 'Add'}
            {fetchStatus && 'Loading...'}
          </button>
        </div>
      </form>
    </m.div>
  )
}

export default ModalAddUser