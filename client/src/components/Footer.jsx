import React from "react";
import LogoHeader from "../assets/footerLogo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react";


const Footer = () => {
  return (
    <>
      <footer className="bg-(--color-neutral) text-(--color-neutral-content) py-8">
        <div className="bg-(--bg-footer) max-w-7xl mx-auto px-4">
          <p className="text-sm text-center mb-8 text-white">
            --- Your favorite food delivery platform connecting customers with
            restaurants and riders. ---
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            <div>
              <img src={LogoHeader} alt="" className="h-35" />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li onClick={() => navigate("/home")} className="text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer">
                  Home
                </li>
                <li className="text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer">
                  About
                </li>
                <li className="text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer">
                  Order Now
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For Restaurants</h4>
              <ul className="space-y-2">
                <li className="text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer">
                  Partner With Us
                </li>
                <li className="text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer">
                  Restaurant Dashboard
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For Riders</h4>
              <ul className="space-y-2">
                <li className="text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer">
                  Become a Rider
                </li>
                <li className="text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer">
                  Rider Dashboard
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Feedback &amp; Support</h4>
              <ul className="space-y-2">
                <li className="text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer">
                  Submit Feedback
                </li>
                <li className="text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer">
                  Help Center
                </li>
                <li className="text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer">
                  Contact Us
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border(--color-neutral) my-8"></div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-(--color-neutral-content) mb-4 md:mb-0">
              © 2026 Cravings. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="/privacy-policy" data-discover="true">
                <span className="text-sm text-(--color-neutral-content) hover:text-(--color-primary) transition-colors duration-200">
                  Privacy Policy
                </span>
              </a>
              <a href="/terms-of-service" data-discover="true">
                <span className="text-sm text-(--color-neutral-content) hover:text-(--color-primary) transition-colors duration-200">
                  Terms of Service
                </span>
              </a>
              <a href="/site-map" data-discover="true">
                <span className="text-sm text-(--color-neutral-content) hover:text-(--color-primary) transition-colors duration-200">
                  Site Map
                </span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
