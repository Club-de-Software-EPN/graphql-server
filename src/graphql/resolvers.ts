import { users, toDos } from '../utils/mock.data';
import { User, ToDo, GetToDosInput, GetUsersInput, CreateUserInput, CreateToDoInput, MarkToDoCompletedInput } from '../types';

export default {
  Query: {
    getUsers: (): User[] => {
      return users;
    },
    getUser: (root: any, { id }: GetUsersInput): User | undefined => {
      return users.find(user => user.id == id);
    },
    getToDos: (root: any, args: GetToDosInput): ToDo[] => {
      return toDos.filter(todo => todo.user.id == args.userId);
    }
  },
  Mutation: {
    createUser: (root: any, args: CreateUserInput) => {
      const user = {
        id: users.length + 1,
        name: args.name,
        email: args.email,
        password: args.password
      };
      users.push(user);
      return user;
    },
    createToDo: (root: any, args: CreateToDoInput) => {
      const user = users.find(user => user.id == args.userId);
      if (!user) {
        throw new Error('User not found');
      }
      const toDo = {
        id: toDos.length + 1,
        title: args.title,
        description: args.description,
        completed: false,
        user,
      };
      toDos.push(toDo);
      return toDo;
    },
    markToDoCompleted: (root: any, args: MarkToDoCompletedInput) => {
      const toDo = toDos.find(todo => todo.id == args.id);
      if (!toDo) {
        throw new Error('ToDo not found');
      }
      toDo.completed = true;
      return toDo;
    },
  }
}