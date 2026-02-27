# AJTBD Analysis: Scalable Capital Smart Support Agent

**Product:** AI-powered client-context-aware support agent for Scalable Capital
**Stage:** Concept (existing FAQ-based chat resolves 70% of requests)
**Clients:** 1.5M+ across EU (Germany, Austria, Italy, UK)
**Business model:** Part of Scalable subscription (FREE / PRIME+); reduces operational support cost
**Website:** https://de.scalable.capital/en

---

## Section 1: Five AJTBD Segments

### Segment 1: "Autopilot Investor with a Broken Routine"

**Core Jobs:**
- **When** my recurring savings plan didn't execute and I notice money wasn't deducted or my portfolio didn't grow, **I want** to understand what went wrong and fix it immediately without waiting for email support
- **When** I changed banks or my cash balance was unexpectedly low, **I want** to quickly update my payment method or adjust my savings plan so I don't miss another execution
- **When** I get a notification about a failed transaction, **I want** clear guidance on what to do next, not a generic FAQ link

**Fulfillment criteria:** Fast (under 2 minutes), self-service (no human needed), clear explanation (not jargon), fix applied immediately

**Who these people are:** Working professionals (25-45), set up savings plans months ago and rely on automation. They check the app occasionally, not daily. Trigger: a push notification about a failed execution or noticing their cash balance didn't change. They are time-poor and expect digital products to "just work."

**Big Job:** **I want** my money to grow on autopilot without requiring my attention, **so that** I can focus on my career and life while building long-term wealth.

**TAM / SAM / SOM:**
- TAM: ~15M retail investors with recurring investment plans in the EU (Eurozone broker accounts with savings plans)
- SAM: ~1.5M Scalable Capital clients; ~60% have active savings plans = ~900K users
- SOM: ~270K users/year who experience at least one failed execution or savings plan issue (estimate: 30% of active savings plan users encounter an issue annually)

**Why this segment is attractive:** Highest volume of support requests that require account context (savings plan config + cash balance). Currently escalated to human agents because the FAQ bot cannot access client data. Fixing this segment alone could shift resolution rate from 70% to 80%+. High retention value: if the savings plan breaks and the fix is frustrating, these users churn silently.

---

### Segment 2: "Active Trader Blocked by an Execution Problem"

**Core Jobs:**
- **When** my buy/sell order failed, was partially filled, or is stuck in a pending state, **I want** to know why and whether I need to take action before the market moves further
- **When** I see an unexpected fee, tax withholding, or settlement delay, **I want** a clear breakdown tied to my specific transaction, not a general FAQ about fees
- **When** I'm trying to trade during high-volatility hours and something goes wrong, **I want** instant support because every minute costs me money

**Fulfillment criteria:** Instant (under 30 seconds), accurate (tied to my exact order), actionable (tell me what to do or do it for me)

**Who these people are:** Self-directed traders (30-55), trade weekly or daily, use Scalable Broker actively. Often PRIME+ subscribers. Trigger: a failed order, unexpected cost, or settlement delay during trading hours. They are financially literate and impatient with generic answers.

**Big Job:** **I want** to trade confidently knowing the platform has my back when things go wrong, **so that** I can focus on investment decisions, not operational issues.

**TAM / SAM / SOM:**
- TAM: ~8M active retail traders in the EU
- SAM: ~450K active Scalable Broker traders (estimate: 30% of 1.5M are active traders)
- SOM: ~90K traders/year who contact support about order/transaction issues (estimate: 20% of active traders per year)

**Why this segment is attractive:** High LTV segment (PRIME+ subscribers at EUR 4.99/month). Time-critical issues where slow support directly causes financial dissatisfaction. These users are vocal (app store reviews, social media). Fast resolution drives loyalty and NPS. Transaction data is structured and already available -- technically feasible for AI to diagnose.

---

### Segment 3: "New Investor Overwhelmed by the First Steps"

