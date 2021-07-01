import React from "react";
import { useHelloQuery } from "../generated/graphql";

interface WelcomePageProps {}

export const WelcomePage: React.FC<WelcomePageProps> = () => {
  //   const [value, setValue] = useState("");
  const { data } = useHelloQuery();

  return (
    <div>
      <div>Remegle Site</div>
      <div>{data?.hello}</div>
    </div>
  );
};
