# Iqrar Rizvi

**QA Automation Engineer / SDET** · Playwright · TypeScript · API testing · CI/CD · Performance and security testing

I build automated tests that catch software bugs before customers do, and the pipelines that run those tests every time code changes. Based in the Greater Toronto Area; open to QA Automation and SDET roles, hybrid or remote across Canada. [Let's talk on LinkedIn](https://www.linkedin.com/in/iqrar-rizvi).

**At a glance**

- **Week → hours:** in my current role, I turned a week-long manual regression process into an automated run of 1 to 3 hours.
- **Real bugs found, then guarded:** a login slowdown fixed from 67 ms to 1 ms, 9 defects that existing tests had passed, and 4 defects in AI-written code that passed every check it was given. Each fix has a test that was shown to fail with the bug put back.
- **Proof you can click:** about 1,030 automated checks run on every change and every night, with a [live CI dashboard](https://rizvihiqrar.github.io/qa-automation-platform/), [test reports](https://rizvihiqrar.github.io/qa-automation-platform/reports/) and a [traceability matrix](https://rizvihiqrar.github.io/qa-automation-platform/reports/traceability/). Each project opens with a plain-English summary for non-technical readers.

---

## Key projects

| Project | What it is | Checks |
|---|---|---:|
| [**qa-automation-platform**](https://github.com/rizvihiqrar/qa-automation-platform) | My main project: 24 testing tools and test suites in one repository, with one CI pipeline. Browser and API tests, performance and security testing, test design, SQL data checks, and AI-assisted testing, each with its own README and results. | ~1,030 |
| [cicd-pipeline-demo](https://github.com/rizvihiqrar/cicd-pipeline-demo) | One small API delivered by the same pipeline on GitHub Actions, GitLab CI and Azure DevOps: code checks, unit and integration tests, and a deployment step that needs approval. | 56 |

Three earlier suites ([accessibility](https://github.com/rizvihiqrar/accessibility-test-suite), [Playwright end-to-end](https://github.com/rizvihiqrar/playwright-demo-suite), [API](https://github.com/rizvihiqrar/api-test-suite)) are archived; their work continues, in more depth, inside the main project.

---

## Selected results

- **A performance bug found by load testing.** Browsing slowed to 67–84 ms (p95) whenever users logged in, because password hashing blocked the server. After the fix, p95 dropped to 1 ms and logins went from 72 to 40 ms. ([details](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/packages/k6-performance))
- **AI-written code, checked like code from an unknown author.** An AI built a discount-code feature from a reviewed spec. It passed every existing check, none of which ran the new code. A code review and 126 designed tests then found four defects: 30 February accepted as an expiry date, a two-decimal check that let `10.000000000001` through, the wrong error shown first, and an order total quietly changed from 1.00 to 0.99. ([details](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/docs/ai-written-code))
- **AI-written tests, reviewed before they count.** 42 of 43 generated browser tests passed on their first run, and the review caught one with no assertion that the test runner still reported as passing. ([details](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/packages/ai-test-generator))
- **Security testing of an API.** An access-control matrix tries every protected action as each kind of user. It found that any customer could reprice products and read every account, and that anyone could sign an admin token with a secret written in the code. An OWASP ZAP scan now runs in CI, with every finding triaged. ([details](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/packages/qa-practice-api#security-scan))
- **Test design that finds what other tests missed.** A risk-based test strategy, with cases built from equivalence classes, boundary values, decision tables and state transitions, found 9 defects that the existing tests had passed, for example delivered orders that could go back to pending. ([details](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/docs/test-strategy))
- **Requirements reviewed before testing.** Reading 43 acceptance criteria against the live app found 29 gaps, including a cart total shown as `$119.94999999999999`. ([details](https://github.com/rizvihiqrar/qa-automation-platform/tree/main/docs/requirement-review))

---

## How I work

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

- Testing AI output: property-based and mutation testing of the AI-written code, model-graded checks compared with human labels, and a red-team suite (prompt injection, made-up answers)
- A banking API: exact decimal money, duplicate and simultaneous transfers, and ledger checks that every transfer balances
- Mobile testing on an Android emulator in CI
- Backend testing: real databases in Docker, message queues, injected network failures, and tracing
- Python (pytest) and Selenium suites alongside the Playwright ones

---

## Tools I use

**Testing:** Playwright, TypeScript, JavaScript, Jest, Cucumber (BDD), k6, Postman, Pact (contract testing), Stryker (mutation testing), axe-core, OWASP ZAP
**Pipelines:** GitHub Actions, Azure DevOps, GitLab CI
**Other:** Node.js, REST APIs, OpenAPI, SQL, Jira, Git

---

## Contact

- LinkedIn: [linkedin.com/in/iqrar-rizvi](https://www.linkedin.com/in/iqrar-rizvi)
- Open to messages here on GitHub or on LinkedIn
