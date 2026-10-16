# Iqrar Rizvi

**QA Automation Engineer** · Playwright · TypeScript · CI/CD

I build automated tests that catch software bugs before customers do, and I set up the pipelines that run those tests every time code changes. I'm based in the Greater Toronto Area and open to hybrid or remote roles across Canada.

---

## Start here: what the projects do

| Project | In plain English | Checks |
|---|---|---|
| [**qa-automation-platform**](https://github.com/rizvihiqrar/qa-automation-platform) | My main project: 20 testing tools and test suites in one place, all run automatically on every change and every night. Includes an AI tool that writes tests and checks its own output, SQL checks for bad data, and an API contract checker that found and fixed two real bugs on its first run. | ~550 |
| [cicd-pipeline-demo](https://github.com/rizvihiqrar/cicd-pipeline-demo) | A small API with a full delivery pipeline: code checks, unit tests, integration tests, and a deployment step that needs approval. | 56 |
| [accessibility-test-suite](https://github.com/rizvihiqrar/accessibility-test-suite) | Checks web pages against accessibility rules, so people who use screen readers or only a keyboard can use the site. | 14 |
| [playwright-demo-suite](https://github.com/rizvihiqrar/playwright-demo-suite) | Runs a real web app through its main flows: logging in, the shopping cart, and checkout. | 16 |
| [api-test-suite](https://github.com/rizvihiqrar/api-test-suite) | Tests the back-end services apps depend on: logging in, creating and changing data, and handling errors. | 13 |

Each project has its own README with a short summary, how to run it, and the results.

---

## What I do, in short

- **Automated testing** of web apps and APIs, so releases get checked the same way every time.
- **CI/CD pipelines** that run tests on every change and block a release when something breaks (GitHub Actions and Azure DevOps).
- **Accessibility checks** against WCAG rules, so problems are caught during development, not after launch.
- **Data checks in SQL** that find records that don't add up (wrong totals, duplicate customers, payments that don't match) and list the exact rows.
- **API contract checks** that compare a live API with its documentation and catch wrong types, missing fields, and leaked data.
- **Clear bug reports and exploratory testing:** checking that bug reports can be acted on, and running timeboxed exploratory sessions with a team debrief.
- **AI-assisted test writing:** using AI to draft tests from written requirements, then reviewing and fixing the output. In a 10-feature trial, 42 of 43 AI-drafted tests passed on the first run; the one that failed became a new rule for the generator.

In my current role, I took a week-long manual regression process and turned it into an automated run of 1 to 3 hours.

---

## What I'm building next

I'm adding one module a day to the platform, each through its own pull request with tests and green CI. The full plan is in the [roadmap](https://github.com/rizvihiqrar/qa-automation-platform/blob/main/ROADMAP.md).

Recently added: a defect report checker, a webhook test harness, log error grouping, an API contract checker, and an exploratory testing tracker.

Up next:
- **Performance tests:** load, spike and soak tests with pass/fail thresholds.
- **Release gate:** blocks a deployment when smoke tests fail and posts a summary.
- **Accessibility report:** WCAG checks on a full app, with a findings report framed around Ontario's AODA.

---

## Tools I use

**Testing:** Playwright, TypeScript, JavaScript, Jest, Postman, axe-core
**Pipelines:** GitHub Actions, Azure DevOps, GitLab CI
**Other:** Node.js, REST APIs, SQL, Jira, Git

---

## Contact

- LinkedIn: [linkedin.com/in/iqrar-rizvi](https://www.linkedin.com/in/iqrar-rizvi)
- Open to messages here on GitHub or on LinkedIn
