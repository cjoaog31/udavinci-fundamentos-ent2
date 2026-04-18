/*

    Primer segmento de la actividad LOGICA

*/

const firstTextarea = document.getElementById("listadoNumeros1");
const secondTextarea = document.getElementById("listadoNumeros2");

const firstSubmitButton = document.getElementById("updateFirstList");
const secondSubmitButton = document.getElementById("updateSecondList");

const firstListDisplay = document.getElementById("currentList1");
const secondListDisplay = document.getElementById("currentList2");

let firstList = [];
let secondList = [];

firstSubmitButton.addEventListener("click", () => {
  const list = firstTextarea.value
    .replace(" ", "")
    .split(",")
    .map((num) => parseInt(num.trim()));
  if (list.some(isNaN)) {
    alert("Por favor, ingresa solo números separados por comas.");
    return;
  }

  firstList = list;
  firstListDisplay.textContent = representList(firstList);
  firstListDisplay.parentElement.hidden = false;

  ejercicio1();
  ejercicio2();
  ejercicio3();
  ejercicio4();
  ejercicio5();
  ejercicio6();
});

secondSubmitButton.addEventListener("click", () => {
  const list = secondTextarea.value
    .replace(" ", "")
    .split(",")
    .map((num) => parseInt(num.trim()));
  if (list.some(isNaN)) {
    alert("Por favor, ingresa solo números separados por comas.");
    return;
  }

  secondList = list;
  secondListDisplay.textContent = representList(secondList);
  secondListDisplay.parentElement.hidden = false;

  ejercicio3();
  ejercicio5();
  ejercicio6();
});

function representList(list, withLength = true) {
  if (withLength) {
    return `[${list.join(", ")}], Cantidad de elementos = ${list.length}`;
  }
  return `[${list.join(", ")}]`;
}

function ejercicio1() {
  const minElement = document.getElementById("minValue");
  const maxElement = document.getElementById("maxValue");
  const avgElement = document.getElementById("avgValue");

  if (firstList.length === 0) {
    return;
  }

  let min = firstList[0];
  let max = firstList[0];
  let sum = 0;

  for (const num of firstList) {
    if (num < min) {
      min = num;
    } else if (num > max) {
      max = num;
    }
    sum += num;
  }
  const avg = sum / firstList.length;

  minElement.textContent = min;
  maxElement.textContent = max;
  avgElement.textContent = avg;
}

function ejercicio2() {
  const uniqueValuesElement = document.getElementById("uniqueValues");
  if (firstList.length === 0) {
    return;
  }
  const uniqueValues = [...new Set(firstList)];
  uniqueValuesElement.textContent = representList(uniqueValues, false);
}

function ejercicio2a() {
  const uniqueValuesElement = document.getElementById("uniqueValues");
  if (firstList.length === 0) {
    return;
  }
  let uniqueValues = [];

  for (num of firstList) {
    if (uniqueValues.length === 0) {
      uniqueValues.push(num);
    }
    let igual = false;
    for (num2 of uniqueValues) {
      if (num === num2) {
        igual = true;
      }
    }
    if (igual === false) {
      uniqueValues.push(num);
    }
  }

  uniqueValuesElement.textContent = representList(uniqueValues, false);
}

function ejercicio3() {
  const joinedOrderedElement = document.getElementById("joinedOrdered");
  const joinedOrdered = [...firstList, ...secondList].sort((a, b) => a - b);
  joinedOrderedElement.textContent = representList(joinedOrdered, false);
}

function ejercicio4() {
  const modeValueElement = document.getElementById("modeValue");
  if (firstList.length === 0) {
    return;
  }

  let frequencyMap = {};
  for (const num of firstList) {
    frequencyMap[num] = (frequencyMap[num] || 0) + 1;
  }
  let mode = `${firstList[0]}`;
  let maxFrequency = frequencyMap[mode];

  for (const num in frequencyMap) {
    if (frequencyMap[num] > maxFrequency) {
      mode = num;
      maxFrequency = frequencyMap[num];
    }
  }

  let result = `${mode} : ${maxFrequency} veces`;

  for (const num in frequencyMap) {
    if (frequencyMap[num] === maxFrequency && num !== mode) {
      result = `no hay un único valor modal`;
      break;
    }
  }

  modeValueElement.textContent = result;
}

function ejercicio5() {
  const comparedValuesElement = document.getElementById("comparedValues");
  if (firstList.length === 0 || secondList.length === 0) {
    comparedValuesElement.style.color = "red";
    comparedValuesElement.textContent =
      "Ambas listas deben tener elementos para comparar.";
    return;
  }

  const minSize =
    firstList.length < secondList.length ? firstList.length : secondList.length;
  let result = [];

  for (let i = 0; i < minSize; i++) {
    if (firstList[i] < secondList[i]) {
      result.push(firstList[i]);
    } else {
      result.push(secondList[i]);
    }
  }

  comparedValuesElement.style.color = "var(--primary)";
  comparedValuesElement.textContent = representList(
    result.sort((a, b) => b - a),
    false,
  );
}

