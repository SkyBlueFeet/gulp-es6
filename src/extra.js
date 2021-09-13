import hljs from 'highlight.js'
import hljsDefineSolidity from 'highlightjs-solidity';

import escapeHTML from 'lodash/escape'
import isURL from 'validator/lib/isURL'
import Plugin from 'markdown-it-regexp'
import mdIt from "markdown-it";

hljsDefineSolidity(hljs);

function highlightRender (code, lang) {
  if (!lang || /no(-?)highlight|plain|text/.test(lang)) { return }
  function parseFenceCodeParams (lang) {
    const attrMatch = lang.match(/{(.*)}/)
    const params = {}
    if (attrMatch && attrMatch.length >= 2) {
      const attrs = attrMatch[1]
      const paraMatch = attrs.match(/([#.](\S+?)\s)|((\S+?)\s*=\s*("(.+?)"|'(.+?)'|\[[^\]]*\]|\{[}]*\}|(\S+)))/g)
      paraMatch && paraMatch.forEach(param => {
        param = param.trim()
        if (param[0] === '#') {
          params['id'] = param.slice(1)
        } else if (param[0] === '.') {
          if (params['class']) params['class'] = []
          params['class'] = params['class'].concat(param.slice(1))
        } else {
          const offset = param.indexOf('=')
          const id = param.substring(0, offset).trim().toLowerCase()
          let val = param.substring(offset + 1).trim()
          const valStart = val[0]
          const valEnd = val[val.length - 1]
          if (['"', "'"].indexOf(valStart) !== -1 && ['"', "'"].indexOf(valEnd) !== -1 && valStart === valEnd) {
            val = val.substring(1, val.length - 1)
          }
          if (id === 'class') {
            if (params['class']) params['class'] = []
            params['class'] = params['class'].concat(val)
          } else {
            params[id] = val
          }
        }
      })
    }
    return params
  }
  function serializeParamToAttribute (params) {
    if (Object.getOwnPropertyNames(params).length === 0) {
      return ''
    } else {
      return ` data-params="${escape(JSON.stringify(params))}"`
    }
  }
  const fenceCodeAlias = {
    sequence: 'sequence-diagram',
    flow: 'flow-chart',
    graphviz: 'graphviz',
    mermaid: 'mermaid',
    abc: 'abc',
    vega: 'vega',
    geo: 'geo'
  }

  const params = parseFenceCodeParams(lang)
  const attr = serializeParamToAttribute(params)
  lang = lang.split(/\s+/g)[0]

  code = escapeHTML(code)

  const langAlias = fenceCodeAlias[lang]
  if (langAlias) {
    return `<div class="${langAlias} raw"${attr}>${code}</div>`
  }

  const result = {
    value: code
  }
  const showlinenumbers = /=$|=\d+$|=\+$/.test(lang)
  if (showlinenumbers) {
    let startnumber = 1
    const matches = lang.match(/=(\d+)$/)
    if (matches) { startnumber = parseInt(matches[1]) }
    const lines = result.value.split('\n')
    const linenumbers = []
    for (let i = 0; i < lines.length - 1; i++) {
      linenumbers[i] = `<span data-linenumber='${startnumber + i}'></span>`
    }
    const continuelinenumber = /=\+$/.test(lang)
    const linegutter = `<div class='gutter linenumber${continuelinenumber ? ' continue' : ''}'>${linenumbers.join('\n')}</div>`
    result.value = `<div class='wrapper'>${linegutter}<div class='code'>${result.value}</div></div>`
  }
  return result.value
}


const md = mdIt({
  html: true,        // Enable HTML tags in source
  xhtmlOut: true,        // Use '/' to close single tags (<br />).
  breaks: true,        // Convert '\n' in paragraphs into <br>
  langPrefix: '',  // CSS language prefix for fenced blocks. Can be
  linkify: false,        // 自动识别url
  typographer: true,
  quotes: '“”‘’',
  highlight: highlightRender
});

// pdf
const pdfPlugin = new Plugin(
  // regexp to match
  /{%pdf\s*([\d\D]*?)\s*%}/,

  // match, utils
  (match) => {
    const pdfurl = match[1]
    if (!isURL(pdfurl)) return match[0]
    const div = $('<div class="pdf raw"></div>')
    div.attr('data-pdfurl', pdfurl)
    return div[0].outerHTML
  }
)
md.use(pdfPlugin)

// regex for extra tags
const spaceregex = /\s*/
const notinhtmltagregex = /(?![^<]*>|[^<>]*<\/)/
let coloregex = /\[color=([#|(|)|\s|,|\w]*?)\]/
coloregex = new RegExp(coloregex.source + notinhtmltagregex.source, 'g')
let nameregex = /\[name=(.*?)\]/
let timeregex = /\[time=([:|,|+|-|(|)|\s|\w]*?)\]/
const nameandtimeregex = new RegExp(nameregex.source + spaceregex.source + timeregex.source + notinhtmltagregex.source, 'g')
nameregex = new RegExp(nameregex.source + notinhtmltagregex.source, 'g')
timeregex = new RegExp(timeregex.source + notinhtmltagregex.source, 'g')

function replaceExtraTags (html) {
  html = html.replace(coloregex, '<span class="color" data-color="$1"></span>')
  html = html.replace(nameandtimeregex, '<small><i class="fa fa-user"></i> $1 <i class="fa fa-clock-o"></i> $2</small>')
  html = html.replace(nameregex, '<small><i class="fa fa-user"></i> $1</small>')
  html = html.replace(timeregex, '<small><i class="fa fa-clock-o"></i> $1</small>')
  return html
}

export { md }
