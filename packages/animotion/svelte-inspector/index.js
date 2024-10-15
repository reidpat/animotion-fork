import { parse } from 'svelte/compiler';
import { walk } from 'estree-walker'
import MagicString from 'magic-string';
import {getLocator} from 'locate-character'

export default function (options) {
    return {
        name: 'svelte-inspector',
        enforce: 'pre',
        transform(code, id) {
            if (id.endsWith('.svelte') && !id.includes('.svelte-kit')) {
                const ast = parse(code);
                let transformedCode = code;
                let offset = 0;
                // console.log({ id })
                const magicString = new MagicString(code)
                const locator = getLocator(code, {offsetLine: 1, offsetColumn: 1});

                walk(ast.html, {
                    enter(node) {
                        if (node.type === 'Element') {
                            const { start, name, end } = node;
                            let toInsert = start + 1 + name.length;
                            const {line, column} = locator(start);
                            
                            const str = ` file=${id} start=${start} end=${end} line=${line} column=${column}`
                            magicString.appendLeft(toInsert, str)

                        }
                        // console.log(node.type)
                    }
                })

                // console.log({ast: ast.html});
                // console.log(magicString.toString);
                const sourceMap = magicString.generateMap()

                return {
                    code: magicString.toString(),
                    map: sourceMap
                }
                // return magicString.toString({source: id, includeContent: true});
            }
        }
    }
}