/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import removeHtmlTagEntities from '@carbon/ibmdotcom-utilities/es/utilities/removeHtmlTagEntities/removeHtmlTagEntities.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import {
  formatVideoCaption,
  formatVideoDuration,
} from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/formatVideoCaption/formatVideoCaption.js';
import DDSLightboxMediaViewerBody from './lightbox-media-viewer-body';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The video content of lightbox media viewer.
 *
 * @element dds-lightbox-video-player
 * @slot title - The title content.
 * @slot description - The description content.
 */
@customElement(`${ddsPrefix}-lightbox-video-player`)
class DDSLightboxVideoPlayer extends DDSLightboxMediaViewerBody {
  _renderDescription() {
    const { description } = this;
    return html`
      <slot name="description">${removeHtmlTagEntities(description)}</slot>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  _renderMedia() {
    return html`
      <div class="${prefix}--video-player">
        <div class="${prefix}--video-player__video-container">
          <slot></slot>
        </div>
      </div>
    `;
  }

  _renderTitle() {
    const { duration, formatCaption, formatDuration, name } = this;
    return html`
      <slot name="title">
        <h2 style="all: inherit;">
          ${formatCaption({
            duration: formatDuration({
              duration: !duration ? duration : duration * 1000,
            }),
            name,
          })}
        </h2>
      </slot>
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('name')) {
      this.setAttribute('aria-label', this.name);
    }
  }

  connectedCallback() {
    this.setAttribute('role', 'dialog');
    super.connectedCallback();
  }

  /**
   * The media description.
   */
  @property()
  description = '';

  /**
   * The video duration.
   */
  @property({ type: Number })
  duration?: number;

  /**
   * The formatter for the video caption, composed with the video name and the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatCaption = formatVideoCaption;

  /**
   * The formatter for the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatDuration = formatVideoDuration;

  /**
   * The video name.
   */
  @property()
  name = '';
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSLightboxVideoPlayer;
