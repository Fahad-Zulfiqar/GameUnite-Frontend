import AddCards from "../../components/AboutSections/AddCards/AddCards";
import Content from "../../components/AboutSections/Content/Content";
import Banner from "../../components/AboutSections/Banner/Baner";
import OurMission from "../../components/AboutSections/Mission/OurMission";
import Meta from "../../components/Meta/Meta";
function AboutPage() {
  return (
    <>
      <Meta title="GameUnite || About" />
      <div className="Banner">
        <Banner />
      </div>
      <div className="container">
        <Content />
      </div>
      <div className="OurMission">
        <OurMission />
      </div>
      <div className="container">
        <AddCards />
      </div>
    </>
  );
}

export default AboutPage;
