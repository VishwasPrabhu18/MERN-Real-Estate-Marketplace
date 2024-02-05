import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input type="text" id="userName" placeholder="User Name" className="border p-3 rounded-lg" />
        <input type="email" id="email" placeholder="Email" className="border p-3 rounded-lg" />
        <input type="password" id="password" placeholder="Password" className="border p-3 rounded-lg" />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Sign up</button>
        <button className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Continue with google</button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Have an Account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default Signup