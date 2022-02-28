import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faChrome,
  faSlack,
  faSpotify,
  faTelegram,
  faTelegramPlane,
} from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import { Icon } from "./Icon";

// With the Tauri API npm package:
import { invoke } from "@tauri-apps/api/tauri";
import { faBolt, faCode } from "@fortawesome/free-solid-svg-icons";
const exec = (command: string) => invoke("exec", { command });

const Container = styled.div`
  width: 100vh;
  height: 100vh;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const Bar = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const icons: [IconDefinition, () => void][] = [
  [faBolt, () => exec("ulauncher-toggle")],
  [faChrome, () => exec("google-chrome-stable")],
  [faCode, () => exec("kitty")],
  [faSpotify, () => exec("spotify")],
  [faSlack, () => exec("slack")],
  [faTelegramPlane, () => exec("telegram-desktop")],
];

function App() {
  return (
    <Container>
      <Bar>
        {icons.map(([icon, onClick]) => (
          <Icon icon={icon} onClick={onClick} />
        ))}
      </Bar>
    </Container>
  );
}

export default App;
