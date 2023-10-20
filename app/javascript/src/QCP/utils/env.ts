const DEFAULT_ENV = "local";

const getRailsEnv = () => {
  // <meta content="staging" name="env">
  const envMetaTag = document.head.querySelector('[name="env"]');
  const railsEnv = envMetaTag?.getAttribute("content");

  return railsEnv || DEFAULT_ENV;
};

export const getEnvironment = () => {
  const railsEnv = getRailsEnv();

  if (process.env.NODE_ENV === "test" || railsEnv === "test") {
    return "test";
  }

  return railsEnv;
};

export const isTestEnv = () => getEnvironment() === "test";

export const hasRailsEnv = () => getEnvironment() !== DEFAULT_ENV;

// The app is hosted when the browser url is either local Chopin or a quote subdomain
export const isHosted = (host: string = location?.origin || ""): boolean => {
  if (host.match(/(qcp-embed)/)) {
    return false;
  }

  return hasRailsEnv();
};

export const isStandalone = (host?: string): boolean => !isHosted(host);
