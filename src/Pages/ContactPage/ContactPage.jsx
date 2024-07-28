import ContactContent from "../../components/ContactSections/ContactContent/ContactContent";
import ContactCard from "../../components/ContactSections/ContactCard/ContactCard";
import ContactBaner from "../../components/ContactSections/ContactBanner/ContactBaner";
import Meta from "../../components/Meta/Meta";
function ContactPage() {
  return (
    <div>
      <Meta title="GameUnite || ContactUs" />
      <ContactBaner />
      <ContactContent />
      <ContactCard />
    </div>
  );
}

export default ContactPage;
