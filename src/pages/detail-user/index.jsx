import { useEffect, useState } from "react";
import { api } from "../../App";
import Cookies from "js-cookie";
import CardProfile from "../../components/CardProfile";
import CardProfileSkeleton from "../../components/CardProfileSkeleton";
import { useParams } from "react-router-dom";

function DetailUser() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    api({
      url: `/user/${id}`,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + Cookies.get('token')
      }
    })
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        const { response } = error;
        if (Array.isArray(response?.data?.detail)) {
          return setErrorMessage({
            message: response.data.detail[0]?.msg || response.data.detail[0],
            status: response.status
          });
        }
        setErrorMessage({
          message: response.data?.detail || error.message,
          status: response.status
        })
      });
  }, []);

  return (
    <section className="bg-emerald-400 w-full min-h-screen flex items-center justify-center">
      {errorMessage !== null && (
        <div className="text-center">
          <h1 className="text-[#2A303C] text-7xl sm:text-9xl font-bold">
            {errorMessage?.status}
          </h1>
          <p className="text-white sm:text-xl">
            {errorMessage?.message}
          </p>
        </div>
      )}
      {!loading && errorMessage === null && <CardProfile data={data} notProfile={true} />}
      {loading && errorMessage === null && <CardProfileSkeleton notProfile={true} />}
    </section>
  )
}

export default DetailUser