# SKILLS.md

Reusable patterns and delegation guidance, written so an agent (or a
stranger) could apply them next time. Each entry under fifteen lines.
Load-on-demand: an agent reads the heading first and the body only when relevant.

## Pattern: fetch with the failure shown on the page
**When:** any call from [app.js](../app.js) to the Worker.
**

Do:** check `res.ok`; on failure, read `res.text()` and put it in the
status element with `textContent`; wrap the call in try/catch for network
errors; never throw to the console.


**Because:** localStorage never failed; the network does (ADR-002).

## Delegation guidance: what to paste, what to check first
**Paste, in order:** [PROJECT.md](PROJECT.md), [FEATURES.md](FEATURES.md) (rows marked), [STYLE.md](STYLE.md), [STANDARDS.md](STANDARDS.md), [TOOLS.md](TOOLS.md), then the current page files: [index.html](../index.html), [styles.css](../styles.css), and [app.js](../app.js). One instruction line naming the files it may touch.


**Check first:** the diff's file list, then innerHTML / concatenated SQL, then whether it used the tokens.


**Reliably wrong (this week):** bolt.new and AI Studio both defaulted to richer UI scaffolds and extra dependency drift; the fix is to constrain the task to the three app files and re-check the token list before accepting the output.

## Delegation guidance: one-line prompt pattern
**Paste:** [PROJECT.md](PROJECT.md), [FEATURES.md](FEATURES.md) (rows marked), [STYLE.md](STYLE.md), [STANDARDS.md](STANDARDS.md), [TOOLS.md](TOOLS.md), then the current page files: [index.html](../index.html), [styles.css](../styles.css), and [app.js](../app.js). One instruction line naming the files it may touch.


**Instruction line:** Build F-04 in [index.html](../index.html), [styles.css](../styles.css), and [app.js](../app.js) only; keep the Worker/D1 data flow and the existing directory unchanged.


**Check first:** file list, then `innerHTML` / concatenated SQL, then token use, then network calls and extra dependencies.


**Why:** the most common failure mode is a broadened scope or a hidden dependency, not a syntax error. 

## p5.js 2.3.4
Use: hosted, interactive explainer for the two illustrative F-04 areas.
Scores use the Module 3 Gate weights in [ARCHITECTURE.md](ARCHITECTURE.md), set before scoring; points = weight x score.
| Criterion | Wt. | Score | Points | Reason |
|---|---:|---:|---:|---|
| Cost to start | 4 | 5 | 20 | Free; browser editor and CDN |
| Cost to maintain | 3 | 4 | 12 | Static page; pinned CDN remains external |
| Time to working | 5 | 5 | 25 | Canvas and input primitives fit this small sketch |
| Inspectability | 5 | 5 | 25 | Short, readable source; no framework or data layer |
| Switching cost | 2 | 3 | 6 | p5 API is specific; content data is portable |
| Fit to spec | 4 | 5 | 20 | Interactive visual suits the intern model and F-04 |
| **Total** | **23** | | **108 / 115** | |
**Reuse:** keep copy in a data array and render every card through one function; selection then changes state without duplicating content.
