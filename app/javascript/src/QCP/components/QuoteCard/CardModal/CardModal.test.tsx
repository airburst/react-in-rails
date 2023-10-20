import { render, screen, userEvent } from "@utils/testUtils";
import React from "react";
import { CardModal } from "./CardModal";

describe("CardModal", () => {
  beforeAll(() => {
    // Mock window.matchMedia used by Modal from Mobius
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it("renders modal", async () => {
    const toggleText = "Click me";
    const title = "Heading";
    const body = "Lorem ipsum";

    render(<CardModal toggleText={toggleText} title={title} body={body} />);

    expect(screen.getByText(toggleText)).toBeInTheDocument();

    const toggle = screen.getByRole("button");
    const user = userEvent.setup();

    await user.click(toggle);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(body)).toBeInTheDocument();

    await user.keyboard("{escape}");

    expect(screen.queryByText(title)).not.toBeInTheDocument();
    expect(screen.queryByText(body)).not.toBeInTheDocument();
  });

  describe("given onOpen is provided", () => {
    it("calls the function", async () => {
      const toggleText = "Click me";
      const title = "Heading";
      const body = "Lorem ipsum";
      const onOpen = jest.fn();

      render(
        <CardModal
          toggleText={toggleText}
          title={title}
          body={body}
          onOpen={onOpen}
        />,
      );

      expect(screen.getByText(toggleText)).toBeInTheDocument();

      const toggle = screen.getByRole("button");
      const user = userEvent.setup();

      await user.click(toggle);

      expect(onOpen).toHaveBeenCalled();
    });
  });
});
