import styled from "styled-components";

type Option = {
  label: string;
  onClick: () => void;
};
type Props = {
  options: Option[];
};

const Container = styled.div`
  min-width: 100px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: rgba(58, 99, 122, 0.7);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
`;

const OptionRow = styled.div`
  transition: 300ms ease background, color;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  font-family: "Montserrat Regular";
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  padding: 8px;

  :hover {
    background: rgba(255, 255, 255, 0.09);
    color: rgba(255, 255, 255, 0.75);
  }
`;

export const DropdownList: React.FC<Props> = ({ options, ...rest }) => (
  <Container {...rest}>
    {options.map(({ label, onClick }) => (
      <OptionRow onClick={onClick}>{label}</OptionRow>
    ))}
  </Container>
);