function ejercicio6() {
  const diagonalValuesElement = document.getElementById("diagonalValues");
  const matrixContainerElement = document.getElementById("matrixContainer");

  if (firstList.length === 0 || secondList.length === 0) {
    diagonalValuesElement.style.color = "red";
    diagonalValuesElement.textContent =
      "Ambas listas deben tener elementos para crear la matriz.";
    matrixContainerElement.hidden = true;
    return;
  }

  const minLength =
    firstList.length < secondList.length ? firstList.length : secondList.length;
  let diagonalValues = [];

  for (let i = 0; i < minLength; i++) {
    i % 2 === 0
      ? diagonalValues.push(firstList[i])
      : diagonalValues.push(secondList[i]);
  }

  diagonalValuesElement.style.color = "var(--primary)";
  diagonalValuesElement.textContent = representList(diagonalValues, false);
  matrixContainerElement.innerHTML = "";
  matrixContainerElement.appendChild(
    createMatrixHTMLElement(
      firstList.slice(0, minLength),
      secondList.slice(0, minLength),
    ),
  );
  matrixContainerElement.hidden = false;
}


function createMatrixHTMLElement(list1, list2) {
  const length = list1.length;
  const table = document.createElement("table");

  for (let i = 0; i < length; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < length; j++) {
      const cell = document.createElement("td");
      if (j === i) {
        cell.classList.add("diagonal");
      }

      if (i % 2 === 0) {
        cell.textContent = list1[j];
      } else {
        cell.textContent = list2[j];
      }
      row.appendChild(cell);
    }

    table.appendChild(row);
  }
  return table;
}

/*

    Segundo segmento de la actividad AJAX

*/

const xhrRequestButton = document.getElementById("xhrRequest");
xhrRequestButton.addEventListener("click", ejercicio1AJAX);

function ejercicio1AJAX() {
  const xhrResponseElement = document.getElementById("xhrResponse");

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.github.com/users/1", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      xhrResponseElement.textContent = JSON.stringify(response).replaceAll(
        ",",
        ",\n",
      );
    } else {
      xhrResponseElement.textContent = `Error: ${xhr.status}`;
    }
  };
  xhr.onerror = function () {
    xhrResponseElement.textContent = "Error de red";
  };

  xhr.send();
}

const fetchRequestButton = document.getElementById("fetchRequest");
fetchRequestButton.addEventListener("click", ejercicio2AJAX);

function ejercicio2AJAX() {
  const fetchResponseElement = document.getElementById("fetchResponse");
  fetch("https://api.github.com/users/1")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      fetchResponseElement.textContent = Object.keys(data).join(", ");
    })
    .catch((error) => {
      fetchResponseElement.textContent = `Error: ${error.message}`;
    });
}

const promiseRequestButton = document.getElementById("promiseRequest");
promiseRequestButton.addEventListener("click", ejercicio3AJAX);

function ejercicio3AJAX() {
  const promiseResponseElement = document.getElementById("promiseResponse");
  const promise = new Promise((resolve, reject) => {
    const response = fetch("https://api.github.com/users/1")
      .then((response) => {
        if (!response.ok) {
          reject(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(`Error de red: ${error.message}`));
  });

  promise
    .then((data) => {
      promiseResponseElement.textContent = Object.values(data).join(", ");
    })
    .catch((error) => {
      promiseResponseElement.textContent = `Error: ${error.message}`;
    });
}

const asyncRequestButton = document.getElementById("asyncRequest");
asyncRequestButton.addEventListener("click", ejercicio4AJAX);

function ejercicio4AJAX() {
  const asyncResponseElement = document.getElementById("asyncResponse");
  async function fetchData() {
    try {
      const response = await fetch("https://api.github.com/users");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      asyncResponseElement.textContent = `Cantidad de usuarios obtenidos: ${data.length}`;
    } catch (error) {
      asyncResponseElement.textContent = `Error: ${error.message}`;
    }
  }
  fetchData();
}

const openRequestButton = document.getElementById("openRequest");
openRequestButton.addEventListener("click", ejercicio5AJAX);

function ejercicio5AJAX() {
  const openResponseElement = document.getElementById("openResponse");

  fetch("https://api.github.com/users/mojodna")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      openResponseElement.textContent = Object.values(data).join(", ");
    })
    .catch((error) => {
      openResponseElement.textContent = `Error: ${error.message}`;
    });
}
