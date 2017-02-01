var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var Logger = require('mongodb').Logger;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

let Play = require('./Play').Play;

PlayRepository = function(host, port) {
  // Create a new db with name 'plays-db'
  this.db = new Db('plays-db', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  this.db.open(function(){
    console.log('Database open');
  });
};

PlayRepository.prototype.addPlay = function(title, source, callback) {
  let play = new Play(title, source);
  this.db.collection('plays', function(error, play_collection) {
    if( error ) callback(error)
    else {
      play.created_at = new Date();
      play_collection.insert(play, function() {
        callback(null, play);
      });
    }
  });
};

PlayRepository.prototype.findAll = function(callback) {
    this.db.collection('plays', function(error, play_collection) {
      if( error ) callback(error)
      else {
        play_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};

/*
EmployeeProvider.prototype.getCollection = function(callback) {
  this.db.collection('employees', function(error, employee_collection) {
    if( error ) callback(error);
    else callback(null, employee_collection);
  });
};

//save new employee
EmployeeProvider.prototype.save = function(employees, callback) {
    this.getCollection(function(error, employee_collection) {
      if( error ) callback(error)
      else {
        if( typeof(employees.length)=="undefined")
          employees = [employees];

        for( var i =0;i< employees.length;i++ ) {
          employee = employees[i];
          employee.created_at = new Date();
        }

        employee_collection.insert(employees, function() {
          callback(null, employees);
        });
      }
    });
};
*/

exports.PlayRepository = PlayRepository;
