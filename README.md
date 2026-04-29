# WebApplication1

This repo contains:

- `WebApplication1/`: an ASP.NET Core Razor Pages app (requires a server)
- `WebApplication1/docs/`: a **static export** you can deploy to **GitHub Pages**

## Deploy to GitHub Pages (static)

1. Push this project to GitHub.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**:
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/docs`
4. Save, then wait for Pages to publish.

Your site will be available at `https://<username>.github.io/<repo>/`.

## Flowise chatbot after deployment

GitHub Pages is static hosting. Your chatbot can still work **only if**:

- Your Flowise endpoint is reachable on the public internet
- CORS is enabled to allow requests from your GitHub Pages domain
- Your Flowise chatflow does **not** require a secret API key from the browser

If your Flowise setup requires a secret/API key, do **not** put it in JavaScript. Use a backend proxy (hosted separately, e.g. Render/Railway/Azure) to keep secrets safe.

In the static site, open the **Chatbot** section and enter:

- `topK`
- `googleGenerativeAPIKey`
- `modelName`
- `tasktype`

## Run the ASP.NET app locally

From `WebApplication1/WebApplication1/`:

```powershell
dotnet run
```

