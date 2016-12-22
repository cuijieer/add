var app = angular.module("app",["ngRoute"]);
app.config(function($routeProvider){
	$routeProvider
		.when("/",{
		templateUrl:"tpl/index.html"
	})
		.when("/shop",{
		templateUrl:"tpl/shop.html"
	})
		.when("/cart",{
		templateUrl:"tpl/cart.html"
	})
		.otherwise({
		redirectTo: "/"
	});
});

//index页面的控制器
app.controller("IndexController",function($scope,$http){
	$http.get("js/shop.json").then(function(data){
		$scope.shoplist_l = data.data[0];
		$scope.shoplist_t = data.data[1];
		$scope.shoplist = $scope.shoplist_l.concat($scope.shoplist_t);
		$scope.cartlist = [];
	});
});

//shop页面控制器
app.controller("ShopController",function($scope){
	$scope.pushl = function(index){
		if ($scope.cartlist.indexOf($scope.shoplist_l[index]) != -1) {
			$scope.shoplist_l[index]['num']++;
		} else {
			$scope.cartlist.push($scope.shoplist_l[index]);
		}
	}
	$scope.pushr = function(index){
		if ($scope.cartlist.indexOf($scope.shoplist_t[index]) != -1) {
			$scope.shoplist_t[index]['num']++;
		} else {
			$scope.cartlist.push($scope.shoplist_t[index]);
		}
	}
});

//cart页面控制器
app.controller("CartController",function($scope){
	
//	单击减做减法
	$scope.jian = function(index){
		if($scope.shoplist[index]["num"]>1){
			$scope.shoplist[index]["num"]--;
		}
	}
//	单击加做加法
	$scope.jia = function(index){
			$scope.shoplist[index]["num"]++;
	}
	
//	单击全选计算总价格
	$scope.change = function(){
		angular.forEach($scope.shoplist,function(value,key){
			value["isCheck"] = $scope.checked;
		})
	}
//	总价的计算 和 改变时的监控
	$scope.$watch("cartlist",function(){
		$scope.Total = {TotalNum:0,TotalPrice:0}
		$scope.isCheck = true;
		angular.forEach($scope.cartlist,function(value,key){
			if(value["isCheck"] == true){
				$scope.Total["TotalNum"] += value["num"];
				$scope.Total["TotalPrice"] += value["num"] * value["price"];
			}else{
				$scope.isCheck = false;
			}
		});
	},true);
});