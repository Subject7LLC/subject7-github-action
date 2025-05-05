# Subject7 GitHub Action

<div align="center">
    <a href="https://www.subject7.com" target="_blank">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="misc/images/subject7-logo-light.svg">
            <source media="(prefers-color-scheme: light)" srcset="misc/images/subject7-logo-dark.svg">
            <img alt="Subject7" src="misc/images/subject7-logo-light.svg" width="300">
        </picture>
    </a>
</div>

![License: MIT][shield-license-mit]
[![GitHub Release](https://img.shields.io/github/v/release/subject7inc/subject7-ci-action)](https://github.com/subject7inc/subject7-ci-action/releases)

* [About](#about)
* [Usage](#usage)
  * [Example](#example)
  * [Inputs](#inputs)
  * [Outputs](#outputs)
* [License](#license)

## About

A custom integration for GitHub CI/CD Action that enables users to trigger Subject7 Execution Sets directly from GitHub pipelines.

## Usage

- ### Example

Here is an example of how the action can be used in a workflow file:

```yml
name: Run Subject7 Tests
on:
  push:
    branches: [ main ]
jobs:
  subject7-tests:
    name: Subject7 Tests
    runs-on: ubuntu-latest
    steps:
      - name: Run Subject7 Execution Sets
        id: subject7
        uses: Subject7LLC/subject7-github-action@v1
        with:
          url: Subject7_URL
          api_token: ${{ secrets.SUBJECT7_API_TOKEN }}
          execution_set_names: ExecutionSet1,ExecutionSet2,ExecutionSetN
      - name: Deploy if tests pass
        if: steps.subject7.outputs.result == 'true'
        run: ./deploy.sh
```

- ### Inputs

Here is a list of input parameters of this action:

| Input                 | Required | Default Value | Description                                                                                                                                                                                        |
|-----------------------|----------|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `url`                 | Yes      |               | URL of the Subject7 Instance where the tests should be run                                                                                                                                         |
| `api_token`           | Yes      |               | The secrets that will be used in Subject7 REST calls                                                                                                                                               |
| `execution_set_names` | Yes      |               | Names of the execution sets that should be run. <br> Names should be separated with comma, e.g. name1,name2,...,nameN                                                                              |
| `project_name`        | No       | `Common`      | Name of the Subject7 Project where the execution sets should be executed. <br> If value is not set then the default project "Common" will be used                                                  |
| `version_name`        | No       | `default`     | Name of the Subject7 Version where the execution sets should be executed. Version should belong to the specified project. <br> If value is not set then the default version "default" will be used |

> [!IMPORTANT]
> Please do not share your `api_token` in workflow files. Use [GitHub Actions Secrets][github-actions-using-secrets] instead.

- ### Outputs

Here is a list of output parameters of this action:

| Output   | Description                                        |
|----------|----------------------------------------------------|
| `result` | True if all tests pass, False - if some test fails |

It can be used in different conditions in workflows. Please take a look at the "[Usage > Example](#example)".

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).

[subject7-home]: https://www.subject7.com
[shield-license-mit]: https://img.shields.io/badge/License-MIT-blue.svg
[github-actions-using-secrets]: https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions