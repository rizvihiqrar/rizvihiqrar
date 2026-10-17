# Iqrar Rizvi

**QA Automation Engineer** · Playwright · TypeScript · CI/CD

I build automated tests that catch software bugs before customers do, and I set up the pipelines that run those tests every time code changes. I'm based in the Greater Toronto Area and open to hybrid or remote roles across Canada.

---

## Start here: what the projects do

| Project | In plain English | Checks |
|---|---|---|
| [**qa-automation-platform**](https://github.com/rizvihiqrar/qa-automation-platform) | My main project: 24 testing tools and test suites in one place, all run automatically on every change and every night, with a [live CI dashboard](https://rizvihiqrar.github.io/qa-automation-platform/). Includes an AI tool that writes tests and checks its own output, performance tests that found a real slowdown, and an API contract checker that found two real bugs. | ~650 |
| [cicd-pipeline-demo](https://github.com/rizvihiqrar/cicd-pipeline-demo) | A small API with a full delivery pipeline: code checks, unit tests, integration tests, and a deployment step that needs approval. | 56 |
| [accessibility-test-suite](https://github.com/rizvihiqrar/accessibility-test-suite) | Checks web pages against accessibility rules, so people who use screen readers or only a keyboard can use the site. | 14 |
| [playwright-demo-suite](https://github.com/rizvihiqrar/playwright-demo-suite) | Runs a real web app through its main flows: logging in, the shopping cart, and checkout. | 16 |
| [api-test-suite](https://github.com/rizvihiqrar/api-test-suite) | Tests the back-end services apps depend on: logging in, creating and changing data, and handling errors. | 13 |

Each project has its own README with a short summary, how to run it, and the results.

---

## What I do, in short

- **Automated testing** of web apps and APIs, so releases get checked the same way every time.
- **CI/CD pipelines** that run tests on every change and block a release when something breaks (GitHub Actions and Azure DevOps).
- **Accessibility checks** against WCAG rules, so problems are caught during development, not after launch, including audits against the standard Ontario's AODA requires.
- **Performance testing** with k6: load and spike tests with pass/fail limits. One found that each login froze every other request for about 70 ms; after the fix, page loads went from 67 ms to 1 ms at the 95th percentile.
- **Release gates** that read test, contract and performance results and block a deployment with a clear reason when something fails.
- **Data checks in SQL** that find records that don't add up (wrong totals, duplicate customers, payments that don't match) and list the exact rows.
- **API contract checks** that compare a live API with its documentation and catch wrong types, missing fields, and leaked data.
- **Clear bug reports and exploratory testing:** checking that bug reports can be acted on, and running timeboxed exploratory sessions with a team debrief.
- **AI-assisted test writing:** using AI to draft tests from written requirements, then reviewing and fixing the output. In a 10-feature trial, 42 of 43 AI-drafted tests passed on the first run; the one that failed became a new rule for the generator.

In my current role, I took a week-long manual regression process and turned it into an automated run of 1 to 3 hours.

---

## What I'm building next

I'm adding one module a day to the platform, each through its own pull request with tests and green CI. The full plan is in the [roadmap](https://github.com/rizvihiqrar/qa-automation-platform/blob/main/ROADMAP.md).

Recently finished: moving the platform to TypeScript. Nine packages are now strict TypeScript, and every package with code is type-checked in CI. The stricter checks found real bugs along the way: an API that let two order lines oversell a product, an update route that skipped validation, a test assertion that could never fail, and a Windows-only bug that made a SQL tool reject every check.

Also done: the 43 AI-written browser tests that passed review now run as a regression suite split across 3 machines in CI, with a check that proves no test was lost or run twice (a lost or doubled shard still shows green otherwise). I measured the trade-off too: 3 machines finish about 12 seconds sooner but use twice the machine time, so the smaller suites stay on one.

Also done: flaky-test tracking. After every CI run, a workflow reads the last 14 runs of results and keeps one GitHub issue per flaky test. It opens the issue with links to the runs where the test needed a retry and closes it once the test has passed cleanly at least 5 times. Tests that fail every time are reported as broken, not flaky.

Also done: pull requests now run only the quick smoke tests (16 of 65 browser tests), and the full suite runs on main and every night. A pull request that changes a suite still runs that suite in full, so a test can't merge without running. Along the way I found that Cucumber passes when a tag matches no tests, so a typo could make a smoke run test nothing; it now fails instead.

Also done: the latest [test reports](https://rizvihiqrar.github.io/qa-automation-platform/reports/) are published after every run, next to the dashboard. Before anything goes public it's scanned for secrets, which caught live access tokens in one report on the first try; they're now removed automatically. The platform's README also has a plain-English introduction and updated architecture diagrams for readers who don't write code.

Up next: wrapping up the 30-day plan with a retrospective and a v1.0 release.

---

## Tools I use

**Testing:** Playwright, TypeScript, JavaScript, Jest, Postman, axe-core
**Pipelines:** GitHub Actions, Azure DevOps, GitLab CI
**Other:** Node.js, REST APIs, SQL, Jira, Git

---

## Contact

- LinkedIn: [linkedin.com/in/iqrar-rizvi](https://www.linkedin.com/in/iqrar-rizvi)
- Open to messages here on GitHub or on LinkedIn
