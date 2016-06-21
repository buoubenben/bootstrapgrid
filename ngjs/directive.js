//指令模块
angular.module('costDirectives', [])
    .directive("mTable", function ($compile) {
        return {
            restrict: "AE",
            templateUrl: "tpl/common.html",
            //controller: 'mTableCtrl',
            replace: !0,
            //scope: {},
            link: function (scope, element, attrs) {
            }

        }
    })
    //增加按钮
    .directive("addBtn", function ($compile) {
        return {
            restrict: "AE",
            replace: false,
            //controller: 'mTableCtrl',
            //scope:{},
            //template:'<input type="button" id="addrow" value="wwwww" ng-click="action()"/>',
            link: function (scope, element, attrs) {
                angular.element("#addrow").bind('click', function () {
                    //获取第一行tr td下的div
                    var div = angular.element('#tbody tr:first td>div');
                    for (var i = 0; i < div.length; i++) {
                        var di = div[i];
                        //判断DIV里包含TEXT字符串
                        if (di.outerHTML.indexOf('TEXT') >= 0) {
                            //添加编辑属性
                            $(di).attr('contentEditable', 'true');
                        }
                        if (di.outerHTML.indexOf('SELECT') >= 0) {
                            var sel = angular.element('#tbody tr:first td>div>select');
                            $(sel).attr('ng-model', 'selectOption.selectedOption');
                        }
                    }
                })
            }
        }
    })
    //日期控件指令
    .directive('formatDate', function ($filter) {
        return {
            require: 'ngModel',
            link: function (scope, elem, attr, ngModelCtrl) {
                ngModelCtrl.$formatters.push(function (modelValue) {
                    if (modelValue) {
                        return new Date(modelValue);
                    }
                });

                ngModelCtrl.$parsers.push(function (value) {
                    if (value) {
                        return $filter('date')(value, 'yyyy/MM/dd');
                    }
                });
            }
        };
    })
    //获取焦点指令
    .directive('setFocus', function ($timeout) {
        return {
            scope: {trigger: '@setFocus'},
            link: function (scope, element) {
                scope.$watch('trigger', function (value) {
                    if (value === 'true') {
                        $timeout(function () {
                            element[0].focus();
                        })
                    }
                })

            }
        }
    });

