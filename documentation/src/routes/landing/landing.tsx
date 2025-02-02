import { useState } from "react";
import { useDidMount, useWindowEvent } from "@reins/hooks";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import { Hero } from "./hero";
import { Clients } from "./clients";
import { Summary } from "./summary";
import { CallToAction } from "./call-to-action";
import { Modules } from "./modules/modules";
import { Integrations } from "./integrations/integrations";

export const Landing = () => {
  const { siteConfig } = useDocusaurusContext();

  const [hide, setHide] = useState(false);

  useDidMount(() => {
    window.scrollTo(0, 0);
  });

  useWindowEvent(
    "scroll",
    () => {
      const hideValue = window.scrollY > window.innerHeight * 2;

      if (hide !== hideValue) {
        setHide(hideValue);
      }
    },
    [hide],
  );

  return (
    <Layout title="Modern frontend ecosystem" description={siteConfig.tagline}>
      <div className="w-[100vw] max-w-[100vw]" style={{ contain: "paint" }}>
        <div className="relative z-2">
          <Hero />
          <Clients />
          <Modules />
          <Integrations />
          <Summary />
          <CallToAction />
        </div>
      </div>
    </Layout>
  );
};
