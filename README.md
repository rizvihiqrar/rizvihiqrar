# Iqrar Rizvi

**QA Automation Engineer / SDET** · Playwright · TypeScript · API testing · CI/CD · Performance and security testing

[![CI](https://github.com/rizvihiqrar/qa-automation-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/rizvihiqrar/qa-automation-platform/actions/workflows/ci.yml)
[![Automated checks](https://img.shields.io/badge/automated%20checks-~1%2C270-2ea44f)](https://github.com/rizvihiqrar/qa-automation-platform)
[![Live dashboard](https://img.shields.io/badge/live-CI%20dashboard-0969da)](https://rizvihiqrar.github.io/qa-automation-platform/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-iqrar--rizvi-0a66c2)](https://www.linkedin.com/in/iqrar-rizvi)

I build automated tests that catch software bugs before customers do, and the pipelines that run those tests every time code changes. Based in the Greater Toronto Area; open to QA Automation and SDET roles, hybrid or remote across Canada. [Let's talk on LinkedIn](https://www.linkedin.com/in/iqrar-rizvi).

**At a glance**

- **Week → hours:** in my current role, I turned a week-long manual regression process into an automated run of 1 to 3 hours.
- **Real bugs found, then guarded:** a login slowdown fixed from 67 ms to 1 ms, 9 defects that existing tests had passed, and 7 problems in AI-written code that passed every check it was given. Each fix has a test that was shown to fail with the bug put back.
- **Proof you can click:** about 1,270 automated checks run on every change and every night, with a [live CI dashboard](https://rizvihiqrar.github.io/qa-automation-platform/), [test reports](https://rizvihiqrar.github.io/qa-automation-platform/reports/) and a [traceability matrix](https://rizvihiqrar.github.io/qa-automation-platform/reports/traceability/). Each project opens with a plain-English summary for non-technical readers.

### See it running

| [![CI dashboard: pass rate and run time of the last CI runs](images/dashboard.png)](https://rizvihiqrar.github.io/qa-automation-platform/) | [![Traceability matrix: every API requirement with its test cases and latest results](images/traceability.png)](https://rizvihiqrar.github.io/qa-automation-platform/reports/traceability/) |
|---|---|
| **CI dashboard**: pass rate, run time and flaky results across recent runs, rebuilt after every run | **Traceability matrix**: each API requirement, the cases that check it, and their latest result |

---

## Key projects

| Project | What it is | Checks |
|---|---|---:|
| [**qa-automation-platform**](https://github.com/rizvihiqrar/qa-automation-platform) | My main project: 26 testing tools and test suites in one repository, with one CI pipeline. Browser and API tests, performance and security testing, test design, SQL data checks, and AI-assisted testing, each with its own README and results. | ~1,270 |
| [cicd-pipeline-demo](https://github.com/rizvihiqrar/cicd-pipeline-demo) | One small API delivered by the same pipeline on GitHub Actions, GitLab CI and Azure DevOps: code checks, unit and integration tests, and a deployment step that needs approval. | 56 |

Three earlier suites ([accessibility](https://github.com/rizvihiqrar/accessibility-test-suite), [Playwright end-to-end](https://github.com/rizvihiqrar/playwright-demo-suite), [API](https://github.com/rizvihiqrar/api-test-suite)) are archived; their work continues, in more depth, inside the main project.

---

## Selected results

- **A performance bug found by load testing.** Browsing slowed to 67–84 ms (p95) whenever users logged in, because password hashing blocked the server. After the fix, p95 dropped to 1 ms and logins went from 72 to 40 ms. ([details](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/packages/k6-performance))
- **AI-written code, checked like code from an unknown author.** An AI built a discount-code feature from a reviewed spec. It passed every existing check, none of which ran the new code. A code review and 126 designed tests then found four defects: 30 February accepted as an expiry date, a two-decimal check that let `10.000000000001` through, the wrong error shown first, and an order total quietly changed from 1.00 to 0.99. Property-based tests then found two more at values nobody would pick: orders over 2^53 cents losing cents, and about 9% of valid amounts from 131,072.02 up refused. Mutation testing showed which checks the tests only appeared to make. A [scoreboard](https://github.com/rizvihiqrar/qa-automation-platform/blob/main/docs/ai-written-code/scoreboard.md) shows which technique caught each mistake: none caught them all, and the tests that already existed caught none. ([details](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/docs/ai-written-code))
- **A banking API where every cent is exact.** Accounts in four currencies (0, 2 and 3 decimals) and transfers on a double-entry ledger in SQLite. Money travels as text and is counted in whole cents, never as a floating-point number, so three deposits of 0.10 make exactly 0.30, and amounts too large for a JavaScript number keep their last cent. 18 written rules, 138 tests, and 20 mistakes put back on purpose, each one caught. Putting them back also showed where the random tests were weak: they missed an off-by-one in the overdraft check until they were taught to try the exact balance. ([details](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/packages/banking-api))
- **AI-written tests, reviewed before they count.** 42 of 43 generated browser tests passed on their first run, and the review caught one with no assertion that the test runner still reported as passing. ([details](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/packages/ai-test-generator))
- **An AI grader, checked before it's trusted.** Two Claude models judged whether 67 AI-written tests really check their acceptance criteria, and their answers were compared with labels I reviewed case by case. With the first grading instructions, they agreed more with whoever wrote the instructions than with the reviewer, and caught 1 of 6 weak real tests. Instructions rewritten from the reviewer's rules raised agreement from 84% to 91%, but made answers vary more between runs. One disagreement turned out to be a mistake in the human labels, and checking one case at runtime found a real race in the regression suite. ([details](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/packages/llm-judge-check))
- **Red-teaming that AI grader.** 40 tries at prompt injection (fake system updates, a breakout from the code block, a planted verdict) and deceptive code (a claimed test hook, an assertion commented out) moved 0 of 40 verdicts. The one verdict that did change wasn't an attack: the same prompt was judged differently once the session no longer had a neighbouring case to compare it against. The red team also caught two bookkeeping bugs from the earlier grading run: 8 answers filed under the wrong case, and a replay check that had been quietly switched off. ([details](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/packages/llm-judge-check))
- **Every AI test traced, and the traces checked.** All 900 AI test results are sent to a self-hosted Langfuse, and CI fails unless each one has exactly one trace holding its prompt, its reply and its result. A tracing failure leaves every other check green, so only reading the traces back catches it. Pinning the Langfuse version also showed that the release first chosen had never published its web image. ([see every trace](https://rizvihiqrar.github.io/qa-automation-platform/reports/langfuse-traces/))
- **Security testing of an API.** An access-control matrix tries every protected action as each kind of user. It found that any customer could reprice products and read every account, and that anyone could sign an admin token with a secret written in the code. An OWASP ZAP scan now runs in CI, with every finding triaged. ([details](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/packages/qa-practice-api#security-scan))
- **Test design that finds what other tests missed.** A risk-based test strategy, with cases built from equivalence classes, boundary values, decision tables and state transitions, found 9 defects that the existing tests had passed, for example delivered orders that could go back to pending. ([details](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/docs/test-strategy))
- **Requirements reviewed before testing.** Reading 43 acceptance criteria against the live app found 29 gaps, including a cart total shown as `$119.94999999999999`. ([details](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/docs/requirement-review))

---

## How I work

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/workflow-dark.svg">
  <img alt="An AI-driven development lifecycle. Inception: requirements reviewed and gaps fixed before any code. Construction: AI writes the code from the reviewed spec, quick checks run in about 1.5 minutes, and a person reviews it against the spec and merges it; a failed check goes back to be fixed. Operations: the full test run on main and every night, results published to a dashboard and test reports, and a release gate that deploys only on GO." src="images/workflow-light.svg" width="100%">
</picture>

<sub>An AI-driven development lifecycle (AI-DLC): AI drafts and builds, people decide, and tests prove it.</sub>

- **AI does the drafting; people make the decisions.** Requirements are reviewed before code is written, AI-written code is read against the spec, and designed tests decide whether it merges.
- **Every change goes through a pull request** with tests, and merges only when CI is green.
- **Green is not proof.** Several checks here once passed while checking nothing (a test with no assertion, a limit set too loose, a runner that passes when no tests match). Each one is now caught. When I fix a bug, I put it back once to show the new test fails.
- **Write it down.** Bugs get [root-cause write-ups](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/docs/rca); flaky tests get [statistics](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/packages/flaky-test-analyzer#how-sure-are-we-run-to-run-variance) rather than guesses; each project says what it doesn't cover yet.

---

## What I do

- **Automated testing** of web apps and APIs (Playwright, BDD with Cucumber, API contract checks against OpenAPI)
- **CI/CD pipelines** that run tests on every change and block a release with a clear reason when something fails
- **Performance testing** with k6, with pass/fail limits set from measurements
- **Security and accessibility testing**: access-control tests, OWASP ZAP, and WCAG/AODA audits with axe-core
- **Test design and analysis**: test strategies, test plans, traceability, requirement reviews, root-cause analysis
- **SQL data checks** that find records that don't add up and list the exact rows
- **AI-assisted testing**: using AI to draft tests and code, then reviewing and testing what it produces

---

## Coming soon

- More on the banking API: duplicate and simultaneous transfers, ledger checks in SQL that every transfer balances, and a UI tested with Cypress
- Mobile testing on an Android emulator in CI
- Backend testing: real databases in Docker, message queues, injected network failures, and tracing
- Python (pytest) and Selenium suites alongside the Playwright ones

---

## Tools I use

**Testing:** Playwright, TypeScript, JavaScript, Jest, Cucumber (BDD), k6, Postman, Pact (contract testing), fast-check (property-based testing), Stryker (mutation testing), axe-core, OWASP ZAP

**Pipelines:** GitHub Actions, Azure DevOps, GitLab CI

**Other:** Node.js, REST APIs, OpenAPI, SQL, Jira, Git

---

## Contact

- LinkedIn: [linkedin.com/in/iqrar-rizvi](https://www.linkedin.com/in/iqrar-rizvi)
- Open to messages here on GitHub or on LinkedIn
