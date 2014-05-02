(function() {
    'use strict';

    // Events Controller Spec
    describe('startupwichita services', function() {
        beforeEach(module('startupwichita'));

        describe('EventsService', function() {
            it('should issue PUT request to /api/v1/events/:id', inject(function(Events, $httpBackend) {
                var eventId = '507f1f77bcf86cd799439011',
                    updateEvent,
                    updateTimestamp = Date.now();

                $httpBackend.expectPUT('/api/v1/events/' + eventId).respond({id: eventId, title: 'Event 1', content: 'Event 1 Content Update', updated: updateTimestamp});

                updateEvent = new Events({
                    id: eventId,
                    content: 'Event 1 Content Update'
                });

                updateEvent.$update();

                $httpBackend.flush();
                expect(updateEvent.id).toEqual(eventId);
                expect(updateEvent.title).toEqual('Event 1');
                expect(updateEvent.content).toEqual('Event 1 Content Update');
                expect(updateEvent.updated).toEqual(updateTimestamp);
            }));
        });

        describe('EventsService', function() {
            it ('should issue GET request to /api/v1/events?search=event', inject(function(Events, $httpBackend) {
                $httpBackend.when('GET', '/api/v1/events?search=event').respond([
                    {id: '507f1f77bcf86cd799439011', title: 'Event 1'},
                    {id: '507f1f77bcf86cd799439012', title: 'Event 2'}
                ]);

                var event = Events.search({search: 'event'});

                $httpBackend.flush();
                expect(event[0].id).toEqual('507f1f77bcf86cd799439011');
                expect(event[0].title).toEqual('Event 1');

            }));
        });
    });
})();
