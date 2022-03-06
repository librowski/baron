import { ComponentProps } from "react";
import styled from "styled-components";
import { IconButton } from "./IconButton";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin: 0 24px;
`;

type Props = {
  icons: ComponentProps<typeof IconButton>[];
};

export const IconButtonSection: React.FC<Props> = ({ icons, ...rest }) => (
  <Container {...rest}>
    {icons.map((props) => (
      <IconButton {...props} />
    ))}
  </Container>
);
