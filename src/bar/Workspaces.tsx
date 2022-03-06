import { invoke } from "@tauri-apps/api/tauri";
import {
  PhysicalPosition,
  PhysicalSize,
  primaryMonitor,
  WebviewWindow,
} from "@tauri-apps/api/window";
import styled from "styled-components";

const WorkspaceTitle = styled.div`
  transition: color 300ms ease;
  font-family: "Montserrat Regular";
  font-size: 18px;
  color: #ffffffbf;
  text-align: center;
  user-select: none;
  cursor: pointer;

  :hover {
    color: #ffffff;
  }
`;

const openWorkspaceDropdown = async () => {
  const monitor = (await primaryMonitor())!;

  const dropdown = WebviewWindow.getByLabel("workspacesMenu")!;

  // invoke("adjust_window", { label: "workspacesMenu" });

  dropdown.show();

  dropdown.setSize(new PhysicalSize(400, 400));
  dropdown.setResizable(false);

  dropdown.setPosition(
    new PhysicalPosition(
      monitor.position.x + monitor.size.width / 2 - 150,
      monitor.position.y + 48
    )
  );
};

export const Workspaces: React.FC = ({}) => {
  invoke("i3", {
    command: "GET_CURRENT_WORKSPACE",
  }).then(console.log);

  return (
    <WorkspaceTitle onClick={openWorkspaceDropdown}>Terminals</WorkspaceTitle>
  );
};
