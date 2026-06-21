import { FaClock, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { restaurants } from "../data/siteData";

const OrderNow = () => {
  return (
    <main className="min-h-screen bg-(--color-base-100)">
      <section className="relative flex h-[45vh] items-center justify-center bg-[url('/commonBG.avif')] bg-cover bg-center text-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 px-6">
          <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">Order Now</h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80">
            Browse restaurants, pick your favourites, and enjoy fresh food delivered fast.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-(--color-neutral)">Restaurants Near You</h2>
          <p className="mt-2 text-(--color-secondary)">Fresh meals, reliable delivery, and easy ordering.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <article key={restaurant.id} className="overflow-hidden rounded-xl bg-white shadow-md">
              <img src={restaurant.image} alt={restaurant.name} className="h-48 w-full object-cover" />
              <div className="p-5">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold text-(--color-neutral)">{restaurant.name}</h3>
                  <span className="flex items-center gap-1 rounded-full bg-(--color-primary) px-3 py-1 text-sm font-bold text-white">
                    <FaStar /> {restaurant.rating}
                  </span>
                </div>
                <p className="mb-3 text-sm leading-6 text-(--color-secondary)">{restaurant.description}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {restaurant.cuisines.map((cuisine) => (
                    <span key={cuisine} className="rounded bg-(--color-base-200) px-3 py-1 text-xs text-(--color-base-content)">
                      {cuisine}
                    </span>
                  ))}
                </div>
                <div className="mb-4 grid grid-cols-2 gap-3 text-sm text-(--color-secondary)">
                  <span className="flex items-center gap-2"><FaClock /> {restaurant.deliveryTime}</span>
                  <span className="flex items-center gap-2"><FaMapMarkerAlt /> {restaurant.city}</span>
                </div>
                <div className="mb-4 rounded-lg bg-(--color-base-100) p-3">
                  <p className="mb-2 text-sm font-semibold text-(--color-neutral)">Popular Items</p>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.menu.map((item) => (
                      <span key={item} className="rounded bg-white px-2 py-1 text-xs text-(--color-base-content)">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="w-full rounded-lg bg-(--color-primary) px-5 py-3 font-bold text-white transition hover:bg-orange-800">
                  Add To Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default OrderNow;
