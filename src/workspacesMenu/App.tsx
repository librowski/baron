import { invoke } from "@tauri-apps/api";
import { WebviewWindow } from "@tauri-apps/api/window";
import { ComponentProps } from "react";
import styled, { keyframes } from "styled-components";
import { DropdownList } from "../components/DropdownList";

const appear = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  animation: ${appear} 300ms ease;
  position: relative;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  user-select: none;
`;

const onSelectWorkspace = (workspace: number) => () =>
  invoke("i3", {
    command: "FOCUS_WORKSPACE",
    workspaceName: workspace.toString(),
  });

const options: ComponentProps<typeof DropdownList>["options"] = [
  { label: "Web", onClick: onSelectWorkspace(1) },
  { label: "Editor", onClick: onSelectWorkspace(2) },
  { label: "Terminal", onClick: onSelectWorkspace(3) },
  { label: "Debug", onClick: onSelectWorkspace(4) },
  { label: "Comms", onClick: onSelectWorkspace(5) },
];

function App() {
  return (
    <Container
      onMouseLeave={() => {
        WebviewWindow.getByLabel("workspacesMenu")!.hide();
      }}
      onClick={() => {
        WebviewWindow.getByLabel("workspacesMenu")!.hide();
      }}
    >
      <DropdownList options={options} />
    </Container>
  );
}

export default App;
