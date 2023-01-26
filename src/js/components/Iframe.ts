import { Base } from '@studiometa/js-toolkit';
import type { BaseProps } from '@studiometa/js-toolkit';
import { nextTick } from '@studiometa/js-toolkit/utils';
import { getHtml, getScript } from '../store.js';

export interface IframeProps extends BaseProps {
  $el: HTMLIFrameElement;
}

/**
 * Iframe class.
 */
export default class Iframe extends Base<IframeProps> {
  /**
   * Config.
   */
  static config = {
    name: 'Iframe',
  };

  script: HTMLScriptElement;

  get window() {
    return this.$el.contentWindow;
  }

  get doc() {
    return this.window?.document;
  }

  async mounted() {
    // Enabel dev mode in render
    // @ts-ignore
    this.window.__DEV__ = true;

    this.doc.documentElement.innerHTML = `
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
  ${getHtml()}
</body>`;

    // Add Tailwind CDN
    const tailwindScript = this.doc.createElement('script');
    tailwindScript.src = 'https://cdn.tailwindcss.com';
    tailwindScript.id = 'tailwind';
    this.doc.head.appendChild(tailwindScript);

    // Add custom script
    this.script = this.doc.createElement('script');
    this.script.type = 'module';
    this.script.id = 'script';
    this.doc.head.appendChild(this.script.cloneNode());

    await nextTick();
    this.updateScript(false);
  }

  async updateHtml() {
    await nextTick();
    console.log('updateHtml', getHtml());
    this.doc.body.innerHTML = getHtml();
    await nextTick();
    this.updateScript(false);
  }

  async updateScript(resetHtml = true) {
    if (resetHtml) {
      this.doc.body.replaceWith(this.doc.body.cloneNode(true));
      await nextTick();
    }
    await nextTick();
    const clone = this.script.cloneNode();
    const newScript = getScript();
    clone.textContent = `${newScript}\ndocument.dispatchEvent(new Event("readystatechange"))`;
    // @ts-ignore
    this.window.script.replaceWith(clone);
  }
}
