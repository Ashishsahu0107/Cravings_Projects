import React from "react";
import { FaStar } from "react-icons/fa";

const restaurants = [
  {
    name: "Under The Mango Tree",
    rating: "3.6",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80",
    description:
      "Enjoy the thrill of grill and barbecue at Under The Mango Tree restaurant at Jehan Numa Palace, Bhopal. Head here now!",
    cuisines: ["Indian", "Chinese", "Italian"],
  },
  {
    name: "Raj darbar",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80",
    description:
      "Raj Darbar is a one-of-a-kind Indian restaurant that offers a unique dining experience for families and friends with a dhaba-style theme.",
    cuisines: ["Indian", "Chinese", "Italian"],
  },
  {
    name: "Countryside Culture",
    rating: "4.1",
    image:
      "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=900&q=80",
    description:
      "A hidden gem away from the city, offering lush green meadows and peaceful walking paths for relaxation.",
    cuisines: ["Indian", "Chinese"],
  },
];

const Section2 = () => {
  return (
    <section className="bg-gradient-to-b from-[#c84710] via-[#e4947d] to-[#fff8f1] py-9 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Featured Restaurants
          </h2>
          <p className="mt-3 text-base font-medium text-white/85">
            3 restaurants available
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {restaurants.map((restaurant) => (
            <article
              key={restaurant.name}
              className="overflow-hidden rounded-lg bg-(--color-base-100) shadow-lg shadow-black/10 ring-1 ring-black/5"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-(--color-primary) px-3 py-1 text-sm font-bold text-white shadow-md">
                  <FaStar className="text-xs" />
                  <span>{restaurant.rating}</span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold text-black">
                  {restaurant.name}
                </h3>
                <p className="mt-2 min-h-20 text-sm leading-6 text-(--color-base-content)">
                  {restaurant.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {restaurant.cuisines.map((cuisine) => (
                    <span
                      key={cuisine}
                      className="rounded bg-(--color-base-300) px-3 py-1 text-xs font-medium text-(--color-base-content)"
                    >
                      {cuisine}
                    </span>
                  ))}
                </div>

                <div className="my-3 border-t border-(--color-base-300)" />

                <button className="w-full rounded-lg bg-(--color-primary) px-5 py-3 font-bold text-white transition hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:ring-offset-2">
                  Explore Menu
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section2;
