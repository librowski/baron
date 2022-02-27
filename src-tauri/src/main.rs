#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::Manager;
use gtk::prelude::*;

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


        let bar_width = size.width as u64;
        let bar_height: u32 = 72;

        let bar_x = position.x;
        let bar_y = (position.y as i32) + (size.height as i32) - 72;

        gdk_window.move_resize(bar_x, bar_y, bar_width as i32, bar_height as i32);

        gtk::gdk::property_change(
            &gdk_window,
            &gtk::gdk::Atom::intern("_NET_WM_STRUT"),
            &gtk::gdk::Atom::intern("CARDINAL"),
            32,
            gtk::gdk::PropMode::Replace,
            gtk::gdk::ChangeData::ULongs(&[0, 0, 0, bar_height as u64])
        );

        gdk_window.show();

        /* gtk::gdk::property_change(
            &gdk_window,
            &gtk::gdk::Atom::intern("_NET_WM_STRUT_PARTIAL"),
            &gtk::gdk::Atom::intern("CARDINAL"),
            32,
            gtk::gdk::PropMode::Replace,
            gtk::gdk::ChangeData::ULongs(&[0, 0, bar_height as u64, 0, 0, 0, 0, 0, position.x as u64, (position.x as u64) + bar_width - 1, 0, 0])
        ); */

        gdk_window.stick();

        Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
