import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Header = () => {
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => { 
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('searchTerm');
    setSearchTerm(searchTerm || "");
  }, [location.search]);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-green-500">JungleVally</span> &nbsp;
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        <form onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input type="search" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-transparent focus:outline-none w-24 sm:w-64" />
          <button >
            <FaSearch className="text-slate-600" />
          </button>
        </form>

        <ul className='flex gap-6'>
          <Link to="/">
            <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
          </Link>
          <Link to="/about">
            <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img className='rounded-full h-7 w-7 object-cover border border-blue-500' src={currentUser.avatar} alt="profilePic" />
            ) : (
              <li className='text-slate-700 hover:underline'>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  )
}

export default Header