const IGNORED_TAGS = ["script", "svg", "style", "img"]

const MATCH = /[oо]/gmi;

const REPLACEMENTS_UPPER = ['Ꙩ', 'ꙮ', 'Ꙫ', 'Ꙭ', 'Ꚙ', 'Ꚛ', 'Ѻ', 'Ó', 'Õ', 'Ö', 'Ò', 'Ô']
const REPLACEMENTS_LOWER = ['ꙩ', 'ꙫ', 'ꙭ', 'ꚙ', 'ꚛ', 'ѻ', 'ó', 'õ', 'ö', 'ò', 'ô']

function getReplacement(match) {
    if (match.toLowerCase() === match) {
        return REPLACEMENTS_LOWER[Math.floor(Math.random() * REPLACEMENTS_LOWER.length)]
    } else {
        return REPLACEMENTS_UPPER[Math.floor(Math.random() * REPLACEMENTS_UPPER.length)]
    }
}

function replace(node) {

    if (node.nodeType !== Node.TEXT_NODE) {
        if (node.hasChildNodes()) {
            for (let i = 0; i < node.childNodes.length; i++) {
                replace(node.childNodes[i]);
            }
        }
        return;
    }

    if (!node.parentElement || IGNORED_TAGS.includes(node.parentElement.tagName.toLowerCase())) return;

    node.nodeValue = node.nodeValue.replaceAll(MATCH, getReplacement);
}

function onMutation(mutations) {
    for (const mutation of mutations) {
        for (let i = 0; i < mutation.addedNodes.length; i += 1) {
            replace(mutation.addedNodes[i])
        }
    }
}

let observer = new MutationObserver(onMutation);
observer.observe(document, {
    childList: true,
    subtree: true,
})