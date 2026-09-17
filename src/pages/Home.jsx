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
    name: "Maine Coon Haven & Ethical Cattery",
    url: "https://marinebox-store.com",
    logo: "https://marinebox-store.com/logo.png",
    description:
      "Ethical home cattery specializing in purebred, pedigree Maine Coon kittens, comprehensive HCM/SMA DNA screening, and stress-free in-cabin companion transport.",

    sameAs: ["https://www.tiktok.com/@bryces.pet.stop"],

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
      telephone: "+1-912-845-3708",
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: ["English"],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Maine Coon Haven",
    url: "https://marinebox-store.com",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://marinebox-store.com/collection?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="bg-[#ECEBE8] text-[#191C1E]">
      <SEO
        title="Maine Coon Haven | Ethical Pedigree Maine Coon Cattery"
        description="Find purebred, vet-cleared Maine Coon kittens and gentle giants ready for loving homes. Includes TICA/CFA pedigrees, DNA screening, and in-cabin flight nanny transport."
        keywords="Maine Coon kittens, purebred Maine Coon cattery, gentle giants, TICA Maine Coon, buy Maine Coon kitten US, HCM clear cats"
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
