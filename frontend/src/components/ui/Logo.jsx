import logo from "../../assets/logo.png";

export default function Logo({ src = logo, width = 200 }) {
  return <img src={src} alt="ParentGenius" width={width} />;
}