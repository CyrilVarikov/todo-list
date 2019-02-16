import graphqlHTTP  from 'express-graphql';
import {buildSchema} from 'graphql';
import {TaskService} from './api/task/service/taskService';
import {auth} from './helpers/middlewares/auth.middleware';


const schema = buildSchema(`
  type Query {
    fetchById(id: String): Task
  },
  
  type Mutation {
    updateTask(id: String, heading: String, deadLine: String, description: String): Task
  },
  
  type Task {
    _id: String,
    heading: String,
    description: String,
    deadLine: String,
    done: Boolean,
    hasAttachment: Boolean,
    originalFileName: String,
    serverFileName: String
  }
`);

const root = {
  fetchById: (args) => {
    const id = args.id;
    return TaskService.fetchById(id)
    .then(task => {
      delete task.__v;
      return task;
    })
    .catch(err => console.log('ERROR', err));
  },
  updateTask: (args => {
    return TaskService.update(args.id, {heading: args.heading, deadLine: new Date(+args.deadLine), description: args.description})
    .then(task => {
      console.log('TASK', task);
      delete task.__v;
      return task;
    })
  })
};

exports.default = app => {
  app.use('/graphql', auth, graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  }));
};