/// <reference path="../../typings/jasmine/jasmine.d.ts" />
describe('Search Controller', function () {
    var $this;
    var $controller;
    var $location;
    var $timeout;
    beforeEach(angular.mock.module('movieApp'));
    beforeEach(inject(function (_$controller_, _$location_, _$timeout_) {
        $location = _$location_;
        $controller = _$controller_;
        $timeout = _$timeout_;
    }));
    it('should redirect to the query results page for non empty query', function () {
        $this = $controller('SearchController', { $location: $location }, { query: 'star wars' });
        $this.search();
        expect($location.url()).toBe('/results?q=star%20wars');
    });
    it('should not redirect to query results for empty query', function () {
        $this = $controller('SearchController', { $location: $location }, { query: '' });
        $this.search();
        expect($location.url()).toBe('');
    });
    it('should redirect after 1 second of keyboard inactivity', function () {
        $this = $controller('SearchController', { $location: $location, $timeout: $timeout }, { query: 'star wars' });
        $this.keyup();
        $timeout.flush();
        expect($timeout.verifyNoPendingTasks).not.toThrow();
        expect($location.url()).toBe('/results?q=star%20wars');
    });
    it('should cancel timeout in keydown', function () {
        $this = $controller('SearchController', { $location: $location, $timeout: $timeout }, { query: 'star wars' });
        $this.keyup();
        $this.keydown();
        expect($timeout.verifyNoPendingTasks).not.toThrow();
    });
});
//# sourceMappingURL=search.controller.spec.js.map