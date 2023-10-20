// For CSS
declare module "*.module.css" {
  const classes: {
    use: (props: { target: ShadowRoot | null }) => void;
    unuse: () => void;
    locals: Record<string, string>;
  };
  export default classes;
}

// For LESS
declare module "*.module.less" {
  const classes: { [key: string]: string };
  export default classes;
}

// For SCSS
declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.scss";
declare module "*.css";
declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
