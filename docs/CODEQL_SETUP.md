# CodeQL advanced setup

The current notices come from GitHub's managed default CodeQL workflow, which
uses `ubuntu-latest`. Standard GitHub-hosted runners do not require a custom
runner label when selected through workflow YAML.

`.github/workflows/codeql.yml` adapts GitHub's official
[CodeQL starter workflow](https://github.com/actions/starter-workflows/blob/main/code-scanning/codeql.yml).
It pins `ubuntu-24.04`, uses Node.js 24 actions, and analyzes both GitHub Actions
and JavaScript/TypeScript. These interpreted languages use `build-mode: none`;
there is no reason to build the portfolio or install its dependencies for source
extraction. `+security-extended` adds extended queries to the default suite.
Uploads remain enabled, failures remain failures, and SARIF output is retained
as an artifact for inspection even if GitHub blocks the upload during migration.

The workflow runs for pull requests into main, pushes to main, a weekly schedule,
and manual dispatch after it is available on main. Token permissions are scoped
to the analysis job. No new secret is required.

## Owner migration steps

This integration receives HTTP 403 for both reading and editing default CodeQL
setup. The owner must change the repository setting:

1. Open repository Settings → Code security → CodeQL analysis → **⋯**.
2. Choose **Switch to advanced**.
3. Confirm the dialog to disable the **default setup**. The replacement workflow
   is already prepared in this PR; this is a migration, not a request to stop
   scanning to hide warnings.
4. GitHub may open an editor with a generated CodeQL template. Leave that editor
   without committing a second workflow: use this prepared PR instead.
5. Notify the agent that advanced setup is selected. The agent will rerun the PR
   workflow, verify both analyses and uploads, inspect the annotations, and
   report readiness for owner review/merge. Do not merge a workflow with failed
   checks or a SARIF upload that has not been verified.
6. Once checks pass, review and squash-merge this focused PR, retaining
   `Co-authored-by: codex <codex@openai.com>` in the commit message. After merge,
   the main-branch scan must also succeed and appear in Code scanning.

During default/advanced overlap, an upload error stating that default setup is
enabled is an expected migration blocker, not a passing scan upload. The existing
default scans remain active until the owner changes the setting. Do not disable
query execution or uploads in this workflow to obtain green checks. If migration
must be postponed, keep default setup enabled and leave the PR unmerged.

Reference: [GitHub's advanced setup instructions](https://docs.github.com/en/code-security/how-tos/find-and-fix-code-vulnerabilities/configure-code-scanning/configuring-advanced-setup-for-code-scanning).

Historical managed-run annotations remain in their old runs. Completion means
fresh advanced scans actually run on `ubuntu-24.04`, upload both language results,
and have no runner-migration notices. A syntax check alone does not establish it.
