import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from "swiper/modules"
import 'swiper/swiper-bundle.css';

const Listing = () => {

  const params = useParams();
  SwiperCore.use([Navigation]);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/getListing/${params.listingId}`);
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    }

    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && <p className="text-center my-7 text-2xl">Something went wrong...!</p>}
      {listing && !loading && !error &&
        (
          <>
          <Swiper navigation autoplay >
            {listing.imageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  className="h-[500px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover'
                  }}
                >

                </div>
              </SwiperSlide>
            ))}
            </Swiper>
          </>
        )
      }
    </main>
  )
}

export default Listing;