import React from "react";
import Section2 from './Section2'

const Home = () => {
  return (
    <>
      <section className="relative text-(--color-primary-content) py-16 md:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-0">
              <img alt="Slide 4" className="w-full h-full object-cover" src="/assets/bgImage4-L1QELaMd.jpg" />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Favorite Food, <br/> Delivered Fast</h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">Order from thousands of restaurants and get it delivered to your doorstep</p>
              <div className="flex gap-4 justify-center">
                <button className="bg-(--color-primary) text-(--color-primary-content) px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">Sign Up</button>
              <button className="bg-(--color-base-100) text-(--color-base-content) px-8 py-3 rounded-lg font-semibold hover:bg-(--color-base-200) transition">Order Now</button>
              </div>
              </div>
              <div className="flex items-center bg-(--color-base-100) rounded-lg px-4 py-3 max-w-4xl mx-auto">
              <input placeholder="Search restaurants or dishes..." className="bg-(--color-base-100) w-full outline-none text-(--color-primary)" type="text" value=""/>
            </div>
        </div>
      </section>
      <Section2/>
    </>
  )
};

export default Home;
