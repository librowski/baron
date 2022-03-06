#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::Manager;
use gtk::prelude::*;
use std::process::Command;
extern crate i3ipc;
use i3ipc::I3Connection;

#[tauri::command]
fn exec(command: String) {
    println!("calling: {}", command);

    Command::new(command).status().expect("Failed to execute");
}

#[tauri::command]
fn i3(command: String, workspaceName: String) -> Result<String, ()> {
    let mut connection = I3Connection::connect().unwrap();

    match &command as &str {
        "GET_CURRENT_WORKSPACE" => {
            let result = connection.get_workspaces().unwrap().workspaces.into_iter().find(|workspace| workspace.focused);
            return Ok(result.unwrap().name);
        },
        "FOCUS_WORKSPACE" => {
            let focus_workspace = "workspace number ";
            connection.run_command(&(focus_workspace.to_owned() + &workspaceName.clone()));
            return Ok(workspaceName);
        },
        _ => Err(()),
    }
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
        let bar_height = 48;

        let bar_x = position.x;
        let bar_y = position.y;

        gdk_window.move_resize(bar_x, bar_y, bar_width as i32, bar_height);

        gtk::gdk::property_change(
            &gdk_window,
            &gtk::gdk::Atom::intern("_NET_WM_STRUT"),
            &gtk::gdk::Atom::intern("CARDINAL"),
            32,
            gtk::gdk::PropMode::Replace,
            gtk::gdk::ChangeData::ULongs(&[0, 0, bar_height as u64, 0])
        );

        gdk_window.stick();

        gdk_window.show();

        Ok(())
    })
    .invoke_handler(tauri::generate_handler![exec, i3])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
