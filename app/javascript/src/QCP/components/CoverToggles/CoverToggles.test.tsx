import { CoverToggle as CoverToggleType } from "@/types";
import { render, screen, userEvent, within } from "@utils/testUtils";
import { CoverToggles } from "./CoverToggles";

const threeSelects: CoverToggleType[] = [
  {
    field_name: "general_liability",
    question_text: "General Liability",
    value: "1000000",
    info: "This is some info",
    starts_from: "1000000",
    options: {
      "$1,000,000": "1000000",
      "$2,000,000": "2000000",
      "$3,000,000": "3000000",
    },
  },
  {
    field_name: "public_liability",
    question_text: "Public Liability",
    value: "1000000",
    info: "This is some info",
    starts_from: "1000000",
    options: {
      "$1,000,000": "1000000",
      "$2,000,000": "2000000",
      "$3,000,000": "3000000",
    },
  },
  {
    field_name: "product_liability",
    question_text: "Product Liability",
    value: "1000000",
    info: "This is some info",
    starts_from: "1000000",
    options: {
      "$1,000,000": "1000000",
      "$2,000,000": "2000000",
      "$3,000,000": "3000000",
    },
  },
];

const togglesWithMissingOptions: CoverToggleType[] = [
  {
    field_name: "general_liability",
    question_text: "General Liability",
    value: "1000000",
    info: "Provides coverage against third-party claims and lawsuits, such as bodily injury or property damage",
    starts_from: "0",
    options: {
      "$250,000": "250000",
      "$500,000": "500000",
      "$1,000,000": "1000000",
      "$2,000,000": "2000000",
    },
  },
  {
    field_name: "gl_plus_sum_insured",
    question_text: "Business Personal Property",
    value: "5000",
    info: "Provides coverage against third-party claims and lawsuits, such as bodily injury or property damage",
    starts_from: "0",
    options: {
      "$10,000": "10000",
      "$20,000": "20000",
      "$30,000": "30000",
      "$40,000": "40000",
      "$50,000": "50000",
      "$100,000": "100000",
    },
  },
  {
    field_name: "identity_fraud_expense_coverage",
    question_text: "Identity Fraud Expense Coverage",
    value: "yes",
    info: "Provides coverage against third-party claims and lawsuits, such as bodily injury or property damage",
    starts_from: "0",
    selected: true,
    excess_toggle_cover: null,
  },
];

describe("CoverToggles", () => {
  it("renders", () => {
    const onChange = jest.fn();
    render(<CoverToggles coverToggles={threeSelects} onChange={onChange} />);
  });

  it("shows nothing when props are an empty array", () => {
    const onChange = jest.fn();
    const { container } = render(
      <CoverToggles coverToggles={[]} onChange={onChange} />
    );

    expect(container.firstChild).toBeNull();
  });

  it("shows nothing when coverToggles is missing in data", () => {
    const onChange = jest.fn();
    const { container } = render(
      // @ts-expect-error wrong data type to break test
      <CoverToggles onChange={onChange} />
    );

    expect(container.firstChild).toBeNull();
  });

  it.each(["General Liability", "Public Liability", "Product Liability"])(
    "renders the %s select with correct options",
    (label) => {
      const onChange = jest.fn();
      render(<CoverToggles coverToggles={threeSelects} onChange={onChange} />);
      const select = screen.getByLabelText(label);

      expect(within(select).getByRole("option", { name: "$1M" })).toHaveValue(
        "1000000"
      );
      expect(within(select).getByRole("option", { name: "$2M" })).toHaveValue(
        "2000000"
      );
      expect(within(select).getByRole("option", { name: "$3M" })).toHaveValue(
        "3000000"
      );
    }
  );

  it("changing cover toggle triggers onChange", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<CoverToggles coverToggles={threeSelects} onChange={onChange} />);

    const selectToggle = screen.getByLabelText("Product Liability");

    await user.selectOptions(selectToggle, "2000000");

    const expectedValue = {
      fromValue: "1000000",
      label: "Product Liability",
      name: "product_liability",
      toValue: "2000000",
    };

    expect(onChange).toHaveBeenCalledWith(expectedValue);
  });

  it("does not render toggles that are missing options", async () => {
    const onChange = jest.fn();
    const { container } = render(
      <CoverToggles
        coverToggles={togglesWithMissingOptions}
        onChange={onChange}
      />
    );
    const toggles = container.getElementsByTagName("select");

    expect(toggles.length).toBe(2);
    expect(screen.getByLabelText("General Liability")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Business Personal Property")
    ).toBeInTheDocument();
    expect(screen.queryByText("Identity Fraud Expense Coverage")).toBeFalsy();
  });

  it("does not render toggles when options are undefined", async () => {
    const badOptions: CoverToggleType[] = [
      {
        field_name: "identity_fraud_expense_coverage",
        question_text: "Identity Fraud Expense Coverage",
        value: "yes",
        info: "Provides coverage against third-party claims and lawsuits, such as bodily injury or property damage",
        starts_from: "0",
        options: undefined,
      },
    ];

    const onChange = jest.fn();
    const { container } = render(
      <CoverToggles coverToggles={badOptions} onChange={onChange} />
    );
    const toggles = container.getElementsByTagName("select");

    expect(toggles.length).toBe(0);
  });
});
