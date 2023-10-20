import { render, screen, userEvent } from "@utils/testUtils";
import { QuoteActions } from "./QuoteActions";

const mockFn = jest.fn((e) => e.preventDefault());

describe("QuoteActions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders", () => {
    render(<QuoteActions quoteId="123" insurer="ACME Insurance" />);

    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(screen.getByText("Select")).toBeInTheDocument();
  });

  it("triggers Buy action, which adds input to form", async () => {
    const quoteId = "654745346";
    const insurer = "Hiscox";

    const { container } = render(
      <QuoteActions quoteId={quoteId} insurer={insurer} />,
    );

    const form = screen.getByRole("form");

    form.onsubmit = mockFn;

    const buyButton = screen.getByRole("button", {
      name: /Select/i,
    });

    expect(buyButton).toBeInTheDocument();
    await userEvent.click(buyButton);
    expect(mockFn).toBeCalledTimes(1);

    const buyInput = container.querySelector("#buy_button_clicked");
    expect(buyInput).toBeInTheDocument();
  });

  it("triggers Details action", async () => {
    const quoteId = "654745346";
    const insurer = "ACME";

    render(<QuoteActions quoteId={quoteId} insurer={insurer} />);

    const form = screen.getByRole("form");

    form.onsubmit = mockFn;

    const detailsButton = screen.getByRole("button", {
      name: /Details/i,
    });

    expect(detailsButton).toBeInTheDocument();

    await userEvent.click(detailsButton);
    expect(mockFn).toBeCalledTimes(1);
  });
});
