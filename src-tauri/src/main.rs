#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::Manager;
use gtk::prelude::*;
use std::process::Command;

#[tauri::command]
fn exec(command: String) {
    println!("calling: {}", command);

    Command::new(command).status().expect("Failed to execute");
}

fn main() {
  tauri::Builder::default()
    .setup(|app| {
        let main_window = app.get_window("main").unwrap();
        let gdk_window = main_window.gtk_window().unwrap().window().unwrap();
        gdk_window.hide();

        gdk_window.set_type_hint(gtk::gdk::WindowTypeHint::Dock);

        let monitor = main_window.primary_monitor().unwrap().unwrap();
        let size = monitor.size();
        let position = monitor.position();


        let bar_width = size.width;
        let bar_height = 80;

        let bar_x = position.x;
        let bar_y = position.y + (size.height as i32) - bar_height;

        gdk_window.move_resize(bar_x, bar_y, bar_width as i32, bar_height);

        gtk::gdk::property_change(
            &gdk_window,
            &gtk::gdk::Atom::intern("_NET_WM_STRUT"),
            &gtk::gdk::Atom::intern("CARDINAL"),
            32,
            gtk::gdk::PropMode::Replace,
            gtk::gdk::ChangeData::ULongs(&[0, 0, 0, bar_height as u64])
        );

        gdk_window.stick();

        gdk_window.show();

        Ok(())
    })
    .invoke_handler(tauri::generate_handler![exec])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
