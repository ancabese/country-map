export const fetchCountryIsoRequest = (lat: number, lng: number) => ({
  url: `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
});
