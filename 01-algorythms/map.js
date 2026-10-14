const users = [
  { id: 1, first_name: "john", last_name: "doe", age: 25, is_active: true },
  { id: 2, first_name: "jane", last_name: "smith", age: 32, is_active: false },
  { id: 3, first_name: "bob", last_name: "johnson", age: 19, is_active: true },
];

function createFullName(firstName, lastName) {
  return (
    firstName[0].toUpperCase() +
    firstName.slice(1) +
    " " +
    lastName[0].toUpperCase() +
    lastName.slice(1)
  );
}

const formatUsers = (arr) =>
  arr.map((user) => ({
    id: user.id,
    fullName: createFullName(user.first_name, user.last_name),
    age: user.age,
    status: user.is_active ? "Active" : "Inactive",
  }));

//console.log(formatUsers(users));

const chainedUsers = users
  .filter((user) => user.is_active && user.age >= 21)
  .map((user) => ({
    id: user.id,
    fullName: createFullName(user.first_name, user.last_name),
    age: user.age,
    status: "Active",
  }));

const totalAge = users.reduce((acc, current) => acc + current.age, 0);
console.log(filteredUsers);
