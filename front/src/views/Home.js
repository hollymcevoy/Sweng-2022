import Welcome from '../components/Welcome';
import NavbarComp from '../components/NavbarComp';
import Features from "../components/Features";

function Home() {
  return (
    <div>
      <NavbarComp />
      <p className="App-Page-Header">Welcome to QueryBot22</p>
      <p>This application will answer all your questions.</p>
      <Features />
      <Welcome />
    </div>
  );
}

export default Home;
