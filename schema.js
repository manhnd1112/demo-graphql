const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
 } = require('graphql');
 
 // Customer Type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
 });

 // Hardcored Data
 var customers = [
    {id: '1', name: 'Nguyen Dinh Manh', email: 'manhnd@gmail.com', age: 35},
    {id: '2', name: 'Nguyen Dinh Tao', email: 'taond@gmail.com', age: 25},
    {id: '3', name: 'Nguyen Dinh Ky', email: 'kynd@gmail.com', age: 15},   
 ]


 const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args) {
                return customers;
            }
        },
        customer: {
            type: CustomerType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args) {
                for(let i = 0; i < customers.length; i++){
                    if(customers[i].id == args.id) {
                        return customers[i];
                    }
                }
               
            }
        }
    }
 })


 const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addCustomer: {
            type: CustomerType,
            args: {
                id: {type: GraphQLString},
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},               
            },
            resolve(parentValue, args) {
                customers.push({
                    id: args.id,
                    name: args.name,
                    email: args.email,
                    age: args.age
                })
                return customers[customers.length-1];
                console.log(customers);
            }
        },
        deleteCustomer: {
            type: GraphQLBoolean,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}   
            },
            resolve(parentValue, args) {
                var result = false;
                customers.forEach(function(customer){
                    if(customer.id == args.id) result = true;
                });
                customers = customers.filter(function(customer) {
                    return customer.id !== args.id;
                });
                console.log(customers);
                return result;
            }
        },
        updateCustomer: {
            type: CustomerType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                age: {type: GraphQLInt},    
            },
            resolve(parentValue, args) {
                for (let i = 0; i < customers.length; i++) {
                    if(customers[i].id === args.id) {
                        customers[i].name = args.name;
                        customers[i].email = args.email;
                        customers[i].age = args.age;
                        console.log(customers);
                        return customers[i];
                    }
                }
            }
        } 
    }
 })
 
 

 module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
 });
 