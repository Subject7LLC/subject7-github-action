import * as core from "@actions/core";
import { DateUtil, InputMetadata, Main, MainConfig, OutputMetadata } from "@integration/github-azure-utils";

export class Action {
    private static readonly INPUT_URL: string = 'url';
    private static readonly INPUT_API_TOKEN: string = 'api_token';
    private static readonly INPUT_EXECUTION_SET_NAMES: string = 'execution_set_names';
    private static readonly INPUT_PROJECT_NAME: string = 'project_name';
    private static readonly INPUT_VERSION_NAME: string = 'version_name';
    private static readonly OUTPUT_RESULT: string = 'result';
    private readonly main = new Main();

    public async run(): Promise<void> {
        const startDate = new Date();
        try {
            const mainConfig: MainConfig = {
                startDate: startDate,
                inputMetadata: this.initInputMetadata(),
                outputMetadata: this.initOutputMetadata(),
            };
            const outputMetadata = await this.main.run(mainConfig);
            core.setOutput(outputMetadata.resultFieldName, outputMetadata.result);
        } catch (error) {
            if (error instanceof Error) {
                core.setFailed(error.message);
            }
        } finally {
            const actionDuration = Date.now() - startDate.getTime();
            console.log(`Action execution time: ${DateUtil.durationToString(actionDuration)}`);
        }
    }

    private initInputMetadata(): InputMetadata {
        return {
            hostUrlFieldName: Action.INPUT_URL,
            hostUrl: core.getInput(Action.INPUT_URL, {required: true}),
            apiTokenFieldName: Action.INPUT_API_TOKEN,
            apiToken: core.getInput(Action.INPUT_API_TOKEN, {required: true}),
            executionSetNamesFieldName: Action.INPUT_EXECUTION_SET_NAMES,
            executionSetNames: core.getInput(Action.INPUT_EXECUTION_SET_NAMES, {required: true}).split(','),
            projectNameFieldName: Action.INPUT_PROJECT_NAME,
            projectName: core.getInput(Action.INPUT_PROJECT_NAME),
            versionNameFieldName: Action.INPUT_VERSION_NAME,
            versionName: core.getInput(Action.INPUT_VERSION_NAME),
        };
    }

    private initOutputMetadata(): OutputMetadata {
        return {
            resultFieldName: Action.OUTPUT_RESULT,
            result: false,
        };
    }
}

export async function runAction(): Promise<void> {
    await new Action().run();
}

// GitHub Action Entrypoint
runAction();
