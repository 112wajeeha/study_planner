# AI Prompt Log — Study Planner

This log documents how AI (Claude) was used throughout the development of this Study Planner app, for the Week 3 "React App Development with AI" assignment. AI was used as a step-by-step mentor: it explained concepts and provided code for one feature at a time, which was then implemented, tested in the browser, and confirmed before moving on — rather than generating the full app at once.

---

## Step 0: Architecture & Planning

**Prompt:** Asked AI to explain the overall application architecture, component responsibilities, state organization, React concepts needed, and a step-by-step build plan — explicitly instructing it *not* to generate the full app yet.

**AI provided:** A component tree (Header, Dashboard/StatCard, TaskForm, SearchBar, FilterButtons, TaskList/TaskCard), an explanation of "lifting state up," a state table, a props-flow map, a localStorage strategy, a suggested folder structure, and a 13-step build plan.

**Outcome:** Used this as the roadmap for the rest of development. Understood upfront that `App.jsx` would own all task state and pass data/functions down via props.

---

## Step 1: Project Setup

**Prompt:** Asked for exact commands to scaffold a Vite + React + JavaScript project (no TypeScript, no backend), and how to clean the default starter template to a blank foundation.

**AI provided:** `npm create vite@latest`, `npm install`, `npm run dev`, plus a list of default files to keep/remove/modify.

**What I did differently / learned:** The Vite version installed (v8) used a newer starter template than AI initially expected (hero image + icon sprite sheet instead of the classic logo/counter demo). Had to identify and delete extra files (`hero.png`, `icons.svg`) not in the original instructions, and debug a `New-Item`/`rm` command that got concatenated incorrectly in PowerShell. Learned to run one terminal command at a time and to use a separate terminal tab from the one running the dev server.

---

## Step 2: Static Layout Shell

**Prompt:** Asked to build the initial component structure starting with a Header.

**AI provided:** `Header.jsx` and updated `App.jsx` to render it — pure static composition, no state/props logic yet.

**Outcome:** Understood how one component renders another via JSX tags (`<Header />`), and how `App.jsx` acts as the top-level parent.

---

## Step 3: Hardcoded Task List

**Prompt:** Asked to build `TaskList`/`TaskCard` using fake hardcoded data before introducing state.

**AI provided:** `TaskCard.jsx` (displays one task via props) and `TaskList.jsx` (maps an array to `TaskCard`s using `.map()` and `key`).

**What I changed:** Replaced AI's placeholder sample tasks with my own real subjects/assignments.

**Outcome:** Learned props destructuring, the `.map()` + `key` list-rendering pattern, and one-directional data flow (App → TaskList → TaskCard) before adding any complexity from state.

---

## Step 4: Add Tasks (useState)

**Prompt:** Asked to convert the hardcoded array into real state and build a form to add new tasks.

**AI provided:** `useState` in `App.jsx`, a controlled `TaskForm.jsx` with local state per input field, and the "callback prop" pattern (`onAddTask`) for child-to-parent communication.

**Outcome:** Learned controlled components, the "lifting state up" pattern, and why state updates must create new arrays (`setTasks([...tasks, newTask])`) rather than mutating in place.

---

## Step 5: localStorage Persistence

**Prompt:** Asked how to make tasks survive a page refresh.

**AI provided:** A `utils/localStorage.js` helper module (`loadTasks`/`saveTasks`), a lazy `useState` initializer to load saved data on first render, and a `useEffect` with a `[tasks]` dependency to auto-save on every change.

**What I did:** Verified persistence by checking DevTools → Application → Local Storage, confirming a `studyPlannerTasks` key updated live, and confirmed tasks survived a real browser refresh (not just hot-reload).

**Outcome:** Learned the difference between hot-reload (dev-server refresh) and a real browser refresh for testing persistence, and how `useEffect`'s dependency array controls when a side effect re-runs.

---

## Step 6: Delete Tasks

**Prompt:** Asked to add task deletion.

**AI provided:** A delete button in `TaskCard.jsx` calling an `onDeleteTask` callback, threaded through `TaskList.jsx`, handled in `App.jsx` via `Array.filter()`.

**Debugging encountered:** After an edit, `App.jsx` briefly lost its imports and `initialTasks` definition (a merge mistake when only a partial code snippet was applied), causing a blank page. Diagnosed via browser console + Vite terminal error output, then requested the **full file** from AI instead of partial snippets to fix it safely.

**Outcome:** Learned `Array.filter()` for immutable removal, and the practical lesson that partial code snippets need to be merged carefully — asking for a complete file avoids accidental breakage.

---

## Step 7: Mark Tasks Complete

**Prompt:** Asked to add a way to toggle a task's completed status.

**AI provided:** A controlled checkbox in `TaskCard.jsx`, an `onToggleComplete` callback, and `Array.map()` + spread operator (`{ ...task, completed: !task.completed }`) in `App.jsx` for an immutable single-item update.

**Outcome:** Learned the difference between `.filter()` (removing items) and `.map()` (transforming items) for different types of state updates, and the spread operator for shallow-copying objects.

---

## Step 8: Edit Tasks

**Prompt:** Asked to add task editing, reusing the existing form rather than building a separate one.

**AI provided:** An `editingTask` state in `App.jsx`, a `useEffect` in `TaskForm.jsx` that syncs form fields whenever `editingTask` changes, and conditional submit logic (`onAddTask` vs `onUpdateTask`) plus a dynamic button label and a Cancel option.

