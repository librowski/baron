import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const ICON_SIZE = 28;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${ICON_SIZE}px;
  height: ${ICON_SIZE}px;
  border-radius: 100%;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(3px);
  color: rgba(255, 255, 255, 0.75);
  cursor: pointer;

  transition: 300ms ease background, color;

  :hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

type Props = {
  icon: IconDefinition;
  onClick: () => void;
};

export const IconButton: React.FC<Props> = ({ icon, onClick }) => (
  <Container onClick={onClick}>
    <FontAwesomeIcon icon={icon} size={"sm"} />
  </Container>
);
