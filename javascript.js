const searchInput = document.getElementById(
  "search_text_desk",
  "search_text_phone"
);

const apiUrl =
  "https://cors-anywhere.herokuapp.com/https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel?offset=0&limit=2387&sprak=1";
const allNames = [];

async function fetchAllNames() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const items = data.livsmedel || [];

    items.forEach((item) => {
      const name = item.namn || "";
      allNames.push(name);
    });

    return allNames;
  } catch (error) {
    console.error("Error fetching names:", error);
  }
}

async function searchList(allNames, searchTerm) {
  return allNames.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

async function searchAndDisplayResults() {
  const names = await fetchAllNames();
  const searchTerm = searchInput.value.trim();
  const matchingItems = await searchList(names, searchTerm);

  const search_resultsDiv = document.getElementById("search_results");
  search_resultsDiv.innerHTML = "";

  matchingItems.forEach((item) => {
    const itemDiv = document.createElement("Div");
    itemDiv.classList.add("searched_products");
    itemDiv.textContent = item;
    search_resultsDiv.appendChild(itemDiv);
  });
}

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchAndDisplayResults();
  }
});

function food_text(event) {
  const food_text = event.target.textContent;
  console.log("Clicked text:", food_text);

  const food_position = findPosition(allNames, food_text);
  console.log("Position:", food_position);

  fetchData(food_position).then((data) => {
    if (data) {
      console.log("Fetched data:", data);
      function displayAsSpreadsheet(data) {
        const container = document.getElementById("results");
        container.innerHTML = "";
        const table = document.createElement("table"); // Use "table" here instead of "results_table"
        const headers = Object.keys(data[0]);
        const excludedColumns = [
          "euroFIRkod",
          "ursprung",
          "ursprungkod",
          "vardetypkod",
          "vardetyp",
          "referenstypkod",
          "referenstyp",
          "metodindikatorkod",
          "metodindikator",
          "metodtypkod",
          "metodtyp",
          "publikation",
        ];

        const headerRow = document.createElement("tr"); // Use "tr" here instead of "table_header"
        headers.forEach((header) => {
          if (!excludedColumns.includes(header)) {
            const th = document.createElement("th"); // Use "th" here instead of "table_header_names"
            th.textContent = header;
            headerRow.appendChild(th);
          }
        });
        table.appendChild(headerRow);

        data.forEach((rowData) => {
          const row = document.createElement("tr");
          headers.forEach((header) => {
            if (!excludedColumns.includes(header)) {
              const cell = document.createElement("td");
              cell.textContent = rowData[header];
              cell.style.padding = "5px";
              row.appendChild(cell);
            }
          });
          table.appendChild(row);
        });

        container.appendChild(table);
      }
      displayAsSpreadsheet(data);
    } else {
      console.log("Failed to fetch data.");
    }
  });
}

document
  .getElementById("search_results")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("searched_products")) {
      food_text(event);
    }
  });

function findPosition(allNames, searchString) {
  for (let i = 0; i < allNames.length; i++) {
    if (allNames[i] === searchString) {
      return i + 1;
    }
  }
  return -1;
}

async function fetchData(food_position) {
  try {
    const apiUrl = `https://cors-anywhere.herokuapp.com/https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel/${food_position}/naringsvarden?sprak=1`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
}

function toggleMenu() {
  var menu = document.getElementById("menu_click");
  menu.classList.toggle("active");
}

function toggleOverlay() {
  window.location.href = "main.html";
}

function about() {
  window.location.href = "about.html";
}

function search() {
  window.location.href = "search.html";
}

function startpage() {
  window.location.href = "main.html";
}
