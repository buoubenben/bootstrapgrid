angular.module('costFilters', [])
    .filter('with', function () {
        return function (items, field) {
            var result = {};
            angular.forEach(items, function (value, key) {
                if (!value.hasOwnProperty(field)) {
                    result[key] = value;
                }
            });
            return result;
        }
    })
    //分页数据长度
    .filter('size', function () {
        return function (items) {
            if (!items)
                return 0;

            return items.length || 0
        }
    })
    //按分页显示数过滤列表显示状态
    .filter('paging', function() {
        return function (items, index, pageSize) {
            if (!items)
                return [];
            var offset = (index - 1) * pageSize;
            return items.slice(offset, offset + pageSize);
        }
    })
    //排序
    .filter('orderClass', function() {
        return function (direction) {
            if (direction === -1)
                return "glyphicon-chevron-down";
            else
                return "glyphicon-chevron-up";
        }
    });
