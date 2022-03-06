import styled from "styled-components";
import { RightSection } from "./RightSection";
import { Workspaces } from "./Workspaces";

// With the Tauri API npm package:
// import { invoke } from "@tauri-apps/api/tauri";
// const exec = (command: string) => invoke("exec", { command });

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  user-select: none;
`;

const Bar = styled.div`
  width: 100%;
  background: #9a9a9a40;
  height: calc(100% - 5px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  border-radius: 0 0 32px 32px;
  box-shadow: 0px 2px 5px 3px rgba(0, 0, 0, 0.15);
`;

function App() {
  return (
    <Container>
      <Bar>
        <RightSection />
        <Workspaces />
        <RightSection />
      </Bar>
    </Container>
  );
}

export default App;
