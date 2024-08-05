import { Helmet } from "react-helmet-async";

interface MetaTagProps {
  title: string;
  description: string;
  image: string;
  url?: string;
}

const MetaTag = ({ title, description, image, url }: MetaTagProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="keywords" content={`공연, 밴드, 뮤지컬, 비트, beat, ${title}`} />
      {url && <meta property="og:url" content={url} />}
    </Helmet>
  );
};

export default MetaTag;
