import React, { useState ,useEffect} from "react";


import { Link, useNavigate } from 'react-router-dom';
import "./Homepage.css";
const Homepage = () => {
  
  const [drop, setdrop] = useState(false)

  
  const [ismenuclick, setIsmenuclick] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    country: '',
    password1: '',
    password2: '',
  });
  const [adminUpdateForm, setAdminUpdateForm] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    country: '',
    password1: '',
    password2: '',
    gym_name: '',
    gym_address: '',
    gym_phone_number: ''
  });
  const [adminForm, setAdminForm] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    country: '',
    password1: '',
    password2: '',
    gym_name: '',
    gym_address: '',
    gym_phone_number: ''
  });
 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
      if (parsedUserData.userType === 'user') {
        fetchUserDetails(parsedUserData.id);
      } else if (parsedUserData.userType === 'admin') {
        fetchAdminDetails(parsedUserData.user_id);
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const fetchUserDetails = async (uid) => {
    try {
      const response = await fetch(`https://gym-management-2.onrender.com/accounts/user_register?id=${uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const data = await response.json();
      if (response.ok) {
        setUserDetails(data);
        setUpdateFormData(data);
      } else {
        console.log('Failed to fetch user details:', data.message);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const fetchAdminDetails = async (uid) => {
    try {
      const response = await fetch(`https://gym-management-2.onrender.com/accounts/admin_register?id=${uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const data = await response.json();
      if (response.ok) {
        setAdminUpdateForm(data);
      } else {
        console.log('Failed to fetch admin details:', data.message);
      }
    } catch (error) {
      console.error('Error fetching admin details:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('https://gym-management-2.onrender.com/accounts/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ user_id: userData.userType==='user'? userData.id:userData.user_id })
      });

      if (response.ok) {
        localStorage.removeItem('userData');
        navigate('/');
      } else {
        const data = await response.json();
        alert(`Logout failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred during logout');
    }
  };


 
  
  if (!userData) return null;

  return (
    <div>
      <header id="top" className="fixed top-0 left-0 right-0 bg-[#018ABD]">
        <nav className="header-content   flex items-center  justify-between  w-4/5 mx-auto space-x-7">
          <div  className="cursor-pointer" id="logo">
            <a href="#up">
              <img
                className="w-36 md:w-96 lg:w-40"
                src="images/output-onlinepngtools (1).png"
                alt="Logo"
              />
            </a>
          </div>

          <ul
            id="nav-menu"
            className="un-content hidden md:flex justify-between align-middle items-center space-x-7 text-black md:text-white"
          >
          
            <li>
              <a
                className="hovering cursor-pointer sm:text-xl md:text-2xl font-semibold"
                href="#program"
              >
                PROGRAMS
              </a>
            </li>
            
            <li
              className="hovering  cursor-pointer sm:text-xl md:text-2xl font-semibold"
              href="shop.html"
            >
              <Link to="/vitamins">SHOP</Link>
            </li>
            <li
              className="hovering cursor-pointer sm:text-xl md:text-2xl font-semibold"
              href="shop.html"
            >
              <Link to="/gym">GYM</Link>
            </li>
            <li>
              <div
                className="hovering cursor-pointer sm:text-xl md:text-2xl font-semibold"
                href="#price"
              >
                PLANS
              </div>
            </li>
          
            <li
              className="hovering cursor-pointer sm:text-xl md:text-2xl font-semibold"
              href="testimonials.html"
            >
              
              <Link to="/test">TESTIMONIALS</Link>{" "}
            </li>
          </ul>
          <div className=" relative">
            <div
              onClick={() => {
                setdrop(!drop);
              }}
              className="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
            {drop && (
              <div className="absolute  right-[-90px] mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <Link
                  to="/adminprofile"
                  className="block px-4 py-2 cursor-pointer text-xl font-semibold text-[#018ABD] hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    
                    console.log("Logout clicked");
                  }}
                  className="block w-full text-left px-4 py-2 text-xl font-semibold text-[#018ABD] hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

       

          <div
            onClick={() => {
              setIsmenuclick(!ismenuclick);
              console.log("clicked");
              console.log(ismenuclick);
            }}
          >
            <svg
              id="menu-icon"
              className="md:hidden w-8 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </div>
        </nav>

        {ismenuclick ? (
          <>
            <div
              id="dropdown-menu"
              className="block flex-col bg-white font-semibold text-[#018ABD] space-y-2 text-lg px-6 py-4 absolute w-full top-16 left-0 shadow-lg md:hidden"
            >
              
              <div>
                <a
                  className="hovering1 cursor-pointer sm:text-xl text-[#018ABD] md:text-2xl font-semibold"
                  href="#program"
                >
                  PROGRAMS
                </a>
              </div>
              <div
                className="hovering1 sm:text-xl text-[#018ABD] md:text-2xl font-semibold"
                href="shop.html"
              >
                <Link to="/vitamins">SHOP</Link>
              </div>
              <div
                className="hovering1 sm:text-xl text-[#018ABD] md:text-2xl font-semibold"
                href="shop.html"
              >
                <Link to="/gym">GYMS</Link>
              </div>
              
              <div onClick={()=>{
                setIsmenuclick(!ismenuclick)
              }}>
                <div
                  className="hovering1  text-[#018ABD] sm:text-xl md:text-2xl font-semibold"
                  href="#price"
                >
                  PLANS
                </div>
              </div>
            
              <div
                className="hovering1 text-[#018ABD] sm:text-xl md:text-2xl font-semibold"
                
              >
                
                <Link to="/test">TESTIMONIALS</Link>{" "}
              </div>
             
            </div>
            
          </>
        ) : (
          <></>
        )}
      </header>



      <section id="up" className="pt-[100px] w-full  bg-[#018ABD] flex justify-around align-middle items-center pb-6 relative">
        <div className="bg-[#30B0C7] absolute bottom-[-10px] left-0 right-0 text-[#30B0C7]">
          .
        </div>
        <div className="w-[80%] mx-auto flex justify-center align-middle items-center md:w-[90%]">
          <div className="w-full">
            <button className="left-page p-2 w-full rounded-lg 2xl:text-5xl bg-[#30B0C7] text-white font-bold md:text-2xl lg:w-[60%] 2xl:w-[70%]">
              THE BEST FITNESS CLUB IN TOWN
            </button>
            <div className="text-5xl 2xl:text-7xl pt-5 font-semibold lg:text-7xl">
              {" "}
              <span className="text-white">SHAPE </span> YOUR IDEAL BODY
            </div>
            <div className="font-semibold pt-7 2xl:text-2xl  lg:w-[500px] text-white text-xl">
              IN HERE WE WILL HELP YOU TO SHAPE YOUR IDEAL BODY AND LIVE UP YOUR
              LIFE TO FULLEST
            </div>

            <div className="flex justify-between align-middle items-end md:w-full mx-auto md:justify-around md:px-11  pt-7">
              <div className="font-semibold  ">
                <div className="flex   md:text-4xl text-sm justify-center text-white align-middle">
                  + 153
                </div>
                <div className="text-sm md:text-2xl  ">EXPERT COACHES</div>
              </div>
              <div className="font-semibold  ">
                <div className="flex   md:text-4xl text-sm justify-center text-white align-middle">
                  + 789
                </div>
                <div className="text-sm md:text-2xl  ">MEMEMBERS JOINED</div>
              </div>

              <div className="font-semibold  ">
                <div className="flex   md:text-4xl text-sm justify-center text-white align-middle">
                  + 20
                </div>
                <div className="text-sm md:text-2xl  ">FITNESS PROGRAMS</div>
              </div>
            </div>
            <div className="flex justify-around align-middle items-center pt-7">
              <div className="bg-[#30B0C7] md:text-2xl  cursor-pointer font-semibold md:px-11 border-white border-2 px-5 py-[2px]">
                Get Started
              </div>
              <div className="bg-[#289BC6] md:text-2xl cursor-pointer font-semibold md:px-11 text-white px-5 border-2 border-[#30B0C7]">
                Learn More
              </div>
            </div>
          </div>
          <div className="w-2/3 mx-auto hidden  justify-center md:flex">
            <div className="w-[100%] 2xl:h-[70%] object-contain  ">
              <img
                className="w-full md:w-[75%] "
                src="images/1723658707010-removebg 1 (1).png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <section className=" bg-[#018ABD] w-full md:pt-24 pt-10  " id="program">
        <section className="w-3/4 mx-auto">
          <main className="part-2 flex justify-between ">
            <div className=" md:text-2xl lg:text-6xl  font-semibold text-white">
              EXPLORE OUR
            </div>
            <div className="md:text-2xl  lg:text-6xl font-semibold">
              PROGRAMS
            </div>
            <div className="md:text-2xl lg:text-6xl  font-semibold text-white">
              TO SHAPE YOU
            </div>
          </main>
        </section>
      </section>
      <section className=" w-full bg-[#018ABD] pt-20 pb-20">
        
        <section className="w-4/5 mx-auto gap-y-10 grid grid-cols-1 md:grid-cols-2 md:gap-x-10 rounded-lg">
          <div
            className=" design rounded-lg w-full  bg-[#79BED6] py-5 "
            data-aos="fade-up"
          >
            <div className=" flex justify-around  ">
              <div className="font-semibold lg:text-4xl text-xl">
                STRENGTH TRAINING{" "}
              </div>
              <div className="w-7 lg:w-8">
                <img src="images/Vector (1).png" alt="" />
              </div>
            </div>

            <div className="w-[200px] lg:w-[300px] p-2 font-medium lg:text-2xl text-sm mx-auto">
              IN THIS PROGRAM ,YOU ARE TRAINED TO IMPROVE YOUR STRENGTH THROUNG
              MANY EXERCISES
            </div>

            <div className="flex justify-evenly align-middle items-center pr-28 pt-4 mx-auto">
              <button className="bg-white px-5 lg:px-7 lg:text-xl font-semibold text-xl   hover:bg-black duration-75 hover:text-white ">
                JOIN NOW
              </button>
              <img className="w-6" src="images/maki--arrow 1.png" alt="" />
            </div>
          </div>

          <div
            className=" design rounded-lg w-full  bg-[#79BED6] py-5 "
            data-aos="fade-up"
          >
            <div className=" flex justify-around  ">
              <div className="font-semibold lg:text-4xl text-xl">
                CARDIO TRAINING
              </div>
              <div className="w-7 lg:w-8">
                <img src="images/Group (1).png" alt="" />
              </div>
            </div>

            <div className="w-[200px] lg:w-[300px] p-2 font-medium lg:text-2xl text-sm mx-auto">
              IN THIS PROGRAM ,YOU ARE TRAINED TO DO SEQUENTIAL MOES IN RANGE OF
              20 UNTIL 30 MINUTES
            </div>

            <div className="flex justify-evenly align-middle items-center pr-28 pt-4 mx-auto">
              <button className="bg-white px-5 lg:px-7 lg:text-xl font-semibold text-xl   hover:bg-black duration-75 hover:text-white ">
                JOIN NOW
              </button>
              <img className="w-6" src="images/maki--arrow 1.png" alt="" />
            </div>
          </div>

          <div
            className=" design rounded-lg w-full  bg-[#79BED6] py-5 "
            data-aos="fade-up"
          >
            <div className=" flex justify-around  ">
              <div className="font-semibold lg:text-4xl text-xl">
                HEALTH FITNESS
              </div>
              <div className="w-7 lg:w-8">
                <img src="images/ri--heart-pulse-fill 1 (1).png" alt="" />
              </div>
            </div>

            <div className="w-[200px] lg:w-[300px] p-2 font-medium lg:text-2xl text-sm mx-auto">
              THIS PROGRAM IS DESIGNED FOR THOSE WHO EXERCISES ONLY FOR THEIR
              BODY FITNESS NOT BODY BUILDING
            </div>

            <div className="flex justify-evenly align-middle items-center pr-28 pt-4 mx-auto">
              <button className="bg-white px-5 lg:px-7 lg:text-xl font-semibold text-xl   hover:bg-black duration-75 hover:text-white  ">
                JOIN NOW
              </button>
              <img className="w-6" src="images/maki--arrow 1.png" alt="" />
            </div>
          </div>
          <div
            className=" design rounded-lg w-full  bg-[#79BED6] py-5 "
            data-aos="fade-up"
          >
            <div className=" flex justify-around  ">
              <div className="font-semibold lg:text-4xl text-xl">FAT BURN</div>
              <div className="w-7 lg:w-8">
                <img src="images/mdi--flame 1 (1).png" alt="" />
              </div>
            </div>

            <div className="w-[200px] lg:w-[300px] p-2 font-medium lg:text-2xl text-sm mx-auto">
              THE PROGRAM IS SUTIABLE FOR YOU WHO WANTS TO GET RID OF YOUR FAT
              AND LOSE THEIR WEIGHT
            </div>

            <div className="flex justify-evenly align-middle items-center pr-28 pt-4 mx-auto">
              <button className="bg-white px-5 lg:px-7 lg:text-xl font-semibold text-xl   hover:bg-black duration-200 hover:text-white ">
                JOIN NOW
              </button>
              <img className="w-6" src="images/maki--arrow 1.png" alt="" />
            </div>
          </div>
        </section>
      </section>
      <section className="pt-6 bg-[#79BED6] ">
        <section className="w-3/4 mx-auto">
          <main className="part-2 flex justify-between ">
            <div className=" md:text-2xl lg:text-6xl  font-semibold text-white">
              EXPLORE OUR
            </div>
            <div className="md:text-2xl  lg:text-6xl font-semibold">
              PROGRAMS
            </div>
            <div className="md:text-2xl lg:text-6xl  font-semibold text-white">
              TO SHAPE YOU
            </div>
          </main>
        </section>

        <section className="w-[90%] pb-8 mx-auto pt-8">
          <section className="flex justify-around space-x-9 align-middle items-center">
            <div>
              <img
                className="w-[100%]"
                src="images/flexing-bodybuilder-silhouette-sticker-25.png"
                alt=""
              />
            </div>
            <div>
              <img
                className="hidden md:block"
                src="images/flexing-bodybuilder-silhouette-sticker-25.png"
                alt=""
              />
            </div>
            <div>
              <div className="text-4xl font-semibold">WHY US?</div>
              <div className="text-white md:w-[300px] md:text-2xl">
                OVER 153+ EXPERT COACHS.TRAIN SMARTER AND FASTER THAN BEFORE.1
                FREE PROGRAM FOR NEW MEMBER.RELIABLE PARTNERS
              </div>
            </div>
          </section>
        </section>
        <section className="bg-[#018ABD] pt-10 pb-10">
          <div className="w-full px-6 ">
            <div className="flex justify-center text-2xl md:text-5xl font-semibold">
              OUR PARTNERS
            </div>
            <div>
              <div className="flex justify-between pt-14  md:justify-around gap-x-10 align-middle items-center md:pt-24 ">
                <div>
                  <img
                    data-aos="flip-up"
                    src="images/jumpman-seeklogo.com 1.png"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    data-aos="flip-up"
                    src="images/Reebok_2019_logo 1.png"
                    alt=""
                  />
                </div>
                <div>
                  <img data-aos="flip-up" src="images/Vector (2).png" alt="" />
                </div>
                <div>
                  <img data-aos="flip-up" src="images/Group 2022.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      <div className="bg-[#018ABD] pb-14 lg:pt-20w " id="price">
        <div className="w-full px-6">
          <div className="text-center text-xl lg:text-5xl font-semibold text-white">
            PRICING PLAN
          </div>

          <div className="grid grid-cols-1 gap-y-5 w-[90%] mx-auto gap-x-10 align-middle  md:flex md:justify-between pt-12">
            <div
              className="md:w-[350px] lg:text-2xl rounded-2xl  h-[400px] bg-[#DCEBF0]"
              data-aos="fade-right"
            >
              <div className="flex justify-around pt-11 items-center">
                <div className="text-xl lg:text-2xl font-semibold ">
                  BASIC PLAN
                </div>
                <div>
                  <img src="images/ri--heart-pulse-fill 1 (1).png" alt="" />
                </div>
              </div>
              <div className="text-xl w-2/4 mx-auto font-semibold">₹1000</div>
              <div className="w-5/6 mx-auto">
                <div className="flex  justify-start  mt-6 ">
                  <img
                    className="w-6 object-contain"
                    src="images/Group (2).png"
                    alt=""
                  />
                  <div className=" text-xl font-semibold mx-4 ">
                    2 HOURS OF EXERCISES
                  </div>
                </div>
                <div className="flex justify-start jus mt-6 ">
                  <img
                    className="w-6 object-contain"
                    src="images/Group (2).png"
                    alt=""
                  />
                  <div className=" text-xl font-semibold mx-4 ">
                    FREE CONSULTATION TO COACHES
                  </div>
                </div>
                <div className="flex justify-start mt-6 ">
                  <img
                    className="w-6 object-contain"
                    src="images/Group (2).png"
                    alt=""
                  />
                  <div className=" text-xl font-semibold mx-4 ">
                    ACCES TO COMMUNITY
                  </div>
                </div>
              </div>
              <div className="w-5/6 mt-11 mx-auto ">
                <button className="bg-white hover:bg-black hover:text-white duration-700 w-full font-semibold text-2xl">
                  JOIN NOW
                </button>
              </div>
            </div>

            <div
              className="md:w-[350px] md:text-2xl rounded-2xl  h-[400px] bg-black text-white "
              data-aos="fade-right"
            >
              <div className="flex justify-around pt-11 items-center">
                <div className="text-xl md:text-2xl font-semibold ">
                  PREMIUM PLAN
                </div>
                <div>
                  <img src="images/Vector (3).png" alt="" />
                </div>
              </div>
              <div className="text-xl w-2/4 mx-auto font-semibold">₹3500</div>
              <div className="w-5/6 mx-auto">
                <div className="flex  justify-start  mt-6 ">
                  <img
                    className="w-6 object-contain"
                    src="images/output-onlinepngtools.png"
                    alt=""
                  />
                  <div className=" text-xl font-semibold mx-4 ">
                    5 HOURS OF EXERCISES
                  </div>
                </div>
                <div className="flex justify-start jus mt-6 ">
                  <img
                    className="w-6 object-contain"
                    src="images/output-onlinepngtools.png"
                    alt=""
                  />
                  <div className=" text-xl font-semibold mx-4 ">
                    FREE CONSULTATION TO COACHES
                  </div>
                </div>
                <div className="flex justify-start mt-6 ">
                  <img
                    className="w-6 object-contain"
                    src="images/output-onlinepngtools.png"
                    alt=""
                  />
                  <div className=" text-xl font-semibold mx-4 ">
                    ACCES TO COMMUNITY
                  </div>
                </div>
              </div>
              <div className="w-5/6 mt-11 mx-auto ">
                <button className="bg-white text-black  w-full font-semibold text-2xl">
                  JOIN NOW
                </button>
              </div>
            </div>

            <div
              className="md:w-[350px] md:text-2xl rounded-2xl  h-[400px] bg-[#DCEBF0]"
              data-aos="fade-right"
            >
              <div className="flex justify-around  pt-11 items-center">
                <div className="text-xl md:text-2xl font-semibold ">
                  PRO PLANS
                </div>
                <div>
                  <img src="images/Group (1).png" alt="" />
                </div>
              </div>
              <div className="text-xl w-2/4 mx-auto font-semibold">₹8000</div>
              <div className="w-5/6 mx-auto">
                <div className="flex  justify-start  mt-6 ">
                  <img
                    className="w-6 object-contain"
                    src="images/Group (2).png"
                    alt=""
                  />
                  <div className=" text-xl font-semibold mx-4 ">
                    8 HOURS OF EXERCISES
                  </div>
                </div>
                <div className="flex justify-start jus mt-6 ">
                  <img
                    className="w-6 object-contain"
                    src="images/Group (2).png"
                    alt=""
                  />
                  <div className=" text-xl font-semibold mx-4 ">
                    FREE CONSULTATION TO COACHES
                  </div>
                </div>
                <div className="flex justify-start mt-6 ">
                  <img
                    className="w-6 object-contain"
                    src="images/Group (2).png"
                    alt=""
                  />
                  <div className=" text-xl font-semibold mx-4 ">
                    ACCES TO COMMUNITY
                  </div>
                </div>
              </div>
              <div className="w-5/6 mt-11 mx-auto ">
                <button className="bg-white hover:bg-black hover:text-white duration-700 w-full font-semibold text-2xl">
                  JOIN NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#30B0C7] py-10">
        <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="flex flex-col items-center lg:items-start">
            <img
              className="foot cursor-pointer w-1/2 md:w-[80%] h-auto"
              src="images/output-onlinepngtools (1).png"
              alt=""
            />
            <div className="mt-5">
              <img
                className="cursor-pointer"
                src="images/App store.png"
                alt=""
              />
            </div>
            <div className="mt-5">
              <img
                className="cursor-pointer"
                src="images/Group 41.png"
                alt=""
              />
            </div>
          </div>

          <div className="flex justify-center align-middle md:inline-block ">
            <div>
              <div className="text-xl font-semibold text-center lg:text-left">
                CONTACT US
              </div>
              <div className="mt-4 flex items-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                <span className="ml-3">mganeshram2005@gmail.com</span>
              </div>
              <div className="mt-4 flex items-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
                <span className="ml-3">91+7010571601</span>
              </div>
              <div className="mt-4 flex items-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <span className="ml-3 w-[200px]">
                  3/1754 Central Grand Station, Los Angeles, London, USA
                </span>
              </div>
            </div>
          </div>

          <div className="text-center lg:text-left ">
            <h1 className="text-xl font-semibold text-white">NEWSLETTER</h1>
            <p className="text-xl text-white md:w-[156px]">
              Don’t miss out on the latest news and offers - sign up today and
              join our thriving fitness community!
            </p>
          </div>

          <div className="text-center">
            <h1 className="text-xl font-semibold text-white mb-4">
              SOCIAL MEDIA
            </h1>
            <div className="flex justify-center space-x-5">
              <img
                className="w-10 cursor-pointer"
                src="images/mdi--instagram 1.png"
                alt=""
              />
              <img
                className="w-10 cursor-pointer"
                src="images/ic--baseline-facebook 1.png"
                alt=""
              />
              <img
                className="w-10 cursor-pointer"
                src="images/mdi--twitter 1.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;