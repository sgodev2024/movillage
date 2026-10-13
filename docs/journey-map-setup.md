# Journey map configuration

The approved layout is implemented in `DirectionsSection`. Typography uses the existing site classes.

The repository currently has no admin backend for route coordinates. The section accepts a `points` prop (`JourneyPoint[]`) so a future admin response can supply names, descriptions and confirmed latitude/longitude. Until that integration exists, edit `data/journey.ts`. No guessed coordinates are included.

Set `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY` in `.env.local`, enable Maps Embed API and restrict the browser key to the permitted website referrers. Restart the development server after changing this setting.

When every visible point has valid coordinates and a key is configured, the section embeds a Google directions map with intermediate waypoints. Selecting a point switches to its place map; choosing a route resets that selection. Google determines the actual roads between configured waypoints. Scenic roads must be confirmed through waypoint selection.

Without a key or complete coordinates, the supplied illustrative map is explicitly labelled. The directions button opens the existing Mơ Maps link, and the consultation button opens the existing Zalo contact. Per-point directions are displayed only when the live map is configured.

Maps API reference: https://developers.google.com/maps/documentation/embed/embedding-map
