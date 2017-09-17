import Ember from 'ember';
import DS from "ember-data";
import { Model } from 'ember-pouch';

var Post = Model.extend({
  title: DS.attr('string', {defaultValue: ""}),
  author: DS.belongsTo('author'),
  date: DS.attr('date'),
  body: DS.attr('string', {defaultValue: ""}),

  authorName: Ember.computed.readOnly('author.name')
});

export default Post;
