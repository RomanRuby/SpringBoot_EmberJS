import Ember from 'ember';
import tryMatch from '../utils/try-match';
import layout from '../templates/components/fa-stack';

const {
  computed,
  get
} = Ember;

export default Ember.Component.extend({
  layout,

  tagName: 'span',
  classNames: 'fa-stack',
  classNameBindings: ['sizeCssClass'],

  sizeCssClass: computed('size', function() {
    let size = get(this, 'size');
    if (!size) { return; }

    if (tryMatch(size, /^fa-/)) {
      return size;
    } else if (tryMatch(size, /(?:lg|x)$/)) {
      return `fa-${size}`;
    } else {
      return `fa-${size}x`;
    }
  })
});
