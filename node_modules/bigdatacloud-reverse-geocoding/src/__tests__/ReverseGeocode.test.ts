import ReverseGeocode from '../index';
test('Test reverse geocode of the location 0,0', async () => {
  const geocode = new ReverseGeocode();
  expect(await geocode.locate({ lat: 0, long: 0 })).toStrictEqual({
    latitude: 0,
    locality: 'Atlantic Ocean',
    localityInfo: {
      informative: [
        {
          description: 'ocean on Earth',
          name: 'Atlantic Ocean',
          order: 0,
          wikidataId: 'Q97',
        },
      ],
    },
    localityLanguageRequested: 'en',
    longitude: 0,
  });
});
