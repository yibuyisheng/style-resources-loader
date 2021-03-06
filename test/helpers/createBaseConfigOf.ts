import * as path from 'path';

import { Configuration } from 'webpack';

import { StyleResourcesFileExt } from '../../src';

export const createBaseConfigOf = (ext: StyleResourcesFileExt) =>
    (testId: string, isError: boolean = false): Configuration => ({
        entry: path.resolve(__dirname, `../${ext}/source.${ext}`),
        output: {
            path: path.resolve(__dirname, `../${ext}/outputs`),
            filename: `${testId}.js`,
            libraryTarget: 'commonjs2',
        },
        module: {
            rules: [{
                test: new RegExp(`\\.${ext}$`),
                use: [...(isError ? [] : ['raw-loader']), {
                    loader: path.resolve(__dirname, '../../lib'),
                    options: require(`../options/${testId}`).default(ext),
                }],
            }],
        },
    });

export default createBaseConfigOf;
