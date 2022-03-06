import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { ComponentProps } from "react";
import { IconButton } from "../components/IconButton";
import { IconButtonSection } from "../components/IconButtonSection";

const icons: ComponentProps<typeof IconButton>[] = [
  { icon: faHeadphones, onClick: () => null },
];

export const RightSection: React.FC = () => <IconButtonSection icons={icons} />;
