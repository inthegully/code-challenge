// Coding Problem #1
// Write a method, `findMax`, that will accept an object collection, `collection`,
// and a string, `key`.
//
// The method should return the maximum value in the collection for the given
// key.

const collection = {'one':[1,2,3,4], 'two':[5,6,1,4], 'three':[8,5,10,1]};

function findMax(collection, key) {
  const arr = collection[key];
  return Math.max(...arr);
};

findMax(collection, 'one'); // => 4


// Coding Problem #2
// Write a method, `findRecord`, that will take an object collection, `records`
// and an integer, `object_id`.
// The method should iterate over `records` and return an object if the `object_id`
// matches the id of a record in the collection and throw an error message if the
// record id was not found

const records = {1:{one:"foo"}, 2:{two:"boo"}, 3:{three:"bee"}};

function findRecord(records, object_id) {
  if(records[object_id]) {
    return records[object_id];
  } else {
    console.log("ERROR!! Can't find object with given ID");
  }
};

findRecord(records, 3); // => {three: "bee"}


/*
Coding Problem #3
Write a method, `searchRecords`, that will take an object, `node`, a string, `key`,
and string, `term`.
The method should travers the tree to find all related nodes where `term` matches
the `node`'s property for the given `key`.
The original `node` should be considered immutable
Additional Info:
- `node` is expected to be a "node tree"
- The `node` will have an imbedded object collection, `children`, that is a collection
  of nodes

Example "node tree" object:
{
  id: 1,
  name: 'Menu',
  description: 'Our super awesome food menu',
  children: []
}

Example of Search Results:
term: 'Fr'
key: name
Results: (simplified)
- Menu
|-- Combo #1
| |-- French Fries
|-- Combo #2
| |-- Frozen Dairy Product
|-- French Fries
|-- Fresh Fruit
|-- Frozen Dairy Product
*/

const node = {
  id: 1,
  name: 'Menu',
  description: 'Our super awesome food menu',
  children: [
    {
      name: "Combo 1",
      description: "Not Healthy",
      children: [
        {
          name: "French Fries"
        }, {
          name: "Burger"
        }, {
          name: "Drink"
        }
      ]
    }, {
      name: "Combo 2",
      description: "Not Healthy",
      children: [
        {
          name: "French Fries"
        }, {
          name: "Shake"
        }
      ]
    }, {
      name: "Combo 3",
      description: "Not Healthy",
      children: [
        {
          name: "Burger"
        }, {
          name: "Shake"
        }
      ]
    }, {
      name: "Combo 4",
      description: "Healthy",
      children: [
        {
          name: "Frozen Yogurt"
        }, {
          name: "Salad"
        }, {
          name: "Drink"
        }
      ]
    }
   ]
  }

let array = [];

function searchRecords (node, key, term) {
  let children = node.children;
  if (node[key].includes(term)) {
    array.push(node);
  }
  if (node.children) {
    children.map(child => {
      searchRecords(child, key, term);
    })
  }
  return array;
}

searchRecords(node, "name", "ur") // => [{name: "Burger"}, {name: "Burger"}, {name: "Frozen Yogurt"}]

/*
Coding Problem #4
Write a method, `getRecords`, that will take a string, `recordType`, and an optional
integer, `id`
The method should query an API and return the result set for `recordType`
If an `id` is provided, the record should be returned instead of the record set.
Requirements:
- Must use Promises or `async/await`
- Must use JSONPlaceholder as your API, https://jsonplaceholder.typicode.com/.
*/

function getRecords(recordType, id) {
  fetch(`https://jsonplaceholder.typicode.com/${recordType}`)
    .then(response => {
      return response.json();
  }).then(data => {
    if (id) {
      data.find(item => {
        if (item.id === id) {
          console.log(item);
          return item;
        }
      })
    } else {
      console.log(data);
      return data;
    }
  });
}

getRecords("photos", 3) //=>   {
                            //   "albumId": 1,
                            //   "id": 3,
                            //   "title": "officia porro iure quia iusto qui ipsa ut modi",
                            //   "url": "http://placehold.it/600/24f355",
                            //   "thumbnailUrl": "http://placehold.it/150/24f355"
                            // }