**Core Jobs:**
- **When** I just opened my Scalable account and am confused by onboarding steps (verification, funding, first purchase), **I want** step-by-step guidance specific to where I am in the process
- **When** I see terms I don't understand (ETF, savings plan, PRIME vs FREE), **I want** a simple explanation in context of my situation, not a glossary page
- **When** my identity verification is stuck or my bank transfer hasn't arrived, **I want** to know exactly what's happening and when it will be resolved

**Fulfillment criteria:** Simple language, step-by-step, patient (no assumptions about financial knowledge), personalized to my account state

**Who these people are:** First-time investors (20-35), often triggered by social media content about investing or a friend's recommendation. Low financial literacy but high motivation. Trigger: stuck onboarding, confusion, first purchase anxiety. They compare the experience to other consumer apps (Uber, Spotify) and expect the same simplicity.

**Big Job:** **I want** to start investing without feeling stupid or making costly mistakes, **so that** I can join the world of investing and build a better financial future.

**TAM / SAM / SOM:**
- TAM: ~25M Europeans aged 20-35 who haven't started investing but want to
- SAM: ~200K new Scalable sign-ups per year (estimated)
- SOM: ~120K new users/year who contact support during onboarding (estimate: 60% of new sign-ups have at least one support interaction)

**Why this segment is attractive:** Highest volume segment overall. First impression defines retention: if onboarding support is poor, these users never make their first investment. Current FAQ bot handles basic questions but cannot see the user's onboarding state. AI with account context can see "verification pending since 3 days" and proactively guide. Conversion from sign-up to first investment is a key business metric.

---

### Segment 4: "Tax Season Client Needing Documentation"

**Core Jobs:**
- **When** tax season approaches and I need my annual tax report, cost basis, or dividend summary, **I want** to find and download the right documents without searching through the app
- **When** my tax report has entries I don't understand (Vorabpauschale, Kapitalertragsteuer), **I want** a plain-language explanation tied to my specific portfolio and transactions
- **When** I've held positions across multiple years or transferred from another broker, **I want** clarity on how Scalable calculated my gains/losses

**Fulfillment criteria:** Accurate (must match tax authority expectations), complete (all documents available), understandable (explains tax-specific German terminology)

**Who these people are:** German investors doing annual tax filing (all age groups), particularly those using a Steuerberater or filing via ELSTER. Trigger: annual tax filing period (Jan-Jul in Germany). Strongly seasonal demand spike.

**Big Job:** **I want** to handle my investment taxes correctly and effortlessly, **so that** I don't face problems with the Finanzamt and can keep as much of my returns as possible.

**TAM / SAM / SOM:**
- TAM: ~10M German retail investors who file taxes on investment income
- SAM: ~1M Scalable Capital German clients
- SOM: ~400K clients/year who access tax documents or contact support about tax topics (seasonal spike Jan-May)

**Why this segment is attractive:** Massive seasonal volume spike that currently overwhelms support. Tax questions require client-specific data (portfolio, transactions, tax documents) that the FAQ bot cannot access. High stakes: incorrect tax information damages trust irreversibly. AI with access to the client's tax document status and portfolio can handle 80%+ of these queries. Compliance advantage: AI can always include proper disclaimers.

---

### Segment 5: "Client Considering Leaving Due to Unresolved Frustration"

**Core Jobs:**
- **When** I've had multiple bad support experiences and I'm considering switching to Trade Republic or another broker, **I want** my issue resolved quickly and properly to restore my trust
- **When** I want to close my account or transfer my portfolio, **I want** a straightforward process without being trapped or delayed
- **When** I feel the platform has a bug or error that cost me money, **I want** acknowledgment and a clear resolution path, not a dismissive template response

