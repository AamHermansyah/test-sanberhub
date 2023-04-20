import React from 'react';
import Hero from '../../components/Hero';
import FormSign from '../../components/FormSign';

function SignUp() {
  return (
    <section className="min-h-screen p-4 sm:p-10 flex flex-col items-center justify-center">
      <div className="w-full flex flex-col-reverse sm:grid sm:grid-cols-2">
        <FormSign isSignUp={true} />
        <div className="rounded-t-md sm:rounded-t-none sm:rounded-r-md shadow border border-emerald-400 sm:border-l-0">
          <Hero />
        </div>
      </div>
    </section>
  )
}

export default SignUp;
