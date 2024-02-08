import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth.jsx';

const SignUp = () => {

  const [formDate, setFormDate] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormDate(
      {
        ...formDate,
        [e.target.id]: e.target.value
      }
    )
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formDate);

    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formDate)
      });

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  // console.log(formDate);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" id="userName" placeholder="User Name" className="border p-3 rounded-lg" onChange={handleChange} />
        <input type="email" id="email" placeholder="Email" className="border p-3 rounded-lg" onChange={handleChange} />
        <input type="password" id="password" placeholder="Password" className="border p-3 rounded-lg" onChange={handleChange} />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading ? "Loading..." : "Sign up"}</button>
        <OAuth />
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Have an Account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  )
}

export default SignUp