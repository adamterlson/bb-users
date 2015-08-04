module.exports = function () {
  return {
    users: [
      {
        id: 1,
        name: 'Sally Sue'
      }, 
      {
        id: 2,
        name: 'Bobby McGee'
      }
    ],
    groups: [
      {
        id: 1,
        name: 'Example Group #1',
        members: [1]
      },
      {
        id: 2,
        name: 'Example Group #2',
        members: [1,2]
      }
    ]
  };
};