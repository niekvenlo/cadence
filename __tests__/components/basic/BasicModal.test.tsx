import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BasicModal from "../../../src/app/components/basic/BasicModal";

describe("BasicModal", () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });
  it("renders an open modal", () => {
    render(
      <BasicModal isOpen requestClose={() => {}}>
        contents
      </BasicModal>
    );
    const dialog = screen.getByRole("dialog", { hidden: true });

    expect(dialog).toBeInTheDocument();
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    expect(HTMLDialogElement.prototype.close).not.toHaveBeenCalled();
    expect(dialog).toMatchSnapshot();
  });
  it("renders a closed modal", () => {
    render(<BasicModal requestClose={() => {}}>contents</BasicModal>);
    const dialog = screen.getByRole("dialog", { hidden: true });

    expect(dialog).toBeInTheDocument();
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
    expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
    expect(dialog).toMatchSnapshot();
  });
  it("requests a close when the close button is clicked", () => {
    const requestClose = jest.fn();
    render(<BasicModal requestClose={requestClose}>contents</BasicModal>);
    const closeButton = screen.getByLabelText("Close");
    closeButton.click();

    expect(closeButton).toBeInTheDocument();
    expect(requestClose).toHaveBeenCalled();
  });
});
