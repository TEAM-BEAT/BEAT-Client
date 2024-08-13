import { Helmet } from "react-helmet-async";

interface MetaTagProps {
  title: string;
  ogTitle?: string;
  description?: string;
  image?: string;
  keywords?: string;
  url?: string;
}

const MetaTag = ({ title, ogTitle, description, image, url, keywords }: MetaTagProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={ogTitle ?? "BEAT"} />
      <meta property="og:description" content={description ?? "BE AT WHERE YOUR HEART BEATS"} />
      <meta
        property="og:image"
        content={image ?? `${import.meta.env.VITE_CLIENT_URL}/og_img.png`}
      />
      {keywords ? (
        <meta name="keywords" content={`공연, 밴드, 뮤지컬, 비트, beat, ${keywords}`} />
      ) : (
        <meta name="keywords" content="공연, 밴드, 뮤지컬, 비트, beat" />
      )}
      {url ? (
        <meta property="og:url" content={url} />
      ) : (
        <meta property="og:url" content={`${import.meta.env.VITE_CLIENT_URL}`} />
      )}
    </Helmet>
  );
};

export default MetaTag;
