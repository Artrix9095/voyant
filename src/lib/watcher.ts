import { invoke } from '@tauri-apps/api/tauri';
import { Command } from '@tauri-apps/api/shell';
import { BaseDirectory, writeFile } from '@tauri-apps/api/fs';
import * as os from '@tauri-apps/api/os';

let previousApps: string[] = [];

interface AppDetails {
    name: string;
    favicon: string | null;
    rootFolder: string | null;
}

interface AppStatus {
    opened: AppDetails[];
    closed: string[];
}

const systemProcesses = {
    win32: ['System', 'Registry', 'smss.exe'],
    darwin: ['launchd', 'kernel_task'],
    linux: ['systemd', 'kthreadd'],
};

// Function to get favicons and root folders
async function getAppDetails(appName: string): Promise<AppDetails> {
    // Placeholder: Implement logic to retrieve favicon and root folder
    // This could involve platform-specific APIs or heuristics
    return {
        name: appName,
        favicon: null,
        rootFolder: null,
    };
}

// Function to get the list of running applications
async function getRunningApplications(): Promise<string[]> {
    return await invoke('get_running_applications');
}

// Function to write the application status to a JSON file
async function writeStatusToFile(status: AppStatus) {
    const filePath = 'application_status.json';
    await writeFile(filePath, JSON.stringify(status, null, 2), {
        dir: BaseDirectory.AppData,
    });
}

// Function to check for changes in running applications
async function checkApplications() {
    const platform = (await os.platform()) as 'win32' | 'darwin' | 'linux';

    const currentApps = (await getRunningApplications()).filter(
        (app) => !systemProcesses[platform].includes(app),
    );
    const openedApps = currentApps.filter((app) => !previousApps.includes(app));
    const closedApps = previousApps.filter((app) => !currentApps.includes(app));

    const openedAppDetails: AppDetails[] = [];
    for (const app of openedApps) {
        const details = await getAppDetails(app);
        openedAppDetails.push(details);
        console.log(`Opened: ${details.name}`, details);
    }

    for (const app of closedApps) {
        console.log(`Closed: ${app}`);
    }

    if (openedApps.length > 0 || closedApps.length > 0) {
        const status: AppStatus = {
            opened: openedAppDetails,
            closed: closedApps,
        };
        await writeStatusToFile(status);
    }

    previousApps = currentApps;
}

// Initialize the previousApps list and start the interval
async function init() {
    const platform = (await os.platform()) as 'win32' | 'darwin' | 'linux';
    const initialApps = (await getRunningApplications()).filter(
        (app) => !systemProcesses[platform].includes(app),
    );
    previousApps = initialApps;
    setInterval(checkApplications, 5000);
}

init();
