import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BasicPill from "../../../src/app/components/basic/BasicPill";

describe("BasicPill", () => {
  it("renders a pill", () => {
    render(<BasicPill>label</BasicPill>);
    const button = screen.getByText("label");

    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle("background: darkgreen; white-space: nowrap");
    expect(button).toMatchSnapshot();
  });
});
