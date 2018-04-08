(function () {
  'use strict';

  angular
    .module('products', ['ngDialog'])
    .controller('ProductsCreateController', ProductsCreateController);

  ProductsCreateController.$inject = ['$rootScope',
    '$scope',
    '$state',
    '$window',
    'ngDialog',
    'productResolve',
    'createCategoryResolve',
    'getCategoriesResolve',
    'CategoriesService',
    'Authentication',
    'Notification'];

  function ProductsCreateController($rootScope,
    $scope,
    $state,
    $window,
    ngDialog,
    productResolve,
    createCategoryResolve,
    getCategoriesResolve,
    CategoriesService,
    Authentication,
    Notification) {
    var vm = this;

    vm.product = productResolve;
    vm.productCategories = {};
    // vm.category = createCategoryResolve();
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.newCategory = newCategory;
    vm.allCategories = CategoriesService.query();

    $scope.showNewCategoryDialog = showNewCategoryDialog;

    if (!!vm.product._id) {
      for (let _category of vm.product.category) {
        vm.productCategories[_category._id] = true;
      }
    }




    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.product.$remove(function () {
          $state.go('products.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Article deleted successfully!' });
        });
      }
    }

    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.productForm');
        return false;
      }

      vm.product.category = [];
      for (let _checkedId in vm.productCategories) {
        if (!!vm.productCategories[_checkedId]) {
          vm.product.category.push(_checkedId);
        }
      }

      vm.product.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('products.view', {_id: vm.product._id });
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Product saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Product save error!' });
      }
    }

    function showNewCategoryDialog(ev) {
      ngDialog.openConfirm({
        template: 'newCategoryDialogId',
        controller: ['$scope', function ($scope) {
          $scope.confirm = confirm;
          function confirm(categoryName) {
            console.log('confirm', arguments);
            newCategory(categoryName);
            $scope.closeThisDialog();
          }
        }],
      });

    }
    $rootScope.$on('ngDialog.closed', function (e, $dialog) {
      console.log('ngDialog closed: ' + $dialog.attr('id'));
      console.log(e, $dialog);
      console.log($scope.newCategoryName);
    });

    function newCategory(categoryName){
      console.log('newCategory');
      vm.category = createCategoryResolve();
      vm.category.categoryName = categoryName;
      vm.category.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        vm.allCategories.unshift({
          _id: res._id,
          categoryName: res.categoryName,
          created: res.created,
          updated: res.updated
        });

        // let newCategory = angular.element('<input name="category" type="checkbox" ng-true-value="true" ng-false-value="false" value="' + res.data._id + '"><span class="addon-left">' + res.data.categoryName + '</span>');
        // document.getElementById('all_category_label').appendChild(newCategory);
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Category saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Category save error!' });
      }
    }
  }
}());
