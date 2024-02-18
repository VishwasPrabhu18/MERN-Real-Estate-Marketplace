import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Autoplay } from "swiper/modules"
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ListingItem from "../components/ListingItem";

const Home = () => {

  SwiperCore.use([Navigation]);

  const [offerListings, setofferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const response = await fetch("/api/listing/getAllListings?offer=true&limit=4");
        const data = await response.json();
        setofferListings(data);

        fetchRentListings();
      } catch (error) {
        console.error('Error fetching offer listings', error);
      }
    }

    const fetchRentListings = async () => {
      try {
        const response = await fetch("/api/listing/getAllListings?type=rent&limit=4");
        const data = await response.json();
        setRentListings(data);

        fetchSaleListings();
      } catch (error) {
        console.error('Error fetching rent listings', error);
      }
    }

    const fetchSaleListings = async () => {
      try {
        const response = await fetch("/api/listing/getAllListings?type=sale&limit=4");
        const data = await response.json();
        setSaleListings(data);
      } catch (error) {
        console.error('Error fetching sale listings', error);
      }
    }

    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* Top */}
      <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
        <h2 className="text-slate-700 font-bold text-3xl lg:text-6xl">Find your next&nbsp;
          <span className="text-slate-500">perfect</span>
          <br />place with ease
        </h2>
        <div className="text-gray-400 text-xs sm:text-sm">
          Jungle Vally is the best place to find your next perfect place to live. <br />
          With a wide selection of houses and apartments, you are sure to find your next home.
        </div>
        <Link to={`/search`} className="text-xs sm:text-sm text-blue-800 font-bold hover:underline">Let&apos;s get started</Link>
      </div>

      {/* Swiper */}
      <Swiper
        navigation
        speed={1000}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay, Navigation]}
      >
        {offerListings && offerListings.length > 0 &&
          offerListings.map((listing, index) => (
            <SwiperSlide key={index}>
              <div
                className="h-[500px]"
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover'
                }}
              >
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>

      {/* Listing Results for offer */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent Offers</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={"/search?offer=true"}>Show More Offers</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {
                offerListings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} />
                ))
              }
            </div>
          </div>
        )}
      </div>

      {/* Listing Results for rent*/}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent Places for Rent</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={"/search?type=rent"}>Show More Placess for Rents</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {
                rentListings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} />
                ))
              }
            </div>
          </div>
        )}
      </div>

      {/* Listing Results for sale*/}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent Places for Sales</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={"/search?type=sale"}>Show More Places for Sales</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {
                saleListings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} />
                ))
              }
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home