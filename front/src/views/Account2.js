import NavbarComp from '../components/NavbarComp';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import Profile from '../components/profile';

function About() {
  return (
    <div>
      <NavbarComp />
      <Profile />
      <LogoutButton/>
      <LoginButton/>
    </div>
  );
}

export default About;
