/// <reference path="../../typings/jasmine/jasmine.d.ts" />

describe('Search Controller', () => {
    var $this;
    var $controller;
    var $location;
    var $timeout : angular.ITimeoutService;
    
    beforeEach(angular.mock.module('movieApp'));
    
    beforeEach(inject((_$controller_, _$location_, _$timeout_) => {
        $location = _$location_;
        $controller = _$controller_;
        $timeout = _$timeout_;
    }));
    
    it('should redirect to the query results page for non empty query', () => {
        $this = $controller('SearchController', {  $location: $location }, { query: 'star wars' });
        $this.search();
        expect($location.url()).toBe('/results?q=star%20wars');
    });
    
    it('should not redirect to query results for empty query', () => {
        $this = $controller('SearchController', {  $location: $location }, { query: '' });
        $this.search();
        expect($location.url()).toBe('');
    });
    
    it('should redirect after 1 second of keyboard inactivity', () => {
        $this = $controller('SearchController',
            { $location: $location, $timeout: $timeout },
            { query: 'star wars' });
        $this.keyup();
        $timeout.flush();
        expect($timeout.verifyNoPendingTasks).not.toThrow();
        expect($location.url()).toBe('/results?q=star%20wars');
    });
    
    it('should cancel timeout in keydown', () => {
        $this = $controller('SearchController',
            { $location: $location, $timeout: $timeout },
            { query: 'star wars' });
        $this.keyup();
        $this.keydown();
        expect($timeout.verifyNoPendingTasks).not.toThrow();
    });
    
    it('should cancel timeout in search', () => {
        $this = $controller('SearchController',
            { $location: $location, $timeout: $timeout },
            { query: 'star wars' });
        $this.keyup();
        $this.search();
        expect($timeout.verifyNoPendingTasks).not.toThrow();
    });
});