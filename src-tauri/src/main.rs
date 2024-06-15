// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::process::Command;

#[tauri::command]
fn get_running_applications() -> Result<Vec<String>, String> {
    if cfg!(target_os = "windows") {
        let output = Command::new("tasklist")
            .output()
            .map_err(|e| e.to_string())?;
        let stdout = String::from_utf8_lossy(&output.stdout);
        let apps = stdout
            .split('\n')
            .skip(3)
            .map(|line| line.split_whitespace().next().unwrap_or("").to_string())
            .collect();
        Ok(apps)
    } else if cfg!(target_os = "macos") {
        let output = Command::new("osascript")
            .arg("-e")
            .arg("tell application \"System Events\" to get name of (every process whose background only is false)")
            .output()
            .map_err(|e| e.to_string())?;
        let stdout = String::from_utf8_lossy(&output.stdout);
        let apps = stdout.split(", ").map(|s| s.trim().to_string()).collect();
        Ok(apps)
    } else if cfg!(target_os = "linux") {
        let output = Command::new("ps")
            .arg("-e")
            .arg("--format")
            .arg("cmd")
            .output()
            .map_err(|e| e.to_string())?;
        let stdout = String::from_utf8_lossy(&output.stdout);
        let apps = stdout
            .split('\n')
            .skip(1)
            .map(|line| line.split_whitespace().next().unwrap_or("").to_string())
            .collect();
        Ok(apps)
    } else {
        Err("Unsupported OS".to_string())
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![get_running_applications])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
