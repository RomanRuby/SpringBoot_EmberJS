define('ember-cli-pagination/components/page-numbers', ['exports', 'ember', 'ember-cli-pagination/util', 'ember-cli-pagination/lib/page-items', 'ember-cli-pagination/validate', 'ember-cli-pagination/templates/components/page-numbers'], function (exports, _ember, _emberCliPaginationUtil, _emberCliPaginationLibPageItems, _emberCliPaginationValidate, _emberCliPaginationTemplatesComponentsPageNumbers) {
  exports['default'] = _ember['default'].Component.extend({
    layout: _emberCliPaginationTemplatesComponentsPageNumbers['default'],
    currentPage: _ember['default'].computed.alias("content.page"),
    totalPages: _ember['default'].computed.alias("content.totalPages"),

    hasPages: _ember['default'].computed.gt('totalPages', 1),

    watchInvalidPage: _ember['default'].observer("content", function () {
      var _this = this;

      var c = this.get('content');
      if (c && c.on) {
        c.on('invalidPage', function (e) {
          _this.sendAction('invalidPageAction', e);
        });
      }
    }),

    truncatePages: true,
    numPagesToShow: 10,

    validate: function validate() {
      if (_emberCliPaginationUtil['default'].isBlank(this.get('currentPage'))) {
        _emberCliPaginationValidate['default'].internalError("no currentPage for page-numbers");
      }
      if (_emberCliPaginationUtil['default'].isBlank(this.get('totalPages'))) {
        _emberCliPaginationValidate['default'].internalError('no totalPages for page-numbers');
      }
    },

    pageItemsObj: _ember['default'].computed(function () {
      return _emberCliPaginationLibPageItems['default'].create({
        parent: this,
        currentPage: _ember['default'].computed.alias("parent.currentPage"),
        totalPages: _ember['default'].computed.alias("parent.totalPages"),
        truncatePages: _ember['default'].computed.alias("parent.truncatePages"),
        numPagesToShow: _ember['default'].computed.alias("parent.numPagesToShow"),
        showFL: _ember['default'].computed.alias("parent.showFL")
      });
    }),

    pageItems: _ember['default'].computed("pageItemsObj.pageItems", "pageItemsObj", function () {
      this.validate();
      return this.get("pageItemsObj.pageItems");
    }),

    canStepForward: _ember['default'].computed("currentPage", "totalPages", function () {
      var page = Number(this.get("currentPage"));
      var totalPages = Number(this.get("totalPages"));
      return page < totalPages;
    }),

    canStepBackward: _ember['default'].computed("currentPage", function () {
      var page = Number(this.get("currentPage"));
      return page > 1;
    }),

    actions: {
      pageClicked: function pageClicked(number) {
        _emberCliPaginationUtil['default'].log("PageNumbers#pageClicked number " + number);
        this.set("currentPage", number);
        this.sendAction('action', number);
      },
      incrementPage: function incrementPage(num) {
        var currentPage = Number(this.get("currentPage")),
            totalPages = Number(this.get("totalPages"));

        if (currentPage === totalPages && num === 1) {
          return false;
        }
        if (currentPage <= 1 && num === -1) {
          return false;
        }
        this.incrementProperty('currentPage', num);

        var newPage = this.get('currentPage');
        this.sendAction('action', newPage);
      }
    }
  });
});