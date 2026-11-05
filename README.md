# UGA Garage Door Repair LLC website

A standalone website built with HTML, CSS, and plain JavaScript. No React, Angular, package installation, build step, or API key is required.

## Files

- `index.html`: page content, contact information, form, and photo viewer.
- `styles.css`: colors, typography, layout, mobile styles, and dialogs.
- `script.js`: service cards, estimate summary, SMS link, clipboard, and gallery.
- `assets/`: seven retouched project photos. No original-photo files are included.

## Open the website

1. Extract this ZIP and keep the folder structure intact.
2. Open `index.html` in a modern web browser for a quick preview.
3. For a local web preview, open a terminal in this folder and run:

```sh
python3 -m http.server 8000
```

On Windows, use `py -m http.server 8000` if needed. Open `http://localhost:8000`.
Clipboard features may require localhost or HTTPS.

## Publish

Upload `index.html`, `styles.css`, `script.js`, and the entire `assets` directory to a static website host. Keep `index.html` at the host's web root. No server-side application is needed. The README does not need to be uploaded.

This export does not include ChatGPT's private access gate. A normal static deployment will be accessible according to the hosting provider's access settings.

## Change the content

- Edit business copy, hours, address, and contact details in `index.html`.
- Edit service descriptions, form prompts, gallery captions, and SMS destination in `script.js`.
- Edit colors and layout in `styles.css`.
- Replace photos in `assets` and update their references if filenames change.
- If changing the phone number, update every `tel:` and `sms:` link in `index.html` and the destination in `script.js`.

## Current business details

- Phone: +1 (240) 437-7571
- Address: 11713 Woodcreek Dr S, Huntley, IL 60142, United States
- Hours: 8:00 AM–6:00 PM. Working days have not been specified.
- Service area: Across the Midwest. Call to confirm availability in your town.

## Estimate requests

Selecting a service opens the form with that service selected. The form creates a reviewable summary in the browser. The customer then chooses “Open text message” to open their device's messaging application and manually send the request to UGA. SMS support and prefilled-message behavior depend on the device and messaging app. Copying the summary and calling are fallback options.

The form does not automatically send an email, store a lead, confirm a booking, or calculate a binding price. Automatic lead delivery or storage requires an additional backend or form service.

## Photos and export notes

The seven supplied project photos were retouched for presentation. The visible house-number plaque was removed from the black-door photo. The gallery contains no AI captions or links to original photos. The business address in the contact section remains displayed.

The private-preview notice from the hosted review version has been replaced with a normal location and phone banner for this standalone export. Other site behavior is preserved. Hosting-specific configuration, Git history, and credentials are excluded.
