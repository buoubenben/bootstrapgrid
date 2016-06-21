//控制器模块
angular.module('costControllers', [])
    .controller('mTableCtrl', function ($scope, $http, $templateCache, $filter, mService) {

        //定义数据模型
        $scope.headers = [];
        $scope.fields = [];
        $scope.optionsHeaders = [];
        $scope.optionsFields = [];
        $scope.optionsEdits = [];
        $scope.optionsTypes = [];
        $scope.gridOptions = [];
        $scope.dates = [];


        //获取列表标题属性值，绑定在headers上
        $scope.headers = $scope.optionsHeaders;
        ////获取列表单元格属性值，绑定在fields上
        $scope.fields = $scope.optionsFields;
        ////获取单元格格式
        $scope.cellTypes = $scope.optionsTypes;

        //分页
        $scope.page = {
            size: 10,
            index: 1
        }

        $scope.filter = {};
        //排序
        $scope.sort = {
            head: 'age',
            direction: -1,
            toggle: function (head) {
                if (this.head === head.filterData) {
                    this.direction = -this.direction || -1;
                } else {
                    this.head = head.filterData;
                    this.direction = -1;
                }
            }
        };

        //获取数据并进行处理
        var arr = {
            A: $http.get('data/grid0.json'),
            B: $http.post('data/phpdata.php'),
            C: $http.get('data/option0.json')
        }
        mService.getAllData(arr).then(function (res) {
            $scope.result = res;
            $scope.gridOptions = $scope.result.A.data;//json配置文件
            $scope.items = $scope.result.B.data;//数据文件
            $scope.selectOption = $scope.result.C.data;


            //遍历json取得标题名称，数据字段等
            angular.forEach($scope.gridOptions, function (gridOption, key) {
                //标题
                $scope.optionsHeaders.push(gridOption);
                //字段
                $scope.optionsFields.push(gridOption);
                //单元格格式
                $scope.optionsTypes.push(gridOption.cellType);
            });

            //新增事件
            $scope.add = function () {
                //定义新增行数据对象
                var objs = {};
                console.log(objs);
                //遍历配置文件
                angular.forEach($scope.gridOptions, function (gridOption, key) {
                    $scope.dates.push(gridOption);
                    //如果cellType等于DATE 将获取的数据等于obj
                    if ($scope.dates[key].cellType == 'DATE') {
                        var obj = $scope.dates[key].field.data;
                        var now = new Date();
                        var year = now.getFullYear();
                        var month = now.getMonth();
                        var date = now.getDate();
                        month = month + 1;
                        if (month < 10)month = "0" + month;
                        if (date < 10)date = "0" + date;
                        var newDate = year + '/' + month + '/' + date;
                        objs[obj] = newDate;
                    }
                });
                //将obj压进总数据
                $scope.items.unshift(objs);
            };


            //绑定checkbox
            $scope.isChose = false;
            //全选
            $scope.all = function (model, rows) {
                for (var i = 0; i < rows.length; i++) {
                    if (model == true) {
                        $scope.isChose = true;
                        rows[i].checked = true;
                    } else {
                        $scope.isChose = false;
                        rows[i].checked = false;
                    }
                }
            };

            //单选/多选
            $scope.chk = function (row, isChose) {
                if (isChose == true) {
                    row.checked = true;
                } else {
                    row.checked = false;
                }
            };

            //删除事件
            $scope.del = function () {
                for (var i = 0; i < $scope.items.length; i++) {
                    if ($scope.items[i].checked == true) {
                        $scope.items.splice($scope.items.indexOf($scope.items[i]), 1);
                        i--;
                    }
                }
                $scope.selectAll = false;
            };
            //获取json对象长度函数
            function getJsonLength(jsonData) {
                var jsonLength = 0;
                for (var item in jsonData) {
                    jsonLength++;
                }
                return jsonLength;
            }

            //判断单元格类型
            for (var i = 0; i < getJsonLength($scope.cellTypes); i++) {
                switch ($scope.cellTypes[i]) {
                    case "SELECT":
                        return true;
                        break;
                    case "DATE":
                        return true;
                        break;
                    default:
                        false
                }
            }

        })
    })

