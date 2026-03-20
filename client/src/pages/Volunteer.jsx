import React from 'react';
import VolunteerForm from '../components/VolunteerForm';
import BackToHome from '../components/BackToHome';

const Volunteer = () => {
  return (
    <div className="volunteer-page">
      <VolunteerForm />
      <BackToHome />
    </div>
  );
};

export default Volunteer;
