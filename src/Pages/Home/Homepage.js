import React, { useEffect, useState } from 'react'
import '../../Pages/Home/Homepage.css'
import Button from "react-bootstrap/Button";
import { FcGoogle } from "react-icons/fc";
import {auth} from '../../firebase'
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState({})

  const navigate = useNavigate();
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (result) => {
  //     if (result) {

  //       const {displayName, email} = result
  //       setUserData({ displayName, email })
        
  //       setIsLoggedIn(true)
  //     } else {
  //       setIsLoggedIn(false)
  //     }

  //   })

  //   return () => unsubscribe();
  // },[])
  
  const SignUpUsingGoogle = () => {

    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {

        // const { displayName, email } = result.user;
        // setUserData({ displayName, email })
       navigate('/todo')
        setIsLoggedIn(true)
      }).catch((error) => {

        console.log({ error });

      });
  }
  return (
    <>
    <div className='main_home'>
    <div className="row">
  <div className="column ">
    <h3 className='login_title'>LOGIN</h3>
    <p className='login_para'>Lorem ipsum dolor sit amet, consectetur  adipisicing elit. Perferendis  enim cumqueaccusantium sunt esse incidunt voluptatem   natus,  error pariatur, commodi facere  repudiandae suscipit
     dolorem delectus beatae recusandae itaque repellat ea.</p>
     {/*  */}
           {!isLoggedIn &&
       
        <div className='btn_style'>
        <Button className='btn' onClick={SignUpUsingGoogle}  > <FcGoogle className='btn_google' />Sign In with Google</Button>
        </div>
      }
{/* 
      {isLoggedIn &&
        <div className="wrapper">
          <div className="profile-card js-profile-card">


            <div className="profile-card__cnt js-profile-cnt">
              <div className="profile-card__name">{userData.displayName}</div>
              <div className="profile-card__txt">{userData.email}</div>
              <div className="profile-card-loc">
              </div>
               <div className="profile-card-ctr">
                <button className="profile-card__button button--orange" onClick={Logout}>Log out</button>
              </div> 
            </div>

          </div>
        </div>
      } */}

 
  </div>
  <div className="column">
    

  </div>
</div>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,0L34.3,16C68.6,32,137,64,206,90.7C274.3,117,343,139,411,128C480,117,549,75,617,96C685.7,117,754,203,823,213.3C891.4,224,960,160,1029,138.7C1097.1,117,1166,139,1234,160C1302.9,181,1371,203,1406,213.3L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
    </>
    
  )
}

export default Homepage

