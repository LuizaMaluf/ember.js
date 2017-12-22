import { assign } from 'ember-utils';
import {
  moduleFor,
  DefaultResolverApplicationTestCase
} from 'internal-test-helpers';

moduleFor('Ember.Application with default resolver and autoboot', class extends DefaultResolverApplicationTestCase {
  get fixture() {
    return `
      <div id="app"></div>

      <script type="text/x-handlebars">Hello {{outlet}}</script>
      <script type="text/x-handlebars" id="index">World!</script>
    `;
  }

  get applicationOptions() {
    return assign(super.applicationOptions, {
      autoboot: true,
      rootElement: '#app'
    });
  }

  ['@test templates in script tags are extracted at application creation'](assert) {
    this.runTask(() => this.createApplication());
    assert.equal(this.$('#app').text(), 'Hello World!');
  }
});
