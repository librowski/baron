import { window } from "@tauri-apps/api";
import { LogicalPosition, LogicalSize, Monitor } from "@tauri-apps/api/window";

const BAR_SIZE = 72;

(async () => {
  const { position, size } = (await window.currentMonitor()) as Monitor;
  const currentWindow = window.appWindow;

  const barSize = new LogicalSize(size.width, BAR_SIZE);

  currentWindow.setAlwaysOnTop(true);
  currentWindow.setPosition(
    new LogicalPosition(0, position.y + size.height - BAR_SIZE)
  );
  currentWindow.setSize(barSize);
  currentWindow.setMinSize(barSize);
  currentWindow.setMaxSize(barSize);
})();
