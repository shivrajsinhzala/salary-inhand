/**
 * Central site constants + shared Schema.org entities.
 * Keeping the Organization/WebSite graph in one place means every page
 * emits a consistent publisher entity (E-E-A-T signal for YMYL finance).
 */

export const SITE_URL = 'https://salary.shivrajsinh.in';
export const SITE_NAME = 'InHand';
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Bump when tax rules or calculation logic change — drives dateModified. */
export const CONTENT_UPDATED = '2026-09-17';

export const CONTENT_UPDATED_LABEL = new Date(CONTENT_UPDATED).toLocaleDateString('en-IN', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

export const organizationSchema = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  alternateName: 'InHand Salary Calculator',
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/og-image.png`,
    width: 1200,
    height: 630
  },
  description:
    'Precision in-hand salary, income tax regime, loan EMI, and investment calculators for Indian salaried professionals.',
  areaServed: {
    '@type': 'Country',
    name: 'India'
  },
  knowsAbout: [
    'Indian income tax',
    'New Tax Regime Section 115BAC',
    'Employees Provident Fund',
    'Professional Tax',
    'Cost to Company',
    'Take-home salary'
  ]
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  inLanguage: 'en-IN',
  publisher: { '@id': ORG_ID },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/in-hand-salary/{search_term_string}/`
    },
    'query-input': 'required name=search_term_string'
  }
};

/**
 * Wraps page-specific nodes with the shared Organization + WebSite entities.
 * Page nodes should reference them via {"@id": ORG_ID} / {"@id": WEBSITE_ID}.
 */
export function buildGraph(nodes = []) {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema, websiteSchema, ...nodes]
  };
}

/** Standard BreadcrumbList from [{name, path}] pairs. */
export function breadcrumbSchema(trail) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`
    }))
  };
}
