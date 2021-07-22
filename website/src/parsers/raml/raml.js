import defaultParserInterface from '../utils/defaultParserInterface'
const ID = 'amf-raml-parser'

export default {
    ...defaultParserInterface,

    id: ID,
    displayName: ID,
    version: '5.0.0-beta.2',
    homepage: 'https://www.npmjs.com/package/amf-client-js',
    _ignoredProperties: new Set(['_type']),
    locationProps: new Set(['Loc']),

    loadParser(callback) {
        require(['amf-client-js', 'generic-js-model-adapter'], (parser, adapter) => {
            callback({ parser, adapter });
        });
    },

    async parse({ parser, adapter }, code) {
        let client = parser.WebAPIConfiguration.WebAPI().merge(parser.AsyncAPIConfiguration.Async20()).baseUnitClient();
        let model = (await client.parseContent(code)).baseUnit
        return adapter.buildObject(model,false)
    },

    getNodeName(node) {
        return node.nodeName
    }
}
