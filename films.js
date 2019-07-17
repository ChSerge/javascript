const films = [
  {
    title: 'The Green Mile',
    creationYear: 1999,
    country: ['USA'],
    budget: '$60 000 000',
    actors: [
      {
        name: 'Tom Hanks',
        age: 63,
        role: 'Paul Edgecomb',
      },
      {
        name: 'David Morse',
        age: 65,
        role: 'Brutus Howell',
      },
      {
        name: 'Michael Clarke Duncan',
        age: 54,
        role: 'John Coffey',
      },
    ],
    director: {
      name: 'Frank Darabont',
      age: 60,
      oscarsCount: 0,
    }
  },
  {
    title: 'Inception',
    creationYear: 2010,
    country: ['USA'],
    budget: '$160 000 000',
    actors: [
      {
        name: 'Leonardo DiCaprio',
        age: 44,
        role: 'Cobb',
      },
      {
        name: 'Joseph Gordon-Levitt',
        age: 38,
        role: 'Arthur',
      },
      {
        name: 'Ellen Page',
        age: 32,
        role: 'Ariadne',
      },
      {
        name: 'Tom Hardy',
        age: 41,
        role: 'Eames',
      },
    ],
    director: {
      name: 'Christopher Nolan',
      age: 48,
      oscarsCount: 0,
    }
  },
  {
    title: 'Forrest Gump',
    creationYear: 1994,
    country: ['USA'],
    budget: '$55 000 000',
    actors: [
      {
        name: 'Tom Hanks',
        age: 63,
        role: 'Forrest Gump',
      },
      {
        name: 'Robin Wright',
        age: 53,
        role: 'Jenny Curran',
      },
      {
        name: 'Sally Field',
        age: 72,
        role: 'Mrs. Gump',
      },
    ],
    director: {
      name: 'Robert Zemeckis',
      age: 68,
      oscarsCount: 1,
    }
  },
  {
    title: 'Interstellar',
    creationYear: 2014,
    budget: '$165 000 000',
    country: ['USA','Great Britain', 'Canada'],
    actors: [
      {
        name: 'Matthew McConaughey',
        age: 49,
        role: 'Cooper',
      },
      {
        name: 'Anne Hathaway',
        age: 36,
        role: 'Brand',
      },
      {
        name: 'Jessica Chastain',
        age: 42,
        role: 'Murph',
      },
      {
        name: 'Michael Caine',
        age: 86,
        role: 'Professor Brand',
      },
      {
        name: 'Matt Damon',
        age: 48,
        role: 'Mann',
      },
    ],
    director: {
      name: 'Christopher Nolan',
      age: 48,
      oscarsCount: 0,
    }
  },
  {
    title: 'Catch Me If You Can',
    creationYear: 2002,
    budget: '$52 000 000',
    country: ['USA', 'Canada'],
    actors: [
      {
        name: 'Tom Hanks',
        age: 63,
        role: 'Carl Hanratty',
      },
      {
        name: 'Leonardo DiCaprio',
        age: 36,
        role: 'Frank Abagnale Jr.',
      },
      {
        name: 'Christopher Walken',
        age: 76,
        role: 'Frank Abagnale',
      },
      {
        name: 'Amy Adams',
        age: 44,
        role: 'Brenda Strong',
      },
    ],
    director: {
      name: 'Steven Spielberg',
      age: 72,
      oscarsCount: 4,
    }
  },
];


let actorsAge = 0;
let actorsQ = 0;
let averAge = 0;
for (let fkey in films) {
  if (films[fkey].director.oscarsCount == 0) {
    for (let item in films[fkey].actors) {
      actorsQ += 1;
      actorsAge += films[fkey].actors[item].age
    }
  }

}
averAge = actorsAge/actorsQ;
console.log('1. Средний возраст актеров в фильмах режиссеров без Оскара:\n' + averAge.toFixed(2) + ' лет');


const actorsTH = [];
let sample = 'Tom Hanks';
console.log('\n2.	Имена актеров, которые играли с Томом Хэнксом, в фильмах после 1995 года:');
for (let fkey in films) {
  if (films[fkey].creationYear > 1995) {
    const actorsTemp = [];
    for (let item in films[fkey].actors) {
      if (actorsTH.indexOf(films[fkey].actors[item].name) == -1) {
		  actorsTemp.push(films[fkey].actors[item].name)
	  }
    }
    if (actorsTemp.indexOf(sample) != -1) {
	  const filtered = actorsTemp.filter(function(it, i, actorsTemp) {
        return it != sample;
	  });
	  filtered.forEach(function(it, i, arr) {
        actorsTH.push(it);
      });
	}
  } 
}
actorsTH.forEach(function(it, i, arr) {
  console.log(it);
});


let budgetSum = 0;
console.log('\n3. Общий бюджет (сумма) фильмов, с режиссерами младше 70 лет и в которых не играл Том Хэнкс: ');
for (let fkey in films) {
  if (films[fkey].director.age < 70) {
    let sFlag = false;
	for (let item in films[fkey].actors) {
	  if (films[fkey].actors[item].name == sample) {
		sFlag = true;
		break;
	  }	  
	}
	let bTemp = 0;
	if (!sFlag) {
	  strTemp = films[fkey].budget.substring(1);
	  arrTemp = strTemp.split(' ');
	  strTemp = arrTemp.join('');
	  bTemp = parseInt(strTemp);
	  budgetSum += bTemp;
	}
  };
};
console.log('$' + budgetSum.toLocaleString());



