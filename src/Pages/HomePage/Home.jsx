import Accounts from "../../components/HomeSections/Accounts/Accounts";
import Method from "../../components/HomeSections/Methods/Method";
import Secure from "../../components/HomeSections/Secure/Secure";
import Slider from "../../components/HomeSections/Slider/Slider";
import Topgames from "../../components/HomeSections/TopGames/Topgames";
import Trending from "../../components/HomeSections/Trendings/Trending";
import Meta from "../../components/Meta/Meta";

const Home = () => {
  const slides = [
    { image: "https://flowbite.com/docs/images/carousel/carousel-1.svg" },
    { image: "https://flowbite.com/docs/images/carousel/carousel-1.svg" },
    { image: "https://flowbite.com/docs/images/carousel/carousel-1.svg" },
    { image: "https://flowbite.com/docs/images/carousel/carousel-1.svg" },
  ];

  return (
    <div>
      <Meta title="GameUnite || Home" />
      <Slider slides={slides} />

      <Topgames />

      <Trending />

      <Method />

      <Secure />

      <Accounts />
    </div>
  );
};

export default Home;
