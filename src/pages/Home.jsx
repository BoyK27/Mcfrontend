import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import SEO from "../components/SEO";
import StructuredData from "../components/StructuredData";

const Home = () => {
  const petStoreSchema = {
    "@context": "https://schema.org",
    "@type": "PetStore",
    name: "Pomeranian Puppies & Pet Sanctuary",
    url: "https://marinebox-store.com",
    logo: "https://marinebox-store.com/logo.png",
    description:
      "Licensed US breeder and adoption nursery connecting healthy, vet-inspected, and microchipped Pomeranian puppies with loving families nationwide.",

    sameAs: [
      "https://www.tiktok.com/@pemeranianpuppies45?_r=1&_t=ZP-99F7PqyI5yJ",
    ],

    address: {
      "@type": "PostalAddress",
      streetAddress: "1225 N Loop W #705",
      addressLocality: "Houston",
      addressRegion: "TX",
      postalCode: "77008",
      addressCountry: "US",
    },

    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-563-202-7859",
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: ["English"],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Pomeranian Puppies & Pet Sanctuary",
    url: "https://marinebox-store.com",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://marinebox-store.com/collection?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div>
      <SEO
        title="Pomeranian Puppies & Pet Sanctuary | Purebred US Pet Adoption"
        description="Find purebred, vet-inspected Pomeranian puppies and companions ready for home adoption. Includes health guarantees, microchipping, and safe nationwide US delivery."
        keywords="Pomeranian puppies USA, buy Pomeranian puppy, US pet adoption, purebred puppies Houston TX, microchipped Pomeranians"
        url="https://marinebox-store.com"
      />

      <StructuredData schema={petStoreSchema} />
      <StructuredData schema={websiteSchema} />

      {/* Main Home Sections */}
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
    </div>
  );
};

export default Home;
