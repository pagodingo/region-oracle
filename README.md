# region-oracle

A minimal Vercel project that reports how and where a serverless function is running. A static page calls an API route, and the function returns deployment details as JSON.

**Live demo:** [here.](https://region-oracle.vercel.app/))

## What it shows

- A static page and a Node.js serverless function deployed together on Vercel
- Reading deployment context at runtime: region, Node version, and request ID
- Configuring behavior through an environment variable instead of hard-coded values
- Using Vercel's function logs to confirm what ran and when

## How it works

`index.html` has one button. Clicking it requests `/api/diagnostics`, and the page renders the JSON response.

`api/diagnostics.js` is a Vercel serverless function that returns:

| Field | Source | Meaning |
| --- | --- | --- |
| `region` | `VERCEL_REGION` | The region the function executed in (`local` if the variable is not set) |
| `runtime` | `process.version` | The Node.js version running the function |
| `greeting` | `GREETING` env var | A configurable value, to show environment-based config |
| `requestId` | `x-vercel-id` header | An ID that ties the response to the request in Vercel's logs |
| `time` | `new Date()` | The server time in ISO 8601 |

### Example response

```json
{
  "region": "iad1",
  "runtime": "v24.21.0",
  "greeting": "The cloud has been consulted. It says meow.",
  "requestId": "iad1::qrznz-1792086516336-eaf82e89c069",
  "time": "2026-10-15T17:48:36.999Z"
}
```

## Project structure

```
.
├── index.html
└── api
    └── diagnostics.js
```

## Deploy

1. Fork or clone this repository.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Under **Environment Variables**, add `GREETING` with any value.
4. Deploy, open the live URL, and click the button.

If `GREETING` is not set, the response says so, which makes a missing variable easy to spot.

## Run locally

```bash
npm i -g vercel
vercel dev
```

## Debugging notes

- **Response shows the wrong or missing greeting:** check that `GREETING` is set for the right environment (Production, Preview, or Development) in the project settings, then redeploy. Environment variable changes apply to new deployments.
- **Tracing a request:** copy the `requestId` from the response and search for it in the project's logs in the Vercel dashboard.
- **404 on `/api/diagnostics`:** confirm the file lives at `api/diagnostics.js` in the repository root.

## License

MIT
