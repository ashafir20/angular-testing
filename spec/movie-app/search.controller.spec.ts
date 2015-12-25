/// <reference path="../../typings/jasmine/jasmine.d.ts" />

describe('Search Controller', () => {
    var $this;
    var $controller;
    var $location;
    
    beforeEach(angular.mock.module('movieApp'));
    
    beforeEach(inject((_$controller_, _$location_) => {
        $location = _$location_;
        $controller = _$controller_;
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
});