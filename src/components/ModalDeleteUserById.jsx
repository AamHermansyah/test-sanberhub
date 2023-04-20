import { useState } from "react";
import { motion as m } from "framer-motion";
import { api } from "../App";
import Cookies from "js-cookie";

function ModalDeleteUserById({
  onCancelClickButton,
  display,
  id,
  onSuccessDelete
}) {

  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    setDeleting(true);
    api({
      url: `/user/${id}`,
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + Cookies.get('token')
      }
    })
      .then(() => {
        onSuccessDelete();
        onCancelClickButton();
      })
      .catch((error) => {
        const { response } = error;
        if (Array.isArray(response?.data?.detail)) {
          return alert(response.data.detail[0]?.msg || response.data.detail[0]?.msg);
        }
        alert(response.data?.detail || error.message);
      })
      .finally(() => {
        setDeleting(false);
      });
  }

  if (!display) return null;

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: .3, stiffness: 200, ease: 'easeOut' }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex flex-col gap-6 items-center justify-center p-4 z-[99]"
    >
      <div className="bg-[#2A303C] w-full max-w-[500px] py-10 px-4 sm:px-10 rounded-md">
        <h3 className="text-sm sm:text-lg text-white text-center">Apakah kamu yakin ingin menghapus?</h3>
        <div className="flex gap-6 justify-center mt-4">
          <button
            onClick={() => onCancelClickButton()}
            type="button"
            className="text-sm px-4 py-2 rounded border border-emerald-400 text-emerald-400 disabled:opacity-50 disabled:cursor-wait"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            type="button"
            className="text-sm px-4 py-2 rounded bg-red-500 text-white disabled:opacity-50 disabled:cursor-wait"
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </m.div>
  )
}

export default ModalDeleteUserById;
