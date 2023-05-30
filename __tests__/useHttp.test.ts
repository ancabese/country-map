import { act } from "react-dom/test-utils";
import useHttp from "../src/hooks/useHttp";
import fetchMock from "fetch-mock";
import { renderHook } from "@testing-library/react";

beforeAll(() => {
  global.fetch = window.fetch;
});
afterAll(() => {
  fetchMock.restore();
});

describe("useHttp custom hook", () => {
  it("returns the correct data when used with the ISO country code API", async () => {
    const testCoords = { lat: 51.5074, lng: 0.1278 };

    const { result } = renderHook(() => useHttp());
    const { sendRequest } = result.current;

    fetchMock.mock(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${testCoords.lat}&lon=${testCoords.lng}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
      {
        returnedData: {
          features: [
            {
              properties: {
                country_code: "ch",
              },
            },
          ],
        },
      },
      { overwriteRoutes: true }
    );

    let receivedISO = "";
    await act(async () => {
      sendRequest(
        {
          url: `https://api.geoapify.com/v1/geocode/reverse?lat=${testCoords.lat}&lon=${testCoords.lng}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        (data: any) => {
          receivedISO = data.returnedData.features[0].properties.country_code;
        }
      );
    });

    expect(receivedISO).toBe("ch");
  });

  it("returns an error when calling the ISO country code API", async () => {
    const testCoords = { lat: 51.5074, lng: 0.1278 };

    const { result } = renderHook(() => useHttp());
    const { sendRequest } = result.current;

    fetchMock.mock(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${testCoords.lat}&lon=${testCoords.lng}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
      {
        ok: false,
        statusText: "Not found",
      },
      { overwriteRoutes: true }
    );

    let responseOkValue;
    await act(async () => {
      sendRequest(
        {
          url: `https://api.geoapify.com/v1/geocode/reverse?lat=${testCoords.lat}&lon=${testCoords.lng}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        (data: any) => {
          responseOkValue = data.ok;
        }
      );
    });

    expect(responseOkValue).toBe(false);
  });
});
