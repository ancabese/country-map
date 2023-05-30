import InfoBox from "@/components/InfoBox";
import { render, screen } from "@testing-library/react";

describe("InfoBox", () => {
  test("renders InfoBox component with correct text when isoLoading is true", () => {
    render(
      <InfoBox
        isoLoading={true}
        dataLoading={false}
        isoError={null}
        dataError={undefined}
      />
    );
    const isoLoadingP = screen.getByText(/Loading country ISO.../i);
    expect(isoLoadingP).toBeInTheDocument();
  });

  test("renders InfoBox component with correct text when isoLoading is true", () => {
    render(
      <InfoBox
        isoLoading={false}
        dataLoading={true}
        isoError={null}
        dataError={undefined}
      />
    );
    const dataLoadingP = screen.getByText(/Loading country data.../i);
    expect(dataLoadingP).toBeInTheDocument();
  });

  test("renders InfoBox component with correct text when there is an isoError", () => {
    render(
      <InfoBox
        isoLoading={false}
        dataLoading={true}
        isoError="Error loading ISO."
        dataError={undefined}
      />
    );
    const isoErrorP = screen.getByText(/Error loading ISO./i);
    expect(isoErrorP).toBeInTheDocument();
  });

  test("renders InfoBox component with correct text when there is a dataError", () => {
    render(
      <InfoBox
        isoLoading={false}
        dataLoading={true}
        isoError="Error loading country data."
        dataError={undefined}
      />
    );
    const dataErrorP = screen.getByText(/Error loading country data./i);
    expect(dataErrorP).toBeInTheDocument();
  });
});
