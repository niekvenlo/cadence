import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BasicLink from "../../../src/app/components/basic/BasicLink";

jest.mock("next/navigation", () => ({
  usePathname: () => "/active",
}));

describe("BasicLink", () => {
  it("renders a basic link", () => {
    render(<BasicLink href="/not-active">label</BasicLink>);
    const link = screen.getByText("label");

    expect(link).toBeInTheDocument();
    expect(link).not.toHaveAttribute("data-active");
    expect(link).toMatchSnapshot();
  });
  it("renders a basic active link", () => {
    render(<BasicLink href="/active">label</BasicLink>);
    const link = screen.getByText("label");

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("data-active");
    expect(link).toMatchSnapshot();
  });
});
