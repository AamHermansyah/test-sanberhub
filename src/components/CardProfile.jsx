import { motion as m } from 'framer-motion';
import { childAnimate, staggerContainer } from '../animate';
import { getIndonesiaDateVersion, getRelativeTime } from '../utils/helper';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function CardProfile({ data, notProfile }) {
  const navigate = useNavigate();

  const onLogout = (e) => {
    e.target.disabled = true;
    e.target.textContent = 'Logouting...';
    setTimeout(() => { 
      Cookies.remove("token");
      navigate('/login');
    }, 1000)
  }

  return (
    <m.div
      variants={staggerContainer(0.3)}
      initial="initial"
      animate="animate"
      className="relative bg-[#2A303C] w-full max-w-[400px] flex flex-col items-center rounded-xl border border-emerald-400 py-6 px-4 sm:px-6 shadow-md"
    >
      {!notProfile && (
        <m.span
          variants={childAnimate()}
          className="absolute top-5 left-5 p-1 rounded-md bg-yellow-500 text-[#2A303C]"
        >
          Basic
        </m.span>
      )}
      {!notProfile && (
        <m.button
          variants={childAnimate()}
          type="button"
          className="absolute top-2 right-2 px-2 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 disabled:cursor-wait transition-colors duration-200"
          onClick={onLogout}
        >
          Logout
        </m.button>
      )}
      <m.div
        variants={childAnimate()}
        className="w-[100px] aspect-square rounded-full border border-emerald-400 p-1"
      >
        <div className="h-full bg-emerald-400 rounded-full">
          <img
            src="https://source.unsplash.com/random/300x300/?people"
            alt="profile picture"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </m.div>
      <m.h4 variants={childAnimate()} className="text-2xl font-bold mt-3 text-white">
        {data.name} {notProfile ? `(${data.gender.toUpperCase()})` : ''}
      </m.h4>
      {!notProfile ? (
        <m.h6 variants={childAnimate()} className="text-emerald-400">
          {data.email}
        </m.h6>
      ) : (
        <m.h6 variants={childAnimate()} className="text-emerald-400">
          {getIndonesiaDateVersion(new Date(data.born_date))}
        </m.h6>
      )}
      <m.p variants={childAnimate()} className="text-sm text-white">
        {data.address}
      </m.p>
      <m.p variants={childAnimate()} className="text-sm text-white mt-4">
        {notProfile ? 'Created' : 'Joined'} {getRelativeTime(new Date(data.created_at))}
      </m.p>
    </m.div>
  )
}

export default CardProfile
