#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::Manager;

fn main() {
  tauri::Builder::default()
    .setup(|app| {
        let main_window = app.get_window("main").unwrap();

            println!("---");
            print!("{:?}", main_window.gtk_window().unwrap());
            println!("---");

        Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
