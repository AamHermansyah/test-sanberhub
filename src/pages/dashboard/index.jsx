import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { Link } from 'react-router-dom';
import ModalAddUser from '../../components/ModalAddUser';
import { api } from '../../App';
import Cookies from 'js-cookie';
import { getIndonesiaDateVersion } from '../../utils/helper';
import ModalDeleteUserById from '../../components/ModalDeleteUserById';

function Dashboard() {
  const [users, setUsers] = useState(null);
  const [idDelete, setIdDelete] = useState(-1);
  const [dataEdit, setDataEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalAddUserDisplay, setModalAddUserDisplay] = useState(false);
  const [modalDeleteDisplay, setModalDeleteDisplay] = useState(false);

  const handleDelete = (id) => {
    setModalDeleteDisplay(true);
    setIdDelete(id);
  }

  const fetchUsers = () => {
    api({
      url: '/user',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + Cookies.get('token')
      }
    })
      .then((res) => {
        const data = res.data.data;
        setUsers(data
          .map((user) => {
            return {
              ...user,
              created_at: getIndonesiaDateVersion(user.created_at, {
                month: 'short', getHour: true
              })
            }
          })
          .sort((a, b) => a.id - b.id)
        );
      })
      .catch((error) => {
        const { response } = error;
        if (Array.isArray(response?.data?.detail)) {
          return alert(response.data.detail[0]?.msg || response.data.detail[0]?.msg);
        }
        alert(response.data?.detail || error.message);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="relative">
      <ModalDeleteUserById
        id={idDelete}
        display={modalDeleteDisplay}
        onCancelClickButton={() => {
          setModalDeleteDisplay(false);
          setIdDelete(-1);
        }}
        onSuccessDelete={() => {
          setModalDeleteDisplay(false);
          setLoading(true);
          setUsers(null);
          fetchUsers();
        }}
      />

      <ModalAddUser
        display={modalAddUserDisplay}
        onCancelButtonClick={() => setModalAddUserDisplay(false)}
        onSuccessSubmit={() => {
          setModalAddUserDisplay(false);
          setLoading(true);
          setDataEdit(null);
          setUsers(null);
          fetchUsers();
        }}
        dataEdit={dataEdit}
      />
      <header className="w-full flex justify-between px-4 sm:px-10 py-4">
        <h1 className="text-xl text-white">Dashboard</h1>
        <nav>
          <Link to="/profile" className="text-white text-sm hover:text-emerald-400">
            My Profile
          </Link>
        </nav>
      </header>
      <section className="flex flex-col gap-4 px-4 sm:px-10">
        <button
          onClick={() => setModalAddUserDisplay(true)}
          className="w-max btn btn-success btn-sm rounded-md"
        >
          Add User
        </button>
        <Table
          headers={[
            'ID', 'Nama', 'Alamat', 'L/P', 'Tanggal Lahir', 'Tanggal Input', 'Aksi'
          ]}
          data={users}
          isLoading={loading}
          onClickDeleteById={(id) => handleDelete(id)}
          onEditClick={(user) => {
            setModalAddUserDisplay(true);
            setDataEdit(user);
          }}
        />
      </section>
    </div>
  )
}

export default Dashboard;
