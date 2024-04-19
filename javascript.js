document.addEventListener("DOMContentLoaded", function () {
  const searchInputDesk = document.getElementById("search_text");
  const searchInputPhone = document.getElementById("search_text_phone");
  let foodsList = [];

  fetchFoodsList();

  searchInputDesk.addEventListener("input", function (event) {
    const searchTerm = event.target.value.trim();
    if (searchTerm !== "") {
      searchFoods(searchTerm);
    }
  });

  searchInputPhone.addEventListener("input", function (event) {
    const searchTerm = event.target.value.trim();
    if (searchTerm !== "") {
      searchFoods(searchTerm);
    }
  });

  function fetchFoodsList() {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl =
      "https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel";

    fetch(proxyUrl + apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data.livsmedel)) {
          throw new Error(
            "Unexpected response format: livsmedel is not an array"
          );
        }
        foodsList = data.livsmedel.map((food) => ({
          id: food.nr,
          name: food.namn,
        }));
      })
      .catch((error) => {
        console.error("Error fetching foods list:", error);
      });
  }

  function searchFoods(searchTerm) {
    const matchingFoods = foodsList.filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (matchingFoods.length > 0) {
      console.log("Matching foods:", matchingFoods);
    } else {
      console.log("No matching foods found");
    }
  }
});

function toggleMenu() {
  var menu = document.getElementById("menu_click");
  menu.classList.toggle("active");
  document.body.classList.toggle("active");
}
