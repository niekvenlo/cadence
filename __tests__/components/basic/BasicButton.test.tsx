import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BasicButton from "../../../src/app/components/basic/BasicButton";

describe("BasicButton", () => {
  it("renders a basic button", () => {
    render(<BasicButton>label</BasicButton>);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("label");
    expect(button).toHaveStyle("font-weight: inherit");
    expect(button).toMatchSnapshot();
  });
  it("renders a primary button", () => {
    render(<BasicButton isPrimary>label</BasicButton>);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("label");
    expect(button).toHaveStyle("font-weight: bold");
    expect(button).toMatchSnapshot();
  });
});