**Fulfillment criteria:** Empathetic (acknowledge the frustration), fast (escalate if needed), honest (don't deflect), actionable (solve it or explain clearly why not)

**Who these people are:** Clients of any profile who have accumulated negative experiences. Often contacted support 2-3 times about the same issue. Active on app store reviews and social media. Trigger: yet another unresolved issue, a competitor's marketing, or a friend mentioning they switched.

**Big Job:** **I want** to feel that my broker respects me and my money, **so that** I can trust them with my financial future.

**TAM / SAM / SOM:**
- TAM: ~5M EU retail investors who switched brokers in the past 2 years
- SAM: ~75K Scalable clients at risk of churning annually (estimate: 5% of 1.5M)
- SOM: ~30K clients/year who contact support in a pre-churn state (repeat contacts, negative CSAT)

**Why this segment is attractive:** Highest financial impact per interaction. Preventing one churn saves the full LTV (PRIME+: ~EUR 60/year, potential AUM fees on wealth management). AI with context can detect the pattern (repeated contacts, escalation history) and prioritize accordingly. Retention is far cheaper than acquisition. An empathetic, context-aware agent that acknowledges past issues and resolves quickly can reverse churn intent.

---

## Section 2: Priority Segment Selection

**Selected: Segment 1 -- "Autopilot Investor with a Broken Routine"**

**Rationale (aligned with Sebastian's interview signals):**

| Criterion | Segment 1 Score | Why |
|-----------|----------------|-----|
| Volume of escalated requests | Highest | Savings plan failures need account data; currently always escalated |
| Alignment with "client-specific data + action execution" vision | Perfect | Requires reading savings plan config, cash balance; action = reschedule or adjust |
| Feasibility as first use case | High | Data is structured, action set is small and safe, risk is low |
| Impact on resolution rate | +10-15pp | These cases are ~15% of total volume, currently 0% AI-resolved |
| Platform reusability | High | Client context layer and action framework reuse for all other segments |

Sebastian explicitly described this evolution in the interview: "We started with client-specific data fed to the LLM... following up with making changes like our human agents would be able to do."

---

## Section 3: Job Graph for Segment 1

### Core Job
**When** my recurring savings plan didn't execute and I notice the money wasn't deducted or my portfolio didn't grow, **I want** to understand what went wrong and fix it immediately without waiting for email support.

**Context:** The user set up a monthly ETF savings plan (e.g., EUR 200 into MSCI World ETF on the 15th of each month). It's been running for months. This month, it didn't execute.

**Trigger:** Push notification about failed execution, OR noticing in the app that the expected purchase didn't happen, OR checking cash balance and seeing it wasn't deducted.

**Activating knowledge:** The user knows they have a savings plan. They know it should have executed. They don't know why it failed.

**Emotions at Point A:** Confusion ("what happened?"), mild anxiety ("is my money okay?"), frustration ("I set this up to be automatic, now I have to deal with it"), time pressure ("I don't want to spend 30 minutes on this").

**Expected result:** Understand why it failed + fix applied + confidence it won't happen again.

**Success criteria:** (1) Explanation in under 2 minutes, (2) fix applied without calling/emailing, (3) confirmation that next execution will work.

**Big Job:** I want my money to grow on autopilot without requiring my attention, so that I can focus on my career and life while building long-term wealth.

---

### Sub-jobs (Job Graph)

#### Sub-job 1: Discover that the savings plan failed

- **Context:** User is in their daily routine, not actively monitoring investments
- **Trigger:** Push notification ("Your savings plan could not be executed") or checking the app and noticing no recent purchase
- **Emotions at Point A:** Surprise, slight worry ("What happened? Is something wrong with my account?")

**Want:** Immediate awareness that something went wrong and a clear entry point to get help

**Success criteria:** The notification or app state clearly indicates what happened and provides a direct path to resolution (not a generic "contact support")

**Problems:** (1) Push notification text is often vague ("Your order could not be processed"); (2) No direct link from notification to the relevant savings plan; (3) User may not notice for days if notifications are off
**Problem strength:** 7/10

---

#### Sub-job 2: Understand why it failed

- **Context:** User opened the app or clicked the notification, now looking at their savings plan
- **Trigger:** Seeing "failed" or "not executed" status on the savings plan
- **Emotions at Point A:** Confusion ("But I had money in my account?"), frustration ("Why doesn't it just tell me?")

**Want:** A clear, specific explanation: "Your savings plan for EUR 200 into MSCI World ETF did not execute on Feb 15 because your available cash balance was EUR 142.30 at the time of execution — EUR 57.70 short."

**Success criteria:** (1) Explanation references the specific savings plan, amount, and date; (2) identifies the root cause (insufficient funds, bank transfer delay, plan paused, etc.); (3) uses simple language, not error codes

**Problems:** (1) Current app shows generic "failed" status with no explanation; (2) FAQ bot can only link to articles about savings plans, not diagnose the specific case; (3) User would need to check cash balance history themselves and do the math
**Problem strength:** 9/10

---

#### Sub-job 3: Evaluate options to fix it

- **Context:** User now understands the cause and wants to resolve it
- **Trigger:** The explanation from Sub-job 2
- **Emotions at Point A:** Relief (now they understand), pragmatic ("okay, how do I fix this?"), slight impatience ("just let me fix it quickly")

**Want:** A set of clear, actionable options: (a) Reschedule the execution for a specific date, (b) Adjust the savings plan amount to match available cash, (c) Add funds and retry, (d) Do nothing and wait for next month

**Success criteria:** (1) Options are specific to the user's situation (not generic); (2) each option has a clear outcome explained; (3) the user can choose and act immediately

**Problems:** (1) Currently there's no support flow that presents situation-specific options; (2) users must figure out the fix themselves (navigate to settings, adjust amount, etc.); (3) some fixes require multiple steps across different app screens
**Problem strength:** 8/10

---

#### Sub-job 4: Execute the chosen fix

- **Context:** User has decided on an option (e.g., reschedule to March 1)
- **Trigger:** Selecting the preferred option
- **Emotions at Point A:** Decisive ("let's do this"), cautious ("will this actually work?"), wanting confirmation

**Want:** The fix is applied immediately with a single confirmation, and the user sees the updated state

**Success criteria:** (1) One-click confirmation; (2) immediate feedback ("Done. Your savings plan is now scheduled for March 1"); (3) visible change in the app (savings plan status updated)

**Problems:** (1) Currently, users must navigate to Settings > Savings Plans > Edit > Change Date — 4-5 taps minimum; (2) no way to do this from a support chat; (3) if done via email support, takes 4-24 hours for a human agent to process
**Problem strength:** 9/10

---

#### Sub-job 5: Confirm resolution and prevent recurrence

- **Context:** Fix has been applied, user wants closure
- **Trigger:** Seeing the confirmation message
- **Emotions at Point A:** Relief, wanting certainty ("will this happen again?"), desire for control

**Want:** (1) Written confirmation of what was changed; (2) assurance that the next execution will work; (3) optionally, a way to prevent this in the future (e.g., low-balance alert)

**Success criteria:** (1) Summary of actions taken; (2) next execution date and expected behavior confirmed; (3) option to set up preventive measures

**Problems:** (1) No confirmation email or in-app record of support interactions; (2) no proactive alerting for low cash balance before savings plan execution; (3) user has no visibility into whether the fix will actually work next month
**Problem strength:** 7/10

---

### Job Graph Summary

| # | Sub-job | Problem Strength | Currently Solved by AI? |
|---|---------|-----------------|------------------------|
| 1 | Discover failure | 7/10 | Partially (notification exists but is vague) |
| 2 | Understand why | 9/10 | No (FAQ bot cannot access client data) |
| 3 | Evaluate options | 8/10 | No (no personalized options flow) |
| 4 | Execute the fix | 9/10 | No (requires manual navigation or human agent) |
| 5 | Confirm + prevent | 7/10 | No (no confirmation or proactive alerting) |

**Key insight:** Sub-jobs 2, 3, and 4 (combined problem strength: 26/30) are the exact gap that a client-context-aware agent with action capability would close. This is where the current 70% resolution rate hits its ceiling.

---

## Section 4: RAT Analysis (Riskiest Assumption Test)

### Risk 1: Compliance Approval for Client Data Access by AI

**Assumption:** Scalable Capital's Legal/DPO team will approve feeding client portfolio data, transaction history, and cash balance to an LLM for support resolution within 3 months of proposal.

**Risk:** If Legal blocks client data access by AI, the entire value proposition collapses — the agent becomes just another FAQ bot. The feature cannot ship, and 3-6 months of AI platform team work is wasted.

**Category:** Operational / Regulatory

**Probability (P): 3** — Scalable already feeds "first client-specific data" to the LLM (Sebastian's words). BaFin hasn't blocked AI in financial services per se. However, the scope expansion (from limited data to full portfolio + actions) may trigger extended review. EU AI Act high-risk classification for financial services adds complexity. Partially mitigated: they already have precedent.

**Impact (I): 5** — Without client data access, there's no differentiation from the current FAQ bot. The entire concept is dead.

**Validation methods:**
1. Workshop with DPO + Legal in week 1: present data access scope, get preliminary yes/no
2. Review existing data processing agreements for the current support chat — what's already approved?
3. Benchmark: how did Fundrise, Sharesies, MONY Group get compliance approval for their AI agents? (Intercom case studies)
4. Propose a minimal first scope: read-only access to savings plan status (no full portfolio) as a compliant starting point

**Score: P(3) x I(5) = 15** — Rank #1

---

### Risk 2: AI Hallucination in Financial Context

**Assumption:** The AI agent will provide accurate, factual explanations about client-specific financial data (savings plan status, cash balance, transaction details) with a hallucination rate below 1% in production.

**Risk:** A single hallucination about a client's money (wrong balance, wrong transaction, incorrect tax information) could cause financial harm, regulatory violation, and catastrophic trust damage. In regulated financial services, this is potentially a BaFin incident.

**Category:** Value / Readiness

**Probability (P): 3** — LLMs hallucinate. Even with RAG and grounding, financial data requires exact numbers. Mitigated by: structured data injection (not retrieval from unstructured docs), guardrails, and confidence thresholds. But "below 1%" is a high bar.

**Impact (I): 5** — Financial hallucination = regulatory risk + client financial harm + reputational damage. A single viral social media post about "Scalable's AI told me I had EUR 5,000 when I had EUR 500" could be devastating.

**Validation methods:**
1. Build golden test set of 200+ savings plan scenarios with known-correct answers; measure hallucination rate
2. A/B test with internal support agents: AI generates draft answers, humans verify before sending
3. Implement confidence scoring: responses below threshold auto-escalate to human
4. Run red-team testing: adversarial prompts designed to elicit hallucinated financial data

**Score: P(3) x I(5) = 15** — Rank #2

---

### Risk 3: Client Trust in AI for Account Actions

**Assumption:** At least 40% of clients who are offered an AI-executed action (reschedule savings plan, adjust amount) will confirm and let the AI make the change, rather than requesting a human agent.

**Risk:** If clients don't trust the AI to modify their account, the action capability adds development cost without usage. The resolution rate improvement stalls at "diagnosis only" (~75%) rather than reaching the target (~85%).

**Category:** Value / Readiness

**Probability (P): 3** — Intercom research shows trust jumps 18pp after demo. But financial actions are higher-stakes than typical support actions. German consumers are known for caution with financial technology. Mitigated by: clear confirmation flows, undo capability, transparent audit trail.

**Impact (I): 3** — The feature still provides value (diagnosis alone improves CX). But the ROI case for action capability weakens significantly if adoption is below 40%. It's a delayed impact, not a project-killer.

**Validation methods:**
1. Prototype test (this POC): show the confirmation flow to 10-15 Scalable clients, measure willingness
2. Internal beta: deploy action capability to support agents first, let agents trigger actions with client on the phone
3. A/B test: offer AI actions vs. "I'll connect you to an agent who can do this" — measure preference
4. Analyze Intercom fintech case studies for action adoption rates in similar products

**Score: P(3) x I(3) = 9** — Rank #3

---

### Risk 4: Technical Latency of Client Data Retrieval

**Assumption:** Client portfolio data, savings plan configuration, and cash balance can be retrieved and injected into the LLM context within 2 seconds, enabling a responsive chat experience.

**Risk:** If data retrieval takes 5-10 seconds, the chat feels broken. Users expect instant responses (especially active traders, Segment 2). Slow responses cause abandonment and negative perception of AI capability.

**Category:** Operational / Technological

**Probability (P): 2** — Scalable runs on a mature microservices architecture (Java, Kotlin, Kubernetes). Client data is already served to the app in real-time. The API layer exists. The risk is mainly about: (a) authorization and scoping for the AI service, (b) aggregating data from multiple services into a single context payload.

**Impact (I): 3** — Degraded experience, not a project-killer. Can be mitigated with streaming responses, loading indicators, and caching. But it does affect CSAT and resolution rate.

**Validation methods:**
1. Technical spike: measure current API response times for portfolio, savings plans, and cash balance endpoints
2. Build a mock aggregation service that calls all three and measures total latency
3. Benchmark: what latency does Intercom Fin achieve with CRM data injection?

**Score: P(2) x I(3) = 6** — Rank #4

---

### Risk 5: Cannibalization of Insights Feature

**Assumption:** The Smart Support Agent and the existing Insights feature (broker investment Q&A) can coexist as separate products without confusing clients about which to use for what.

**Risk:** If clients can't distinguish "support agent" from "investment insights," they'll ask the support agent for investment advice (which it must refuse) or ask Insights for account issues (which it can't help with). This creates a frustrating dead-end experience and undermines both products. Sebastian mentioned the open question of whether the two chats should be one.

**Category:** Market / Segment

**Probability (P): 3** — Two chat interfaces in one app is genuinely confusing. The distinction between "support" and "insights" is clear to product teams but not necessarily to users. Mitigated by: clear UI separation, smart routing, eventual unification.

**Impact (I): 2** — Confusion is annoying but not catastrophic. Can be resolved through UX (routing layer, unified entry point). The underlying AI capabilities are complementary, not conflicting.

**Validation methods:**
1. UX test: show 10 users both features, ask them to classify 10 sample questions as "support" or "insights" — measure misclassification rate
2. Analyze current Insights usage logs: how many queries are actually support requests?
3. Prototype a unified entry point with smart routing — test whether a single "Ask" button that auto-classifies intent reduces confusion
4. Interview Philip (support chat PM) and Insights PM about observed user confusion patterns

**Score: P(3) x I(2) = 6** — Rank #5

---

### RAT Summary

| Rank | Risk | P | I | Score |
|------|------|---|---|-------|
| 1 | Compliance approval for client data access | 3 | 5 | 15 |
| 2 | AI hallucination in financial context | 3 | 5 | 15 |
| 3 | Client trust in AI for account actions | 3 | 3 | 9 |
| 4 | Technical latency of data retrieval | 2 | 3 | 6 |
| 5 | Cannibalization of Insights feature | 3 | 2 | 6 |

**Key takeaway:** The two existential risks (compliance and hallucination, both Score 15) must be validated before significant investment. The good news: Scalable has already started feeding client data to the LLM (reducing compliance risk) and the hallucination risk can be mitigated through structured data injection rather than unstructured retrieval. Risks 3-5 are manageable through iterative testing.
