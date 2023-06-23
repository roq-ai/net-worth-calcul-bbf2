const mapping: Record<string, string> = {
  'financial-informations': 'financial_information',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
