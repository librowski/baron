import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const ICON_SIZE = 48;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background: #ffffff10;
  width: ${ICON_SIZE}px;
  height: ${ICON_SIZE}px;
  border-radius: 100%;
  color: #eaeaeaaa;
  box-shadow: 0px 3px 15px 5px #ffffff22;

  transition: 200ms ease all;
  cursor: pointer;
  text-align: center;

  :hover {
    transform: translateY(-10%) scale(1.2);
    color: #eaeaea;
  }
`;

type Props = {
  icon: IconDefinition;
  onClick: () => void;
};

export const Icon: React.FC<Props> = ({ icon, onClick }) => (
  <Container onClick={onClick}>
    <FontAwesomeIcon icon={icon} size="2x" />
  </Container>
);
