import { Link } from "react-router";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-400 transition-colors duration-300"
                  aria-label="Go to Home page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/colleges"
                  className="hover:text-blue-400 transition-colors duration-300"
                  aria-label="Go to Colleges page"
                >
                  Colleges
                </Link>
              </li>
              <li>
                <Link
                  to="/admission"
                  className="hover:text-blue-400 transition-colors duration-300"
                  aria-label="Go to Admission page"
                >
                  Admission
                </Link>
              </li>
              <li>
                <Link
                  to="/my-college"
                  className="hover:text-blue-400 transition-colors duration-300"
                  aria-label="Go to My College page"
                >
                  My College
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <EnvelopeIcon className="w-5 h-5 mr-2" />
                <a
                  href="mailto:info@collegebooking.com"
                  className="hover:text-blue-400 transition-colors duration-300"
                  aria-label="Email us at info@collegebooking.com"
                >
                  info@unidesk.com
                </a>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="w-5 h-5 mr-2" />
                <a
                  href="tel:+1234567890"
                  className="hover:text-blue-400 transition-colors duration-300"
                  aria-label="Call us at +1 (234) 567-890"
                >
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors duration-300"
                aria-label="Follow us on Facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors duration-300"
                aria-label="Follow us on Twitter"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors duration-300"
                aria-label="Follow us on LinkedIn"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} College Booking. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
