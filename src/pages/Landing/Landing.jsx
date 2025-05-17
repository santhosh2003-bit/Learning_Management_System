import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/navbar/Navbar";
import { MoveRight } from "lucide-react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
const Landing = () => {
  const navigate = useNavigate(); 
  return (
    <div className="min-h-screen w-full bg-gray-100 font-nunito">
      <Navbar />
      {/* Herosection */}
      <main
        className="mt-10 flex flex-col-reverse sm:flex-col-reverse sm:justify-center sm:items-center
                     md:flex-row lg:flex-row lg:items-center lg:justify-evenly xl:flex
                     gap-8 px-4"
      >
        <div className="w-full sm:w-96 font-semibold flex flex-col gap-6">
          <span className="text-gray-400">Explore different Courses.</span>
          <div className="text-2xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consequatur voluptate quae, amet minima optio aliquid laboriosam
            excepturi corrupti ipsum modi saepe magni eveniet dolorum
            accusantium quasi! Fuga sed atque consectetur!
          </div>
          <button className="buttons mt-3 flex bg-blue-400 px-4 py-4 w-52 space-x-4 items-center rounded-md cursor-pointer hover:bg-blue-500 text-white" onClick={()=>navigate('/courses')}>
            <span>Browse Courses</span>
            <MoveRight className="text-white" />
          </button>
        </div>

        <div className="mt-4 sm:mt-4 md:mt-0">
          <img
            src="/lms.jpg"
            alt="lms"
            className="w-full sm:w-96 sm:h-96 object-cover"
          />
        </div>
      </main>

      <footer className=" text-black py-8 px-4 md:px-16 mt-10 bg-gray-200 shadow-2xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-black">
          {/* About */}
          <div>
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p className="text-sm text-black">
              A digital platform for students and faculty to
              access courses, resources, and academic tools.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
            <ul className="space-y-1 text-sm text-black">
              <li>
                <a href="#" className="hover:text-white">
                  Courses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Academic Calendar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Library
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Help Desk
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
            <p className="text-sm text-black">
              X, Office of Digital Learning
            </p>
            <p className="text-sm text-black">+1 (123) 456-7890</p>
            <p className="text-sm text-black">
              ✉️ lms-support@[college].edu
            </p>

            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Facebook" className="hover:text-blue-500">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-blue-400">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-blue-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-pink-400"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 text-center text-sm text-black border-t border-gray-700 pt-4">
          © 2025 X All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