**Outcome:** This was the most complex step — learned how the same component can serve two purposes (add/edit) based on a prop, and how `useEffect` can sync local form state to an external prop rather than just handling side effects like storage.

---

## Step 9: Search

**Prompt:** Asked to add search by title/subject.

**AI provided:** A controlled `SearchBar.jsx`, `searchText` state in `App.jsx`, and a **derived** `filteredTasks` variable (computed with `.filter()` on every render, not stored as its own state).

**Outcome:** Understood the "derived state" principle — avoiding a second piece of state that could get out of sync with `tasks`.

---

## Step 10: Filter Buttons

**Prompt:** Asked to add All/Pending/Completed/High Priority filtering, combinable with search.

**AI provided:** `FilterButtons.jsx` and an extended `filteredTasks` calculation combining `matchesSearch && matchesFilter` conditions.

**Outcome:** Learned how to combine multiple filter conditions in one derived array rather than chaining separate filters.

---

## Step 11: Dashboard Stats

**Prompt:** Asked to add dashboard statistics.

**AI provided:** `StatCard.jsx` (generic, reusable) and `Dashboard.jsx`, computing total/completed/pending/high-priority counts from the **full** `tasks` array (not the filtered view), using `.filter().length` and simple subtraction.

**Outcome:** Reinforced the derived-value pattern, and learned to deliberately choose which array (`tasks` vs `filteredTasks`) a component should receive based on its purpose.

---

## Step 12: Styling

**Prompt:** Asked for a colorful/playful visual style with a sidebar layout for filters/dashboard, after being asked to choose a direction.

**AI provided:** A single `index.css` using CSS Grid with named `grid-template-areas` to arrange existing component classes into a sidebar + main layout, plus a CSS custom-property color palette.

**What I changed:** Iteratively requested fixes after visual review — search bar wasn't full-width (fixed via `display: block; width: 100%`), header wasn ot centered (fixed via `text-align: center` on `.header`), changed the subtitle text and color, and changed the header emoji.

**Outcome:** Learned CSS Grid template areas for layout without touching JSX, and CSS custom properties (`:root` variables) for maintaining a consistent theme.

---

## Step 13: Empty State Polish

**Prompt:** Asked to handle the case where search/filter results in zero tasks.

**AI provided:** An early-return conditional render in `TaskList.jsx` (`if (tasks.length === 0) return (...)`) showing a friendly message, styled with a new `.task-list-empty` CSS class.

**Outcome:** Learned the early-return conditional rendering pattern as a clean alternative to nested ternaries in JSX.

---

## Manual Improvements, Corrections & Refactoring

Collected here for clarity (also noted inline within each step above):

1. **Personalized sample data (Step 3).** Replaced AI's generic placeholder tasks (e.g. "Biology," "Mathematics") with my own real subjects and assignments, while keeping the object structure (`id`, `title`, `subject`, `dueDate`, `priority`, `completed`) AI specified, since other components depended on those exact field names.

2. **Diagnosed and fixed a broken `App.jsx` after a bad partial edit (Step 6).** When AI gave a partial code snippet ("only the parts that changed are shown") instead of the full file, my copy-paste left `App.jsx` missing its imports and the `initialTasks` array, causing a blank white page. I diagnosed this myself using the browser console and the Vite terminal's error output (which named the exact missing import), rather than assuming AI's code was simply wrong. I then explicitly asked AI for the complete file going forward whenever a partial edit was ambiguous, to prevent this recurring.

3. **Corrected a terminal command error during setup (Step 1).** Two `rm` commands were accidentally run without a line break between them (`rm src/assets/hero.pngrm src/assets/react.svg`), which silently failed. I caught this by re-running `ls` to verify the files were actually deleted rather than assuming the command worked, and re-ran the commands one at a time.

4. **Adjusted AI's default CSS after visual review (Step 12).** After applying AI's first styling pass, I identified two concrete visual bugs through my own inspection of the running app: the search bar was rendering at browser-default width instead of stretching full-width, and the header text was left-aligned instead of centered within its grid area. I reported these specifically rather than accepting the styling as-is, and AI corrected them with `width: 100%` / `display: block` on `.search-bar` and `text-align: center` on `.header`.

5. **Customized header branding beyond AI's default (Step 12).** Changed the header subtitle text and its color, and swapped the default emoji, to match my own preferred look rather than keeping AI's first suggestion.

6. **Requested and reviewed an empty state as a polish item, not a core requirement (Step 13).** After confirming all 9 required features worked, I identified that empty search/filter results showed a blank gap with no feedback, and asked for that specifically to be fixed as a UX improvement beyond the minimum assignment scope.

---

## Reflection

AI was most useful for explaining *why* a pattern works (e.g. immutability with `.map()`/`.filter()`/spread, derived state vs. duplicated state, controlled components) rather than just producing code — this made it possible to actually understand and later modify the code confidently. AI was also useful for fast debugging by reading error messages and terminal/console output.

Things I had to do myself: running and testing every step in the actual browser, catching a broken file after a bad merge, customizing content (subjects, colors, header text) to match my own preferences, and making judgment calls on when something "looked right" versus when it needed another pass.

The main React concepts learned through this process: `useState`, `useEffect` (both for persistence and for syncing form state to props), controlled components, lifting state up via callback props, derived/computed values, immutable state updates (`.map()`, `.filter()`, spread operator), conditional rendering, and list rendering with `.map()`/`key`.