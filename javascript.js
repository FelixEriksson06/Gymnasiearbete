const url =
  "https://cors-anywhere.herokuapp.com/https://platform.fatsecret.com/rest/server.api";
const accessToken = "your_access_token_here";

const data = {
  method: "food.get.v2",
  food_id: 33691,
  format: "json",
};

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
  body: JSON.stringify(data),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

function toggleMenu() {
  var menu = document.getElementById("menu_click");
  menu.classList.toggle("active");
  body.classList.toggle("active");
}
