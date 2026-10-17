# Iqrar Rizvi

**QA Automation Engineer** · Playwright · TypeScript · CI/CD

I build automated tests that catch software bugs before customers do, and I set up the pipelines that run those tests every time code changes. I'm based in the Greater Toronto Area and open to hybrid or remote roles across Canada.

---

## Start here: what the projects do

| Project | In plain English | Checks |
|---|---|---|
| [**qa-automation-platform**](https://github.com/rizvihiqrar/qa-automation-platform) | My main project: 24 testing tools and test suites in one place, all run automatically on every change and every night, with a [live CI dashboard](https://rizvihiqrar.github.io/qa-automation-platform/). Includes an AI tool that writes tests and checks its own output, performance tests that found a real slowdown, and an API contract checker that found two real bugs. | ~790 |
| [cicd-pipeline-demo](https://github.com/rizvihiqrar/cicd-pipeline-demo) | A small API with the same delivery pipeline on GitHub Actions, GitLab CI and Azure DevOps: code checks, unit tests, integration tests, and a deployment step that needs approval. | 56 |

Each project has its own README with a short summary, how to run it, and the results. Three earlier suites ([accessibility](https://github.com/rizvihiqrar/accessibility-test-suite), [Playwright end-to-end](https://github.com/rizvihiqrar/playwright-demo-suite), [API](https://github.com/rizvihiqrar/api-test-suite)) are archived; their work continues, in more depth, inside the main project.

### Two results in numbers

- **A performance bug found by load testing:** browsing slowed to 67–84 ms (p95) whenever users logged in, because password hashing blocked the server. After moving the hashing off the main thread, p95 dropped to 1 ms and logins went from 72 to 40 ms. ([details](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/packages/k6-performance))
- **AI-written tests, reviewed before they count:** 10 of 10 generated test specs passed an automated review and 42 of 43 tests passed on their first run. The review caught a test with no assertion that the test runner reported as passing. ([details](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/packages/ai-test-generator))

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

## How the main project was built

I followed a [30-day plan](https://github.com/rizvihiqrar/qa-automation-platform/blob/main/ROADMAP.md), one module a day, each through its own pull request with tests and green CI. Along the way:

- **TypeScript:** nine packages are strict TypeScript and every package with code is type-checked in CI. The stricter checks found real bugs: an API that let two order lines oversell a product, an update route that skipped validation, and a Windows-only bug that made a SQL tool reject every check.
- **Pipeline depth:** pull requests run quick smoke tests (16 of 65 browser tests) and the full suite runs on main and every night. The regression suite is split across 3 machines, with a check that no test was lost or run twice. A workflow tracks flaky tests as GitHub issues, opening and closing them automatically.
- **Published results:** a [live CI dashboard](https://rizvihiqrar.github.io/qa-automation-platform/) and the latest [test reports](https://rizvihiqrar.github.io/qa-automation-platform/reports/), scanned for secrets before publishing (the first scan caught live access tokens in one report).
- **Green is not proof:** several checks passed while checking nothing (a test with no assertion, a performance limit set too loose, a test runner that passes when a tag matches no tests). Each one is now caught.

The plan is complete and released as [v1.0.0](https://github.com/rizvihiqrar/qa-automation-platform/releases/tag/v1.0.0). The [retrospective](https://github.com/rizvihiqrar/qa-automation-platform/blob/main/RETROSPECTIVE.md) covers what worked, what didn't, and what it doesn't prove yet.

**Now: Phase 2 (Days 31–60)**, covering test design, testing AI-written code, a banking API, mobile, and backend infrastructure. First up: [root-cause write-ups](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/docs/rca) for five bugs found so far. Putting each bug back to check its test still fails turned up two more: a webhook sender that could lose an event, and live tokens still sitting in a CI artifact. Then [statistics for flaky tests](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/packages/flaky-test-analyzer#how-sure-are-we-run-to-run-variance): pass rates with confidence intervals, and how many runs it takes to catch a rare flake. 2,537 repeated runs with no failure show each regression test fails less than 1 run in 20, and no more than that. Then a [risk-based test strategy and test plan](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/docs/test-strategy) for the practice API: risks scored by likelihood and impact, and 85 cases built with equivalence partitioning, boundary values, decision tables and state transitions. They found 9 defects that the existing tests had missed, among them orders that could go from delivered back to pending and two accounts that could end up with the same email. Most recently, a [traceability matrix](https://rizvihiqrar.github.io/qa-automation-platform/reports/traceability/), rebuilt after every CI run: each API requirement, the cases that check it, and their latest results. With two fixed bugs put back, it named the three broken requirements and the exact failing cases, while the older tests stayed green. Then a [requirement review](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/docs/requirement-review) of the ten feature files the AI-written browser tests came from. Reading all 43 acceptance criteria for what they leave out, and checking each against the live shop, gave 29 findings: 8 defects (one prints an item total as `$119.94999999999999` for 6 of the 63 possible carts), 5 generated tests that check less than they claim, and 3 questions only the owner can answer. Then security basics on the practice API. An access-control matrix tries every protected action as each kind of caller, and it found that any customer could reprice products, read every account and mark their own order delivered, and that anyone could sign an admin token with a secret printed in the repository. All fixed and each re-checked by putting the bug back. An [OWASP ZAP scan](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/packages/qa-practice-api#security-scan) now runs in CI with every finding triaged; its first run showed it was reaching only 5 of the 13 API operations. Latest: [validating AI-written code](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/docs/ai-written-code), part 1. A nine-line request for discount codes was reviewed before any code existed: 24 findings became a spec of 25 numbered rules (for example, the obvious JavaScript rounds 10% of $10.05 to $1.00, not $1.01). An AI then wrote the feature from that spec, committed unedited. It passed typecheck, all 165 existing tests and the contract check, and none of those ran a line of the new code. Reviewing and testing it comes next.

---

## Tools I use

**Testing:** Playwright, TypeScript, JavaScript, Jest, Postman, axe-core
**Pipelines:** GitHub Actions, Azure DevOps, GitLab CI
**Other:** Node.js, REST APIs, SQL, Jira, Git

---

## Contact

- LinkedIn: [linkedin.com/in/iqrar-rizvi](https://www.linkedin.com/in/iqrar-rizvi)
- Open to messages here on GitHub or on LinkedIn
