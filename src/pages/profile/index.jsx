import { useEffect, useState } from "react";
import { api } from "../../App";
import Cookies from "js-cookie";
import CardProfileSkeleton from "../../components/CardProfileSkeleton";
import CardProfile from "../../components/CardProfile";

function Profile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api({
      url: '/auth/me',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + Cookies.get('token')
      }
    })
      .then((res) => {
        setData(res.data);
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
  }, []);

  return (
    <section className="bg-emerald-400 w-full min-h-screen flex items-center justify-center">
      {!loading ? <CardProfile data={data} /> : <CardProfileSkeleton />}
    </section>
  )
}

export default Profile