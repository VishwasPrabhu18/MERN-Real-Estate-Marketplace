import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {

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

      const res = await fetch("/api/auth/signin", {
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
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  // console.log(formDate);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" id="email" placeholder="Email" className="border p-3 rounded-lg" onChange={handleChange} />
        <input type="password" id="password" placeholder="Password" className="border p-3 rounded-lg" onChange={handleChange} />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading ? "Loading..." : "Sign in"}</button>
        {/* <button className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Continue with google</button> */}
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Don&apos;t Have an Account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  )
}

export default SignIn