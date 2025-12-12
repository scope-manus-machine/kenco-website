import { useEffect } from "react";
import { useLocation } from "wouter";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

/**
 * SEO Component
 * Dynamically updates page title, meta tags, and structured data
 */
export default function SEO({ title, description, canonical, ogImage }: SEOProps) {
  const [location] = useLocation();

  useEffect(() => {
    // Update page title
    if (title) {
      document.title = title;
    }

    // Update meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);

      // Update OG description
      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', description);
      }

      // Update Twitter description
      let twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescription) {
        twitterDescription.setAttribute('content', description);
      }
    }

    // Update canonical URL
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.href = canonical;

      // Update OG URL
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute('content', canonical);
      }

      // Update Twitter URL
      let twitterUrl = document.querySelector('meta[name="twitter:url"]');
      if (twitterUrl) {
        twitterUrl.setAttribute('content', canonical);
      }
    }

    // Update OG image
    if (ogImage) {
      let ogImageMeta = document.querySelector('meta[property="og:image"]');
      if (ogImageMeta) {
        ogImageMeta.setAttribute('content', ogImage);
      }

      let twitterImage = document.querySelector('meta[name="twitter:image"]');
      if (twitterImage) {
        twitterImage.setAttribute('content', ogImage);
      }
    }

    // Update OG title
    if (title) {
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', title);
      }

      let twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle) {
        twitterTitle.setAttribute('content', title);
      }
    }
  }, [title, description, canonical, ogImage, location]);

  return null;
}

/**
 * Add JSON-LD structured data to the page
 */
export function addStructuredData(data: object) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [data]);

  return null;
}

/**
 * Organization structured data for Kenco Ltd
 */
export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Kenco Ltd",
  "url": "https://kenco.nz",
  "logo": "https://kenco.nz/logo.svg",
  "description": "Clinically effective infection control solutions for healthcare facilities",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "NZ",
    "addressRegion": "New Zealand"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+64-21-029-66718",
    "contactType": "Customer Service",
    "email": "web@kenco.nz",
    "availableLanguage": "English"
  },
  "sameAs": []
};

/**
 * LocalBusiness structured data
 */
export const localBusinessStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Kenco Ltd",
  "image": "https://kenco.nz/logo.svg",
  "url": "https://kenco.nz",
  "telephone": "+64-21-029-66718",
  "email": "web@kenco.nz",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "NZ"
  },
  "priceRange": "$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "17:00"
  }
};
