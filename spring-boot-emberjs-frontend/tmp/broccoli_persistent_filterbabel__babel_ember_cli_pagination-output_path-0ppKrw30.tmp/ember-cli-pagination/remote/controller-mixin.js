define("ember-cli-pagination/remote/controller-mixin", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Mixin.create({
    queryParams: ["page", "perPage"],

    page: _ember["default"].computed.alias("content.page"),

    totalPages: _ember["default"].computed.alias("content.totalPages"),

    pagedContent: _ember["default"].computed.alias("content")
  });
});