import {register} from 'node:module';
import {pathToFileURL} from 'node:url';

// Регистрируем ts-node с поддержкой ESM
register('ts-node/esm', pathToFileURL('./'));
