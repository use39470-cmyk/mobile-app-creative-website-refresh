export function supportHead(title: string, description: string) {
  return { meta: [{ title: `${title} | Mobile App Creative` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} | Mobile App Creative` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex,nofollow' }] };
}
