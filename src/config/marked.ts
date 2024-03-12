import { marked } from 'marked';
import hljs from 'highlight.js';

marked.use({ silent: true });
const renderer = new marked.Renderer();
renderer.codespan = function(text) {
	return `<code>${text}</code>`;
};
renderer.paragraph = function(text) {
    return `<p style="margin: 10px 0px;">${text}</p>`;
};
renderer.code = function(code, language, isEscaped) {
	// Check whether the given language is valid for highlight.js.
	const validLang = !!(language && hljs.getLanguage(language));
	// Highlight only if the language is valid.
	const highlighted = validLang ? hljs.highlight(code, { language }).value : code;
	// Render the highlighted code with `hljs` class.
	if (language) {
		return `<pre style="margin: 2px;"><div style="background-color: black; color: white;"><p style="padding: 5px; margin: 0; display: flex; justify-content: space-between;">${language}<button class="copy-btn"><i class="fas fa-copy"></i></button></p></div><code class="hljs language-${language} container2" style="padding: 10px;">${highlighted}</code></pre>`;
	} else {
		return `<pre style="padding: 0;"><code class="hljs language-${language}" style="padding: 10px;">${highlighted}</code></pre>`;
	}
};
renderer.link = function( href, title, text ) {
	return '<a target="_blank" href="'+ href +'" title="' + title + '">' + text + '</a>';
}

// Set options for marked
marked.setOptions({
  headerIds: false,
  mangle: false,
  renderer: renderer,
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
});

export default marked;