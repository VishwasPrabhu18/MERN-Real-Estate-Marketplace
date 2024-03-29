import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({listing}) => {

  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => { 
    setMessage(e.target.value);
  
  }

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchLandlord();
  
  }, [listing.userRef]);
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>Contact <span className="font-semibold">{landlord.userName}</span> for
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea className="w-full border p-3 rounded-lg" name="message" id="message" rows="2" placeholder="Enter your message here" value={message} onChange={handleChange}></textarea>
          <Link className="bg-slate-700 text-white text-center uppercase p-3 rounded-lg hover:opacity-95" to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}>Send Message</Link>
        </div>
      )}
    </>
  )
}

export default Contact