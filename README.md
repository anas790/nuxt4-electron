# Nuxt 4 + Electron Template

A modern template for building cross-platform desktop applications using Nuxt 4 and Electron.

## 🚀 Features

- **Nuxt 4** - The latest version of the intuitive Vue framework
- **Electron** - Build native desktop applications with web technologies
- **TypeScript** - Full TypeScript support with Nuxt's auto-generated type definitions
- **ESLint** - Code linting configured with `@nuxt/eslint`
- **Hot Module Replacement** - Fast development with instant updates
- **Electron Builder** - Package your app for macOS, Windows, and Linux
- **Concurrent Development** - Run Nuxt dev server and Electron simultaneously

## 📋 Prerequisites

- **Node.js** (v18 or higher recommended)
- **pnpm** (v10.12.1+ as specified in package.json)

### Installing pnpm

If you don't have pnpm installed:

```bash
npm install -g pnpm
```

## 🛠️ Installation

1. Clone or download this template
2. Install dependencies:

```bash
pnpm install
```

## 🏃 Development

Start the development environment:

```bash
pnpm dev
```

This command will:
1. Start the Nuxt development server on port `6981` (default)
2. Wait for the server to be ready
3. Launch Electron and connect it to the dev server

### Custom Port Configuration

You can customize the development port by creating a `.env` file in the root directory:

```env
DEV_PORT=3000
```

The dev script will automatically read this value and use it for both Nuxt and Electron.

## 📦 Building

### Build Nuxt Application

Build the Nuxt application for production:

```bash
pnpm nuxt:build
```

This generates the static output in `.output/` directory.

### Build Electron Application

Build the Electron application for distribution:

```bash
pnpm electron:build
```

This will create distributable packages in the `dist/` directory. For macOS, it creates both DMG and ZIP files.

### Build Both

Build both Nuxt and Electron in one command:

```bash
pnpm build
```

## 📁 Project Structure

```
.
├── app/                    # Nuxt application directory
│   └── app.vue            # Root component
├── electron/               # Electron main process files
│   ├── main.cjs           # Main Electron process
│   └── preload.cjs        # Preload script (exposes APIs to renderer)
├── scripts/                # Utility scripts
│   └── dev.js             # Development script runner
├── public/                 # Static assets
├── nuxt.config.ts         # Nuxt configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies and scripts
```

## ⚙️ Configuration

### Nuxt Configuration

The Nuxt configuration is in `nuxt.config.ts`:

- **Dev Server Port**: `6981` (configurable via `.env`)
- **ESLint Module**: Enabled via `@nuxt/eslint`
- **DevTools**: Disabled by default

### Electron Configuration

Electron builder configuration is in `package.json` under the `build` key:

- **App ID**: `com.smart-assist.app`
- **Product Name**: `Smart Assist`
- **macOS**: Configured for DMG and ZIP distribution with hardened runtime

### Electron Main Process

The main Electron process (`electron/main.cjs`):
- Creates a browser window (1200x800)
- Loads the Nuxt dev server in development mode
- Loads the built static files in production mode
- Handles window lifecycle events

### Preload Script

The preload script (`electron/preload.cjs`) exposes a safe API to the renderer process:

```javascript
window.api.ping() // Returns "pong"
```

You can extend this to expose more Electron APIs securely.

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development environment (Nuxt + Electron) |
| `pnpm nuxt:dev` | Start only Nuxt development server |
| `pnpm nuxt:build` | Build Nuxt application for production |
| `pnpm nuxt:generate` | Generate static site |
| `pnpm nuxt:preview` | Preview production build |
| `pnpm electron:dev` | Start Electron (requires Nuxt server running) |
| `pnpm electron:build` | Build Electron application |
| `pnpm build` | Build both Nuxt and Electron |

## 🔧 Development Workflow

1. **Development Mode**: Use `pnpm dev` to run both Nuxt and Electron together
2. **Hot Reload**: Changes to Vue/Nuxt files will automatically reload in Electron
3. **Electron Changes**: Changes to `electron/main.cjs` or `electron/preload.cjs` require restarting Electron

## 🎯 Next Steps

1. Customize the app name and metadata in `package.json`
2. Update `electron/main.cjs` to configure window behavior
3. Extend `electron/preload.cjs` to expose additional Electron APIs
4. Add your Nuxt pages, components, and layouts in the `app/` directory
5. Configure electron-builder for Windows and Linux builds if needed

## 📝 Notes

- The project uses **pnpm** as the package manager. Make sure to use `pnpm` commands, not `npm` or `yarn`.
- Electron is configured in the `pnpm.onlyBuiltDependencies` to ensure proper installation.
- The development script uses `concurrently` to run multiple processes simultaneously.
- In production builds, Electron loads static files from `.output/public/`.

## 🐛 Troubleshooting

### Port Already in Use

If port 6981 is already in use, create a `.env` file with a different port:

```env
DEV_PORT=3000
```

### Electron Not Starting

Make sure the Nuxt dev server is running before Electron tries to connect. The `wait-on` package handles this automatically in the dev script.

### Build Issues

If you encounter build issues:
1. Clear the `.output/` directory
2. Run `pnpm nuxt:postinstall` to regenerate Nuxt types
3. Rebuild with `pnpm build`

## 📄 License

This is a template project. Customize the license as needed for your application.
