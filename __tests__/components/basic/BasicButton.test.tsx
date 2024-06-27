import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BasicButton from "../../../src/app/components/basic/BasicButton";

describe("BasicButton", () => {
  it("renders a basic button", () => {
    render(<BasicButton>label</BasicButton>);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("label");
    expect(button).not.toHaveAttribute("data-variant");
    expect(button).toMatchSnapshot();
  });
  it("renders a primary button", () => {
    render(<BasicButton variant="primary">label</BasicButton>);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("label");
    expect(button).toHaveAttribute("data-variant");
    expect(button).toMatchSnapshot();
  });
});
