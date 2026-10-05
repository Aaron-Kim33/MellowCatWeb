# Portfolio media slots

Media configuration lives in `src/lib/portfolio-content.ts`, under `projectMedia`.
Both the home and project pages read this configuration. A `null` source displays
an honest preparation state without an active play button or broken image.

## Suggested files

Put reviewed assets in `public/media/` and enter their URL paths in the data:

| Slot | Example URL |
| --- | --- |
| Lumber Rush gameplay video | `/media/lumber-rush-gameplay.mp4` |
| Video poster | `/media/lumber-rush-poster.webp` |
| Personal forest screenshot | `/media/lumber-rush-personal.webp` |
| Shared forest screenshot | `/media/lumber-rush-community.webp` |
| Farm / expedition screenshot | `/media/lumber-rush-farm.webp` |
| Launcher workflow video | `/media/launcher-workflow.mp4` |
| Launcher source/script screen | `/media/launcher-sources.webp` |
| Launcher timeline screen | `/media/launcher-timeline.webp` |
| Launcher shortform screen | `/media/launcher-shortform.webp` |

Only populate paths after the corresponding files exist. These filenames are
examples, not files that are already present.

## Video

Lumber Rush currently uses the provided YouTube demo (`OJtHmIFAJ9s`). The player
loads from youtube-nocookie.com only after the visitor clicks play. No autoplay
or third-party thumbnail requests happen on initial page load. The supplied
44.7 MB MP4 is not bundled into the site. Deck, repository, and preview release
links are centralized in `lumberResources`. The release is labeled as a test
build, with an explicit optional Mainnet Memo fee notice.

Set `video.src` to an MP4 URL (H.264 is a broadly supported choice) and optionally
set `video.poster`. Playback uses native controls with no autoplay. Video bytes
are not preloaded. Add WebVTT caption URLs through `video.captions.ko` and
`video.captions.en` when footage contains speech. Keep text descriptions in both
languages. Supply a short, edited clip and avoid bundling large raw recordings.

## Screenshots

Lumber Rush now uses four supplied PNG captures: sapling farm, personal forest,
community forest, and world boss. Their originals are stored in `public/media/`.
The personal forest also appears in the home and project heroes. Gallery images
are lazy-loaded, uncropped, and linked to their originals for full-size viewing.

Set the corresponding `screenshots[].src`, then review its `title` and `caption`
in Korean and English. Portrait or landscape images are contained without cropping.
The home shows the gameplay video area; full screenshot galleries are on each
project page. The original game capture remains in the hero until replaced through
the project's `screenshot` field in `src/lib/portfolio.ts`.

Use actual footage from the build being described. Label progressed demo accounts
or edited sequences in captions where relevant. Review images for visible account
details, API keys, private messages, or other material not intended for publication.

## Review

Run `npm run build`, then `npm run preview -- --host 127.0.0.1 --port 4173`.
Check `/`, `/projects/lumber-rush`, and `/projects/mellowcat-launcher` in both
languages and on a narrow viewport. Video and gallery slots activate independently.
