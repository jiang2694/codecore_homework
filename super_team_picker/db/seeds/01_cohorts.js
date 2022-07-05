const faker = require('faker');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

// allows us to use the faker library

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cohorts')
    .del()
    .then(function () {
      // Insert seed entries
      // generate an array of 1000 posts using faker
      const posts = Array.from({length: 10}).map(() => {
        return {
      'name': faker.name.jobTitle(),
      'members': faker.lorem.words(faker.datatype.number({ min: 15, max: 25 })).split(" ").join(", "),
      'logoUrl': faker.image.abstract(50, 50, true)
        }
      })
      //insert seed entries
      // Inside of callback passed to the function
      // Always return knex query that you create
      return knex('cohorts').insert(cohorts)
    })
};