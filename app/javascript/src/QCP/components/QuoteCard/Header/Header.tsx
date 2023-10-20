import { useAppContext } from "@/contexts";
import { Ratings as RatingsType } from "@/types";
import { Ratings } from "../Ratings/Ratings";

type Props = {
  logo?: string;
  insurerFinancialStrengthRatings?: RatingsType;
};

export const Header = ({ logo, insurerFinancialStrengthRatings }: Props) => {
  const { origin } = useAppContext();
  const logoUrl = logo?.startsWith("http") ? logo : `${origin}${logo}`;

  return (
    <div className="header__container">
      {logo && (
        <img
          src={logoUrl}
          alt="Provider logo"
          className="header__provider-logo"
        />
      )}
      {insurerFinancialStrengthRatings && (
        <Ratings data={insurerFinancialStrengthRatings} />
      )}
    </div>
  );
};
