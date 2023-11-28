import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import UpdateTheme from '../components/UpdateTheme';

export default function ProfilePage() {

   UpdateTheme();

    if (Auth.loggedIn()) {

      // Query for logged in user information to render profile page
      
      const { data, loading } = useQuery(QUERY_ME);
  
      if (loading) {
        return <div>Loading...</div>;
      } else {

        const myData = data?.me;

        return (
          <div className='centered'>
            <div>
                <div id="username">
                  <h2>@ {myData.username}</h2>
                </div>
                <div>
                  <img className="profilePicture" src={myData.photo} alt="Profile" />
                </div>
                <div id="name">
                  <h2>{myData.fullname}</h2>
                </div>
                <div id="bio">
                  <p>{myData.bio}</p>
                </div>
                <Link to="/profile/edit">
                  <button id="edit">
                    edit profile
                  </button>
                </Link>
            </div>
          </div>
        );
      }
    } else {
      document.location.replace('/');
    }
  }
