import { getCountryIsoRequestConfig } from "@/utils/getCountryIsoRequestConfig";

describe("getCountryIsoRequestConfig", () => {
  test("returns the correct config object for the specified coords", () => {
    const testCoords = { lat: 50, lng: 50 };

    const expectedConfig = {
      url: `https://api.geoapify.com/v1/geocode/reverse?lat=${testCoords.lat}&lon=${testCoords.lng}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
    };

    const actualResult = getCountryIsoRequestConfig(
      testCoords.lat,
      testCoords.lng
    );

    expect(actualResult).toEqual(expectedConfig);
  });
});
