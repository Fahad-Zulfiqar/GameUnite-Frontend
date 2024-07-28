import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="kewords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to GameUnite",
  description: "We sell the best Game accounts in cheap",
  keywords: "Genres, Buy Game accounts, cheap Game accounts",
};

export default Meta;
