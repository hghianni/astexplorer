import defaultParserInterface from '../utils/defaultParserInterface'
const ID = 'amf-async-parser'

export default {
    ...defaultParserInterface,

    id: ID,
    displayName: 'amf-parser',
    version: '5.0.0-beta.2',
    homepage: 'https://www.npmjs.com/package/amf-client-js',

    loadParser(callback) {
        require(['amf-client-js', 'generic-js-model-adapter'], (parser, adapter) => {
            callback({ parser, adapter });
        });
    },

    async parse({ parser, adapter }, code) {
        let client = parser.AsyncAPIConfiguration.Async20().baseUnitClient();
        let model = (await client.parseContent(code,"application/asyncapi20+yaml")).baseUnit
        return adapter.buildObject(model,false)
    },

    getNodeName(node) {
        return node.nodeName
    }
}
