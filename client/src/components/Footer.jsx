import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-black pt-8 border-t border-lime-500">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-black">Health Tracker</h1>
          <p className="text-sm text-gray-600">Your Ultimate Guide</p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8 text-sm lg:ml-64">
          {/* Services */}
          <div>
            <h3 className="font-semibold mb-3 text-black">Services</h3>
            <ul className="space-y-2 text-gray-700">
              {[
                "Digital Marketing",
                "Website & Mobile APP",
                "Web-Hosting",
                "Card Printing",
                "Designing",
              ].map((service, i) => (
                <li key={i}>
                  <a className="hover:underline cursor-pointer">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3 text-black">Quick Menu</h3>
            <ul className="space-y-2 text-gray-700">
              {["Home", "Add record", "Calculate calories",  "Contact us"].map((item, i) => (
                <li key={i}>
                  <a href="/categories" className="hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-3 text-black">Contact</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-lime-600" size={14} />
                <span>Dindigul, Tamil Nadu</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-lime-600" size={14} />
                <span>+91 987 654 3210</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-lime-600" size={14} />
                <span>info@dindigulcity.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mt-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp].map((Icon, i) => (
                <span
                  key={i}
                  className="bg-lime-100 w-8 h-8 flex items-center justify-center rounded-full hover:bg-lime-300 transition"
                >
                  <Icon size={16} className="text-lime-700" />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer with top border */}
        <div className="text-center mt-10 pt-4 border-t border-lime-500 text-xs text-gray-500 mb-6">
          <p>&copy; {new Date().getFullYear()} Dindigul City. All rights reserved.</p>
          <p>Made with ❤️ for Dindigul</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
