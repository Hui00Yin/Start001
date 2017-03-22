
import {argv} from 'yargs';

export const ENVIRONMENTS = {
    DEVELOPMENT: 'dev-starter of Angular JS',
    PRODUCTION: 'prod'
};

export function getEnvironment(): string {
    let base = argv['_'];
    let prodKeyword = !!base.filter(o => o.indexOf(ENVIRONMENTS.PRODUCTION) >= 0).pop();
    if (base && prodKeyword || argv['env'] === ENVIRONMENTS.PRODUCTION) {
        return ENVIRONMENTS.PRODUCTION;
    } else {
        return ENVIRONMENTS.DEVELOPMENT;
    }
}
